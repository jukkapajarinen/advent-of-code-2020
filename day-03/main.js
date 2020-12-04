const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().split("\n").filter(row => row.length > 0);
let slope = [];
const horizontalStretch = 1000;

rows.forEach((row, idx) => {
  slope[idx] = row.repeat(horizontalStretch).split("");
});

let treeCounter = (slope, right, down) => {
  let printSlope = JSON.parse(JSON.stringify(slope));
  let treeCount = 0;
  for (let i = 0; i < slope.length; i += down) {
    if (i == 0) {
      continue;
    }

    let position = i / down * right;

    if (slope[i][position] === "#") {
      treeCount++;
      printSlope[i][position] = "X";
    }
    else {
      printSlope[i][position] = "O";
    }
  }

  return treeCount;
};

let r1d1 = treeCounter(slope, 1, 1);
let r3d1 = treeCounter(slope, 3, 1);
let r5d1 = treeCounter(slope, 5, 1);
let r7d1 = treeCounter(slope, 7, 1);
let r1d2 = treeCounter(slope, 1, 2);

console.log(`Trees 1,1: ${r1d1}`);
console.log(`Trees 3,1: ${r3d1}`);
console.log(`Trees 5,1: ${r5d1}`);
console.log(`Trees 7,1: ${r7d1}`);
console.log(`Trees 1,2: ${r1d2}`);
console.log(`Tree product: ${r1d1 * r3d1 * r5d1 * r7d1 * r1d2}`);
