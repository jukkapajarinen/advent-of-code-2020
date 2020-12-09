const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");
const numbers = rows.map(x => parseInt(x));

let findVulnerability = (data, chunkSize) => {
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

let encryptionWeakness = (data, vulnerability) => {
  let contiguous = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      let sum = contiguous.reduce((a, b) => a + b, 0);
      if (sum > vulnerability) {
        contiguous = [];
        break;
      }
      else if (sum === vulnerability) {
        return contiguous;
      }
      else {
        contiguous.push(data[j]);
      }
    }
  }
  return contiguous;
};

let vulnerability = findVulnerability(numbers, 25);
let weaknessData = encryptionWeakness(numbers, findVulnerability(numbers, 25));
let weakness = Math.min(...weaknessData) + Math.max(...weaknessData);

console.log(`Vulnerability: ${vulnerability} (part 1)`);
console.log(`Encryption weakness: ${weakness} (part 2)`);