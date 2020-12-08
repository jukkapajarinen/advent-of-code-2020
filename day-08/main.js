const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let runBootCode = (bootCode) => {
  let corrupted = false;
  let visited = [];
  let acc = 0;
  let i = 0;
  while (i < bootCode.length) {
    if (visited.includes(i)){
      corrupted = true;
      break;
    }

    visited.push(i);
    let cmd = bootCode[i].split(" ")[0];
    let arg = parseInt(bootCode[i].split(" ")[1]);
  
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
  return {
    acc: acc,
    corrupted: corrupted
  };
};

let acc2 = 0;
for (let i = 0; i < rows.length; i++) {
  let testCode = [...rows];
  if (rows[i].split(" ")[0] === "jmp") {
    testCode[i] = rows[i].replace("jmp", "nop");
  }
  else if (rows[i].split(" ")[0] === "nop") {
    testCode[i] = rows[i].replace("nop", "jmp");
  }
  let res = runBootCode(testCode);
  if (!res.corrupted) {
    acc2 = res.acc;
    break;
  }
}

console.log(`Acc value: ${runBootCode(rows).acc} (part 1)`);
console.log(`Acc value: ${acc2} (part 2)`);