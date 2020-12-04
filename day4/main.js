const fs = require("fs");

let path = process.cwd();
let buffer = fs.readFileSync(`${path}/data.txt`);
let rows = buffer.toString().trimEnd()
  .split("\n\n").join("\n=====\n") // replace two line break's with ====='s
  .split("\n").join(" ") // replace all line-breaks with space's
  .split(" ===== ").join("\n") // replace ====='s with line breaks.
  .split("\n");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let validCount = rows.length;
rows.forEach(passport => {
  let passportKeyValues = passport.split(" ");
  let passportKeys = [];
  passportKeyValues.forEach(passportField => {
    let [key, value] = passportField.split(":");
    passportKeys.push(key);
  });

  for (let i = 0; i < requiredFields.length; i++) {
    if (!passportKeys.includes(requiredFields[i])) {
      validCount--;
      break;
    }
  }
});

console.log(`Valid passports: ${validCount} out of ${rows.length}`);
