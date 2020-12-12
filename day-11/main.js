const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n").map(s => s.split(""));
const adjacents = [
  [-1, -1], // top-left
  [0, -1], // top-center
  [1, -1], // top-right
  [-1, 0], // left
  [1, 0], // right
  [-1, 1], // bottom-left
  [0, 1], // bottom-center
  [1, 1], // bottom-right
];

let printArray = (array) => console.log(array.join("\n").split(",").join(""));
let clone = array => JSON.parse(JSON.stringify(array));

let simulate = (rows, tolerance, puzzle) => {
  let prevSeats = [];
  let currentSeats = clone(rows);
  while(JSON.stringify(prevSeats) !== JSON.stringify(currentSeats)) {
    prevSeats = clone(currentSeats);
    for (let i = 0; i < prevSeats.length; i++) {
      for (let j = 0; j < prevSeats[i].length; j++) {
        let occupiedNeighbours = adjacents.map(s => prevSeats[i + s[0]] && prevSeats[i + s[0]][j + s[1]] ? 
          prevSeats[i + s[0]][j + s[1]] === "#" : false).filter(s => s === true);

        if (puzzle === 2) {
          occupiedNeighbours = adjacents.map(s => {
            for (let multiplier = 1; true; multiplier++) {
              let ii = i + s[0] * multiplier;
              let jj = j + s[1] * multiplier;

              if (!prevSeats[ii] || !prevSeats[ii][jj] || prevSeats[ii][jj] === "L") {
                return false;
              }
              else if (prevSeats[ii][jj] === "#") {
                return true;
              }
            }
          }).filter(s => s === true);
        }

        if (prevSeats[i][j] === "L" && occupiedNeighbours.length === 0) {
          currentSeats[i][j] = "#";
        }
        else if (prevSeats[i][j] === "#" && occupiedNeighbours.length >= tolerance) {
          currentSeats[i][j] = "L";
        }
      }
    }
  }
  return currentSeats;
};

let occupiedCount = simulate(rows, 4, 1).join("").split("").filter(c => c === "#").length;
let occupiedCount2 = simulate(rows, 5, 2).join("").split("").filter(c => c === "#").length;

console.log(`Occupied seats: ${occupiedCount} (part 1)`);
console.log(`Occupied seats: ${occupiedCount2} (part 2)`);
