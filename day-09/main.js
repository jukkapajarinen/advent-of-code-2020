const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");
const numbers = rows.map(x => parseInt(x));

let vulnerability = (data, chunkSize) => {
  let vulnerability = -1;

  for (let i = chunkSize; i <= data.length; i++) {
    let chunk = data.slice(i - chunkSize, i);
    let valids = [];
    for (let j = 0; j < chunk.length; j++) {
      valids.push(chunk.includes(data[i] - chunk[j]));
    }
    if (valids.filter(v => v === true).length < 1) {
      return data[i];
    }
  }

  return vulnerability;
};

console.log(`Vulnerability: ${vulnerability(numbers, 25)} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);