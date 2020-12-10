const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");
const numbers = rows.map(x => parseInt(x)).sort((a, b) => a - b);

let joltDiffsProduct = (joltages) => {
  let ones = [0];
  let threes = [joltages[joltages.length-1]];
  for (let i = 0; i < joltages.length - 1; i++) {
    let diff = joltages[i + 1] - joltages[i];
    if (diff === 1) {
      ones.push(joltages[i]);
    } 
    else if (diff === 3) {
      threes.push(joltages[i]);
    }
  }
  return ones.length * threes.length;
};

let distinctArrangements = (joltages) => {
  joltages = [0, ...joltages, joltages[joltages.length - 1] + 3];
  let multiplier = 1;
  let incrementer = 0;
  let arrangements = 1;
  for (let i = 0; i < joltages.length; i++) {
    let diff = joltages[i + 1] - joltages[i];
    if (diff === 1) {
      multiplier += incrementer;
      incrementer++;
    }
    else if (diff === 3) {
      arrangements *= multiplier;
      multiplier = 1;
      incrementer = 0;
    }
  }
  return arrangements;
};

console.log(`Ones times threes: ${joltDiffsProduct(numbers)} (part 1)`);
console.log(`Distinct ways: ${distinctArrangements(numbers)} (part 2)`);