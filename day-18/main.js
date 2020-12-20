const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const input = buffer.toString().trimEnd().split("\n");

let evaluate = (expression, precedence) => {
  let parentheses = expression.match(/\([^()]+\)/g);
  while(parentheses) {
    expression = expression.replace(/\([^()]+\)/g, innerExpression => calculate(innerExpression, precedence));
    parentheses = expression.match(/\([^()]+\)/g);
  }
  return calculate(expression, precedence);
};

let calculate = (expression, precedence) => {
  expression = expression.replace("(", "").replace(")", "");
  if (precedence && expression.includes("+")) { 
    expression = expression.replace(/(\d+ \+ )+\d+/g, addition => calculate(addition, false)); 
  }
  let splitted = expression.split(" ");
  let [result, operator] = [parseInt(splitted[0]), splitted[1]];
  splitted.slice(2).forEach(current => {
    if (current === "*" || current === "+") {
      operator = current;
    }
    else if (operator === "*") {
      result *= parseInt(current);
    }
    else if (operator === "+") {
      result += parseInt(current);
    }
  });
  return result;
};

let solutions1 = input.map(row => evaluate(row, false));
let solutions2 = input.map(row => evaluate(row, true));
console.log(`Sum of expressions: ${solutions1.reduce((a, b) => a + b, 0)} (part 1)`);
console.log(`Sum of expressions: ${solutions2.reduce((a, b) => a + b, 0)} (part 2)`);