const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let visited = [];
let acc = 0;
let i = 0;
while (i < rows.length && !visited.includes(i)) {
  visited.push(i);
  let cmd = rows[i].split(" ")[0];
  let arg = parseInt(rows[i].split(" ")[1]);

  switch (cmd) {
    case "acc":
      acc += arg;
      break;
    case "jmp":
      i += Math.sign(arg) * (Math.abs(arg) + (-1 * Math.sign(arg)) );
      break;
    case "nop":
    default:
      break;
  }

  i++;
}

console.log(`Acc value: ${acc} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);