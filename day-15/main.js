const input = [13,0,10,12,1,5,8];

let playElfGame = input => {
  let spoken = [...input];
  let last = input[input.length - 1];
  for (let turn = input.length; turn < 2020 ; turn++) {
    prevSpoken = spoken.lastIndexOf(last);
    prevPrevSpoken = spoken.slice(0, prevSpoken).lastIndexOf(last);
    let next = (prevSpoken < 0 || prevPrevSpoken < 0) ? 0 : prevSpoken - prevPrevSpoken;
    spoken.push(next);
    last = next;
  }
  return spoken.pop();
};

console.log(`2020th number: ${playElfGame(input)} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);