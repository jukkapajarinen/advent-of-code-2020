const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().trimEnd().split("\n");

rows.forEach(row => {
  console.log(row);
});

console.log(`Something: ${1} (part 1)`);
console.log(`Another something: ${2} (part 2)`);