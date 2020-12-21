const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const [rules, messages] = buffer.toString().trimEnd().split("\n\n").map(a => a.split("\n"));

let parsed = rules => {
  let parsed = new Map();
  rules.forEach(rule => {
    let [id, val] = rule.split(": ");
    if (val.includes("\"")) { 
      parsed.set(parseInt(id), val.replace(/"/g, ""));
    }
    else if (val.includes("|")) { 
      parsed.set(parseInt(id), val.split(" | ").map(a => a.split(" ")
        .map(b => parseInt(b))));
    }
    else { 
      parsed.set(parseInt(id), [val.split(" ").map(a => parseInt(a))]);
    }
  });
  return parsed;
};

let generateRegex = (ruleId, rules) => {
  const recursiveRegex = id => {
    let rule = rules.get(id);
    return ['a', 'b'].includes(rule) ? rule 
      : `(${rule.map(a => a.map(b => recursiveRegex(b, rules)).join("")).join("|")})`;
  };
  return new RegExp(`^${recursiveRegex(0)}$`);
};

let regex = generateRegex(0, parsed(rules));
let matches = messages.filter(msg => msg.match(regex)).length;
console.log(`Matching rules: ${matches} from ${messages.length} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);