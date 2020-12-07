const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let bagObjects = [];
rows.forEach(rule => {
  let [outerBag, innerBags] = rule.split("bags contain").map(x => x.trim());
  innerBags = innerBags.replace(" bags.", "").replace(" bag.", "")
    .split(" bags").join("").split(" bag").join("")
    .split(", ");

  bagObjects.push({
    color: outerBag,
    bags: innerBags[0] === "no other" ? [] : innerBags.map(b => {
      return {
        amount: b.split(" ")[0],
        color: b.split(" ").slice(1).join(" ")
      };
    })
  });
});

let whatBagCanContain = (color) => {
  console.log("whatBagCanContain", color);
  return bagObjects.filter(outerBag => outerBag.bags.some(b => b.color === color));
};

let recursiveBagCanContain = (startColor) => {
  let bags = whatBagCanContain(startColor);
  bags.forEach(b => {
    bags = bags.concat(recursiveBagCanContain(b.color));
  });
  return bags;
};

let shinyGoldPossibilities = [...new Set(recursiveBagCanContain("shiny gold").map(b => b.color))];

console.log(util.inspect(shinyGoldPossibilities, false, null, true));
console.log(`Bag amount: ${shinyGoldPossibilities.length} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);