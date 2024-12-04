const fs = require('node:fs');

const regex = /mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g;
const data = fs.readFileSync('input.txt').toString();
let enabled = true;

const res = data.match(regex).reduce((result, item) => { // part 1 and 2
    if (item.startsWith('do')) {
        enabled = !item.startsWith("don't");
        return result;
    }
    const [aStr, bStr] = item.slice(4, -1).split(',');
    return [
        result[0] + Number.parseInt(aStr) * Number.parseInt(bStr),
        result[1] + Number.parseInt(aStr) * Number.parseInt(bStr) * enabled
    ]
}, [0, 0]);

console.log('P1: ', res[0], 'P2: ', res[1]);
