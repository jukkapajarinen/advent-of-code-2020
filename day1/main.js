const fs = require("fs");

let path = process.cwd();
let buffer = fs.readFileSync(`${path}/data.txt`);
let rows = buffer.toString().split("\n");

rows.forEach(operand1 => {
  if (!isNaN(parseInt(operand1))) {
    rows.forEach(operand2 => {
      if (!isNaN(parseInt(operand2))) {
        if (parseInt(operand1) + parseInt(operand2) === 2020) {
          console.log(`Part 1: ${operand1} * ${operand2} = ${parseInt(operand1) * parseInt(operand2)}`);
        }
      }
    });
  }
});

rows.forEach(operand1 => {
  if (!isNaN(parseInt(operand1))) {
    rows.forEach(operand2 => {
      if (!isNaN(parseInt(operand2))) {
        rows.forEach(operand3 => {
          if (!isNaN(parseInt(operand3))) {
            if (parseInt(operand1) + parseInt(operand2) + parseInt(operand3) === 2020) {
              console.log(`Part 2: ${operand1} * ${operand2} * ${operand3} = ${parseInt(operand1) * parseInt(operand2) * parseInt(operand3)}`);
            }
          }
        });
      }
    });
  }
});