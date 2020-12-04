const fs = require("fs");

let path = process.argv[1].replace("/main.js", "");
let buffer = fs.readFileSync(`${path}/input.txt`);
let rows = buffer.toString().split("\n").filter(row => row.length > 0);

let validCount = 0;
let validCount2 = 0;
rows.forEach(row => {
  let [policy, password] = row.split(": ");
  let [policyIntervals, policyChar] = policy.split(" ");
  let policyFrom = parseInt(policyIntervals.split("-")[0]);
  let policyTo = parseInt( policyIntervals.split("-")[1]);
  let occurencies = password.split(policyChar).length - 1;

  if (occurencies >= policyFrom && occurencies <= policyTo) {
    validCount++;
  }

  let char1 = password[policyFrom-1];
  let char2 = password[policyTo-1];
  
  if (char1 !== char2 && (char1 === policyChar || char2 === policyChar)) {
    validCount2++;
  }
});
console.log(`Valid passwords: ${validCount} out of ${rows.length} (part1)`);
console.log(`Valid passwords: ${validCount2} out of ${rows.length} (part2)`);
