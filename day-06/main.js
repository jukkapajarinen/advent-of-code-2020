const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().trimEnd();
let groups = rows.split("\n\n");

let yesCount = 0;
groups.forEach(group => {
  let persons = group.split("\n");
  let combined = [...new Set([...persons.join("")])].join("");
  yesCount += combined.length;
});

console.log(`Sum of yes answers: ${yesCount} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);