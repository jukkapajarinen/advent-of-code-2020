const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().trimEnd();
let groups = rows.split("\n\n");

let yesCounter = puzzle => {
  let yesCount = 0;
  groups.forEach(group => {
    let persons = group.split("\n");
    let answers = persons.join("");
    let combined = [...new Set([...answers])].join("");
    if (puzzle === 2 && persons.length > 1) {
      combined = combined.split("").filter(letter => {
        let occurencies = answers.split("").filter(x => x === letter).length;
        return occurencies === persons.length;
      }).join("");
    }
    yesCount += combined.length;
  });
  return yesCount;
};

console.log(`Sum of yes answers: ${yesCounter(1)} (part 1)`);
console.log(`Sum of yes answers: ${yesCounter(2)} (part 2)`);