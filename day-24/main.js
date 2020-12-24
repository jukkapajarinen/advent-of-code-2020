const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/test.txt`);
const input = buffer.toString().trimEnd().split("\n");

console.log(input);

let blackTiles = -1;
console.log(`Black tiles: ${blackTiles} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);