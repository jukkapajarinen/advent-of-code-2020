const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().trimEnd().split("\n");

let highestSeat = 0;
let seatIds = [];
rows.forEach(boardingPass => {
  let row = boardingPass.substr(0, 7).split("");
  let column = boardingPass.substr(7, 3).split("");

  let currentRowBounds = [0, 127];
  for (let i = 0; i < row.length; i++) {
    let partition = 128 / (Math.pow(2, (i+1)));
    if (row[i] === "F") {
      currentRowBounds[1] = currentRowBounds[1] - partition;
    }
    else {
      currentRowBounds[0] = currentRowBounds[0] + partition;
    }
  }

  let currentColumnBounds = [0, 7];
  for (let i = 0; i < column.length; i++) {
    let partition = 8 / (Math.pow(2, (i+1)));
    if (column[i] === "L") {
      currentColumnBounds[1] = currentColumnBounds[1] - partition;
    }
    else {
      currentColumnBounds[0] = currentColumnBounds[0] + partition;
    }
  }

  let rowId = currentRowBounds[0];
  let columnId = currentColumnBounds[0];
  let seatId = rowId * 8 + columnId;

  highestSeat = (highestSeat < seatId) ? seatId : highestSeat;
  seatIds.push(seatId);

  console.log(boardingPass, rowId, columnId, seatId);
});

console.log(`Highest seat ID: ${highestSeat} (part 1)`);

let mySeatId = 0;
seatIds.sort((a, b) => a - b);
for (let i = 0; i < seatIds.length; i++) {
  if (seatIds.indexOf(seatIds[i] + 1) === -1) {
    mySeatId = seatIds[i] + 1;
    break;
  }
}

console.log(`My seat ID: ${mySeatId} (part 2)`);