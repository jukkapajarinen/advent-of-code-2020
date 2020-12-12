const util = require('util');
const fs = require("fs");
const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let shipEndLocation = () => {
  let eastWest = 0, northSouth = 0, direction = 0;
  rows.forEach(row => {
    let [cmd, val] = [row.substr(0, 1), parseInt(row.substr(1))];
    if (cmd === "N") { northSouth += val; }
    else if (cmd === "S") { northSouth -= val; }
    else if (cmd === "E") { eastWest += val; }
    else if (cmd === "W") { eastWest -= val; }
    else if (cmd === "L") { direction = (360 + direction + val) % 360; }
    else if (cmd === "R") { direction = (360 + direction - val) % 360; }
    else if (cmd === "F" && direction === 0) { eastWest += val; }
    else if (cmd === "F" && direction === 180) { eastWest -= val; }
    else if (cmd === "F" && direction === 90) { northSouth += val; }
    else if (cmd === "F" && direction === 270) { northSouth -= val; }
  });
  return [eastWest, northSouth];
};

let shipEndLocationWithWayPoint = () => {
  let eastWest = 0, northSouth = 0, wayPoint = [10, 1];
  rows.forEach(row => {
    let [cmd, val] = [row.substr(0, 1), parseInt(row.substr(1))];
    if (cmd === "N") { wayPoint[1] += val; }
    else if (cmd === "S") { wayPoint[1] -= val; }
    else if (cmd === "E") { wayPoint[0] += val; }
    else if (cmd === "W") { wayPoint[0] -= val; }
    else if (cmd === "L" && (360 + val) % 360 === 90) { wayPoint = [-1 * wayPoint[1], wayPoint[0]]; }
    else if (cmd === "L" && (360 + val) % 360 === 180) { wayPoint = wayPoint.map(i => -1 * i); }
    else if (cmd === "L" && (360 + val) % 360 === 270) { wayPoint = [wayPoint[1], -1 * wayPoint[0]]; }
    else if (cmd === "R" && (360 - val) % 360 === 90) { wayPoint = [-1 * wayPoint[1], wayPoint[0]]; }
    else if (cmd === "R" && (360 - val) % 360 === 180) { wayPoint = wayPoint.map(i => -1 * i); }
    else if (cmd === "R" && (360 - val) % 360 === 270) { wayPoint = [wayPoint[1], -1 * wayPoint[0]]; }
    else if (cmd === "F") { eastWest += wayPoint[0] * val; northSouth += wayPoint[1] * val; }
  });
  return [eastWest, northSouth];
};

let manhattanDistance1 = shipEndLocation().reduce((a, b) => a + Math.abs(b), 0);
let manhattanDistance2 = shipEndLocationWithWayPoint().reduce((a, b) => a + Math.abs(b), 0);

console.log(`Manhattan distance: ${manhattanDistance1} (part 1)`);
console.log(`Manhattan distance: ${manhattanDistance2} (part 2)`);