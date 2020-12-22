const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/test.txt`);
const input = buffer.toString().trimEnd();
const [p1, p2] = input.split("\n\n").map(a => a.split("\n").map(b => parseInt(b)).slice(1));

console.log(p1, p2);

let score = -1;
console.log(`Winner's Score: ${score} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);