const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const [ruleStrings, messages] = buffer.toString().trimEnd().split("\n\n").map(x => x.split("\n"));

let rules = {};
ruleStrings.forEach(rule => {
  let [id, val] = rule.split(": ");
  if (val.includes("\"")) { rules[id] = val.replace(/"/g, ""); }
  else if (val.includes("|")) { rules[id] = val.split(" | ").map(v => v.split(" ")); }
  else { rules[id] = val.split(" "); }
});

console.log(rules);
console.log(messages);

let matchingMessages = -1;
console.log(`Matching rules for rule 0: ${matchingMessages} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);