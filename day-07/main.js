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
        amount: parseInt(b.split(" ")[0]),
        color: b.split(" ").slice(1).join(" ")
      };
    })
  });
});

let whatBagCanContain = (color) => {
  return bagObjects.filter(outerBag => outerBag.bags.some(b => b.color === color));
};

let recursiveWhatBagCanContain = (startColor) => {
  let bags = whatBagCanContain(startColor);
  bags.forEach(b => {
    bags = bags.concat(recursiveWhatBagCanContain(b.color));
  });
  return bags;
};

let recursiveSubBagCount = (color) => {
  let sum = 0;
  let bag = bagObjects.filter(b => b.color === color)[0];
  bag.bags.forEach(b => {
    sum += b.amount + b.amount * recursiveSubBagCount(b.color);
  });
  return sum;
};

let shinyGoldPossibilities = [...new Set(recursiveWhatBagCanContain("shiny gold").map(b => b.color))];
let shinyGoldSubBags = recursiveSubBagCount("shiny gold");

console.log(`Bag amount: ${shinyGoldPossibilities.length} (part 1)`);
console.log(`Bag amount: ${shinyGoldSubBags} (part 2)`);