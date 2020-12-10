const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");
const numbers = rows.map(x => parseInt(x)).sort((a, b) => a - b);

let ones = [0];
let threes = [numbers[numbers.length-1]];
for (let i = 0; i < numbers.length - 1; i++) {
  let diff = numbers[i + 1] - numbers[i];
  if (diff === 1) {
    ones.push(numbers[i]);
  } 
  else if (diff === 3) {
    threes.push(numbers[i]);
  }
}

console.log(`Something: ${ones.length * threes.length} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);