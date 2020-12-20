const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/test.txt`);
const input = buffer.toString().trimEnd().split("\n");

let state = [];
input.forEach((row, y) => {
  row.split("").forEach((char, x) => {
    state.push({x: x, y: y, z: 0, active: char === "#"});
  });
});

let expansion = state => {
  let newCubes = [];
  //-1, 0, 1 etc
  return newCubes;
};

let shouldStayActive = cube => {
  //exactly 2 or 3 of its neighbors are also active, the cube remains active.
  return cube.active;
};
let shouldTurnActive = cube => {
  //exactly 3 of its neighbors are active, the cube becomes active.
  return cube.active;
};

let cycle = lastState => {
  let nextState = [...lastState, ...expansion(lastState)];
  nextState.forEach(cube => {
    cube.active = ((cube.active && shouldStayActive(cube)) || 
      (!cube.active && shouldTurnActive(cube)));
  });
  return nextState;
};

console.log("Initial state", state);

for (let i = 0; i < 6; i++) {
  state = cycle(state);
}

console.log("6 cycles state", state);

let activeCubes = state.reduce((a, b) => a + (b.active ? 1 : 0), 0);
console.log(`Actives after 6 cycles: ${activeCubes} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);