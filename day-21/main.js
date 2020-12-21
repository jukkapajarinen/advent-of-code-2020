const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/test.txt`);
const input = buffer.toString().trimEnd().split("\n");

console.log(input);

let safeFoods = -1;
console.log(`Allergen-free safe foods: ${safeFoods} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);