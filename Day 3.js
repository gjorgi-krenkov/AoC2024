const fs = require('node:fs');

const regex = /mul\([0-9][0-9]*,[0-9][0-9]*\)/g;
const regex2 = /mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g;
const data = fs.readFileSync('input.txt').toString();

console.log(data.match(regex).reduce((result, item) => { // part 1
    const [aStr, bStr] = item.slice(4, -1).split(',');
    return result + Number.parseInt(aStr) * Number.parseInt(bStr)
}, 0));

let enabled = true;
console.log(data.match(regex2).reduce((result, item) => { // part 2
    if (item.startsWith('don\'t')) {
        enabled = false;
        return result;
    }
    if (item.startsWith('do')) {
        enabled = true;
        return result;
    }
    const [aStr, bStr] = item.slice(4, -1).split(',');
    return result + Number.parseInt(aStr) * Number.parseInt(bStr) * enabled;
}, 0));
