const util = require('util');
const fs = require("fs");
const { start } = require('repl');

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");
const [startTime, busIds] = [parseInt(rows[0]), rows[1].split(",").map(b => parseInt(b))];

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

let contestTimestampBruteForce = (startTime, busIds) => {
  let currentTime = startTime < 100000000000000 ? 100000000000000 : startTime;
  console.log(`Starting from: ${currentTime}, please wait...`);
  while (true) {
    let offsetsOkay = busIds.map(b => isNaN(b));
    for (let i = 0; i < busIds.length; i++) {
      if (isNaN(busIds[i])) { continue; }
      if (currentTime % busIds[0] !== 0) { break; } // to save time
      offsetsOkay[i] = (currentTime + i) % busIds[i] === 0;
    }
    if (offsetsOkay.filter(b => b === true).length === busIds.length) {
      return currentTime;
    }
    currentTime++;
  }
};

let contestTimestamp = (startTime, busIds) => {
  let currentTime = startTime;
  let currentProduct = busIds[0];
  for (let i = 1; i < busIds.length; i++) {
    if (isNaN(busIds[i])) { continue; }
    while ((currentTime + i) % busIds[i] !== 0) {
      currentTime += currentProduct;
    }
    currentProduct *= busIds[i];
  }
  return currentTime;
};

let solution1 = busWaitTime(startTime, busIds.filter(b => !isNaN(b))).reduce((a, b) => a * b, 1);
let solution2 = contestTimestamp(busIds[0], busIds);

console.log(`WaitTime x busId: ${solution1} (part 1)`);
console.log(`Timestamp for contest: ${solution2} (part 2)`);