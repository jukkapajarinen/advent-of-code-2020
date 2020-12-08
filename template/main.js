const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

rows.forEach(row => {
  console.log(row);
});

console.log(`Something: ${1} (part 1)`);
console.log(`Another something: ${2} (part 2)`);