const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/test.txt`);
const tiles = buffer.toString().trimEnd().split("\n\n").map(a => a.split("\n"))
  .map(b => ({id: parseInt(b[0].match(/\d+/)[0]), tile: b.slice(1)}));

console.log(tiles);

let cornerIdsMultiplied = -1;
console.log(`Corner IDs multiplied: ${cornerIdsMultiplied} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);