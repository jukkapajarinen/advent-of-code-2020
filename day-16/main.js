const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd();

let [rules, myTicket, tickets] = rows.split("\n\n");
rules = rules.split("\n").map(r => {
  let name = r.split(": ")[0];
  let [range1, range2] = r.split(": ")[1].split(" or ");
  return { 
    name: name, 
    range1: range1.split("-").map(v => parseInt(v)), 
    range2: range2.split("-").map(v => parseInt(v)) 
  };
});
myTicket = myTicket.split("\n").slice(1)[0].split(",").map(v => parseInt(v));
tickets = tickets.split("\n").slice(1).map(t => t.split(",").map(v => parseInt(v)));

console.log(rules);
console.log(myTicket);
console.log(tickets);

console.log(`Something: ${1} (part 1)`);
console.log(`Another something: ${2} (part 2)`);