const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const tiles = buffer.toString().trimEnd().split("\n\n").map(a => a.split("\n"))
  .map(b => ({ id: parseInt(b[0].match(/\d+/)[0]), tile: b.slice(1) }));

const mirror = t => t.map(a => a.split("").reverse().join(""));
const rotate = t => t.map((a, idx) => t.map(b => b[idx]).reverse()).map(c => c.join(""));

let assemble = tiles => {
  let topBorders = new Map();
  tiles.forEach(tile => {
    [
      tile.tile,
      rotate(tile.tile),
      rotate(rotate(tile.tile)),
      rotate(rotate(rotate(tile.tile))),
      mirror(tile.tile),
      rotate(mirror(tile.tile)),
      rotate(rotate(mirror(tile.tile))),
      rotate(rotate(rotate(mirror(tile.tile))))
    ].map(t => t[0]).forEach(b => {
      topBorders.set(b, (topBorders.get(b) || []).concat(tile.id));
    });
  });
  
  let neighbors = new Map();
  topBorders.forEach(ids => {
    if (ids.length === 2) {
      let tileNeighbors = ids.map(id => neighbors.get(id) || new Set());
      neighbors.set(ids[0], tileNeighbors[0].add(ids[1]));
      neighbors.set(ids[1], tileNeighbors[1].add(ids[0]));
    }
  });
  return neighbors;
};

let assembledCorners = tiles => {
  let corners = [];
  let assembled = assemble(tiles);
  assembled.forEach((neighbors, id) => {
    if (neighbors.size === 2) {
      corners.push(id);
    }
  });
  return corners;
};

let cornersMultiplied = assembledCorners(tiles).reduce((a, b) => a * b, 1);
console.log(`Corner IDs multiplied: ${cornersMultiplied} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);