const util = require('util');
const fs = require("fs");
const { executionAsyncId } = require('async_hooks');

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let eastWest = 0;
let northSouth = 0;
let direction = 0;
rows.forEach(row => {
  let cmd = row.substr(0, 1);
  let val = parseInt(row.substr(1));

  if (cmd === "N") { northSouth += val; }
  else if (cmd === "S") { northSouth -= val; }
  else if (cmd === "E") { eastWest += val; }
  else if (cmd === "W") { eastWest -= val; }
  else if (cmd === "L") { direction = (direction + val + 360) % 360; }
  else if (cmd === "R") { direction = (direction - val + 360) % 360; }
  else if (cmd === "F" && direction === 0) { eastWest += val; }
  else if (cmd === "F" && direction === 180) { eastWest -= val; }
  else if (cmd === "F" && direction === 90) { northSouth += val; }
  else if (cmd === "F" && direction === 270) { northSouth -= val; }
});

let manhattanDistance = Math.abs(eastWest) + Math.abs(northSouth);

console.log(`Manhattan distance: ${manhattanDistance} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);