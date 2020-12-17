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

let ticketErrorRate = (rules, tickets) => {
  let invalidSum = 0;
  tickets.forEach(ticket => {
    let inRanges = ticket.reduce((a, b) => ({...a, [b]: false}), ticket[0]);
    ticket.forEach(number => {
      rules.forEach(rule => {
        let inRange = (number >= rule.range1[0] && number <= rule.range1[1] || 
          number >= rule.range2[0] && number <= rule.range2[1]);
        if (inRange) {
          inRanges[number] = true;
        }
      });
    });
    invalidSum += Object.entries(inRanges).reduce((a, b) => a + (!b[1] ? parseInt(b[0]) : 0), 0);
  });
  return invalidSum;
}

let validTickets = (rules, tickets) => {
  let valids = [], current = 0;
  tickets.forEach(ticket => {
    let inRanges = ticket.reduce((a, b) => ({...a, [b]: false}), ticket[0]);
    ticket.forEach(number => {
      rules.forEach(rule => {
        let inRange = (number >= rule.range1[0] && number <= rule.range1[1] || 
          number >= rule.range2[0] && number <= rule.range2[1]);
        if (inRange) {
          inRanges[number] = true;
        }
      });
    });
    if (!Object.values(inRanges).includes(false)) {
      valids.push(tickets[current]);
    }
    current++;
  });
  return valids;
};

let allTickets = [myTicket, ...validTickets(rules, tickets)];
console.log(`Ticket scanning error rate: ${ticketErrorRate(rules, tickets)} (part 1)`);
// console.log(`Another something: ${2} (part 2)`);