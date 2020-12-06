const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().split("\n");

let sumOf2020 = puzzle => {
  let product = -1;
  rows.forEach(operand1 => {
    rows.forEach(operand2 => {
      if (parseInt(operand1) + parseInt(operand2) === 2020) {
        product = parseInt(operand1) * parseInt(operand2);
      }

      if (puzzle === 2) {
        rows.forEach(operand3 => {
          if (parseInt(operand1) + parseInt(operand2) + parseInt(operand3) === 2020) {
            product = parseInt(operand1) * parseInt(operand2) * parseInt(operand3);
          }
        });
      }
    });
  });
  return product;
};

console.log(`Product of 2 entries: ${sumOf2020(1)} (part 1)`);
console.log(`Product of 3 entries: ${sumOf2020(2)} (part 2)`);