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

let simulate = (rows) => {
  let prevSeats = [];
  let currentSeats = clone(rows);
  while(JSON.stringify(prevSeats) !== JSON.stringify(currentSeats)) {
    prevSeats = clone(currentSeats);
    for (let i = 0; i < prevSeats.length; i++) {
      for (let j = 0; j < prevSeats[i].length; j++) {
        let occupiedNeighbours = adjacents.map(s => prevSeats[i + s[0]] && prevSeats[i + s[0]][j + s[1]] ? 
          prevSeats[i + s[0]][j + s[1]] === "#" : false).filter(s => s === true);

        if (prevSeats[i][j] === "L" && occupiedNeighbours.length === 0) {
          currentSeats[i][j] = "#";
        }
        else if (prevSeats[i][j] === "#" && occupiedNeighbours.length > 3) {
          currentSeats[i][j] = "L";
        }
      }
    }
  }
  return currentSeats;
};

let occupiedCount = simulate(rows).join("").split("").filter(c => c === "#").length;

console.log(`Occupied seats: ${occupiedCount} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);
