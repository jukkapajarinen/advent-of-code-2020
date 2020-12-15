const util = require('util');
const fs = require("fs");

const path = process.argv[1].replace("/main.js", "");
const buffer = fs.readFileSync(`${path}/input.txt`);
const rows = buffer.toString().trimEnd().split("\n");

let decoder1 = input => {
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let memory = {};
  input.forEach(row => {
    if (row.includes("mask")) {
      mask = row.replace("mask = ", "");
    }
    else if(row.includes("mem")) {
      let [addr, val] = row.split("=").map(m => parseInt(m.match(/\d+/)));
      let res = val.toString(2).padStart(36, "0");
      for (let i = mask.length - 1; i > -1; i--) {
        if (mask[i] === "X") { continue; }
        res = res.substring(0, i) + mask[i] + res.substring(i + 1);
      }
      memory[addr] = parseInt(res, 2);
    }
  });
  return memory;
};

let decoder2 = input => {
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let memory = {};
  input.forEach(row => {
    if (row.includes("mask")) {
      mask = row.replace("mask = ", "");
    }
    else if(row.includes("mem")) {
      let [addr, val] = row.split("=").map(m => parseInt(m.match(/\d+/)));
      let res = addr.toString(2).padStart(36, "0");
      let results = Array(Math.pow(2, (mask.split("X").length - 1))).fill(res);
      let fluctCounter = 0;
      for (let i = mask.length - 1; i > -1; i--) {
        if (mask[i] === "0") { continue; }
        else if (mask[i] === "1") { 
          results = results.map(res => res.substring(0, i) + "1" + res.substring(i + 1));
        }
        else if (mask[i] === "X") {
          let fluctBit = "0";
          for (let j = 1, k = 0; k < results.length; k++) {
            results[k] = results[k].substring(0, i) + fluctBit + results[k].substring(i + 1);
            if (j >= Math.pow(2, fluctCounter)) {
              fluctBit = fluctBit === "0" ? "1" : "0";
              j = 1;
            }
            else {
              j++;
            }
          }
          fluctCounter++;
        }
      }
      results.forEach(res => { memory[parseInt(res, 2)] = val; });
    }
  });
  return memory;
};

let memorySum = map => Object.values(map).reduce((a, b) => a + b, 0);
console.log(`Sum in memory: ${memorySum(decoder1(rows))} (part 1)`);
console.log(`Sum in memory: ${memorySum(decoder2(rows))} (part 2)`);
