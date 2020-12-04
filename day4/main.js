const fs = require("fs");

let path = process.cwd();
let buffer = fs.readFileSync(`${path}/data.txt`);
let rows = buffer.toString().trimEnd()
  .split("\n\n").join("\n=====\n") // replace two line break's with ====='s
  .split("\n").join(" ") // replace all line-breaks with space's
  .split(" ===== ").join("\n") // replace ====='s with line breaks.
  .split("\n");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let validate = (key, value) => {
  switch (key) {
    case "byr":
      return /(19[2-8][0-9]|199[0-9]|200[0-2])/.test(value);
    case "iyr":
      return /(201[0-9]|2020)/.test(value);
    case "eyr":
      return /(202[0-9]|2030)/.test(value);
    case "hgt":
      return /^(1[5-8][0-9]|19[0-3])cm$|^(59|6[0-9]|7[0-6])in$/.test(value);
    case "hcl":
      return /^#[0-9a-f]{6}$/.test(value);
    case "ecl":
      return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);
    case "pid":
      return /^\d{9}$/.test(value);
    case "cid":
      return true;
  }
};

let validsCounter = (puzzleNumber) => {
  let validCount = rows.length;
  rows.forEach(passport => {
    let passportKeyValues = passport.split(" ");
    let passportKeys = [];
    let valid = true;
  
    passportKeyValues.forEach(passportField => {
      let [key, value] = passportField.split(":");
      passportKeys.push(key);

      // Check that all required fields are valid
      if (puzzleNumber === 2) {
        if (valid && !validate(key, value)) {
          valid = false;
        }
      }
    });
  
    // Check that all required fields are present
    for (let i = 0; i < requiredFields.length; i++) {
      if (!passportKeys.includes(requiredFields[i])) {
        valid = false;
        break;
      }
    }
  
    // Reduce valid passports count if not valid
    if (!valid) {
      validCount--;
    }
  });
  return validCount;
};

console.log(`Valid passports: ${validsCounter(1)} out of ${rows.length} (part 1)`);
console.log(`Valid passports: ${validsCounter(2)} out of ${rows.length} (part 2)`);
