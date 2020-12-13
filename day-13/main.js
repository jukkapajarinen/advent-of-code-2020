const util = require('util');
const fs = require("fs");
const { start } = require('repl');

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");
const [startTime, busIds] = [parseInt(rows[0]), rows[1].split(",").filter(b => b !== "x").map(b => parseInt(b))];

let busWaitTime = (startTime, busIds) => {
  let currentTime = startTime;
  while (true) {
    for (let i = 0; i < busIds.length; i++) {
      if (currentTime % busIds[i] === 0) {
        return [currentTime - startTime, busIds[i]];
      }
    }
    currentTime++;
  }
};

let solution1 = busWaitTime(startTime, busIds).reduce((a, b) => a * b, 1);

console.log(`WaitTime x busId: ${solution1} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);