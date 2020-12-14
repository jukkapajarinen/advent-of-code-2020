const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
let memory = {};
rows.forEach(row => {
  if (row.includes("mask")) {
    mask = row.replace("mask = ", "");
  }
  else if(row.includes("mem")) {
    let [addr, val] = row.split("=").map(m => parseInt(m.match(/\d+/)));
    let res = val.toString(2).padStart(36, "0");
    for (let i = mask.length - 1; i > -1; i--) {
      if (mask[i] === "X") { continue; }
      res = res.substring(0, i) + mask[i] + res.substring(i + 1);
    }
    memory[addr] = parseInt(res, 2);
  }
});

let sumInMemory = Object.keys(memory).reduce((a, b) => a + memory[b], 0);
console.log(`Sum in memory: ${sumInMemory} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);
