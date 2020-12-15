const input = [13,0,10,12,1,5,8];

let playElfGame = (input, target) => {
  let spoken = new Map(input.map((v, i) => [v, i + 1]));
  let next = -1;
  let last = input[input.length - 1];
  for (let turn = input.length; turn < target ; turn++) {
    let prevSpoken = turn, prevPrevSpoken = spoken.has(last) ? spoken.get(last) : -1;
    last = prevPrevSpoken < 0 ? 0 : prevSpoken - prevPrevSpoken;
    spoken.set(next, turn);
    next = last;
  }
  return last;
};

console.log(`2020th number: ${playElfGame(input, 2020)} (part 1)`);
console.log(`30000000th number: ${playElfGame(input, 30000000)} (part 2)`);