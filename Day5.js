const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const adjList = {}
const [edges, updates] = data.split("\r\n\r\n");

edges.split("\n").forEach((edgePair) => {
    const [us, vs] = edgePair.split("|");
    const u = Number(us);
    const v = Number(vs);
    if (typeof adjList[u] !== 'undefined') {
        adjList[u].push(v);
    } else {
        adjList[u] = [v];
    }
});

let sum1 = 0;
let sum2 = 0;
updates.split('\r\n').forEach((update) => {
    const uS = update.split(',');
    const unf = uS.map(Number);
    let valid = true;
    let disallowedValues = [];
    const len = unf.length;
    for (let i = 1; i <= len; i++) {
        valid = valid && !disallowedValues.includes(unf[len - i]);
        disallowedValues = [...new Set([...disallowedValues, ...(adjList[unf[len - i]] ?? [])])];

        if (disallowedValues.includes(unf[len - i])) { // part 2
            const [removed] = unf.splice(len - i, 1);
            for (let j = 1; j <= len; j++) { // smesti go posle prvia chale
                if ((adjList[unf[len - j - 1]] ?? []).includes(removed)) {
                    unf.splice(len - j, 0, removed);
                    break;
                }
            }
        }
    }
    const mid = unf[parseInt(unf.length / 2)];
    sum1 += mid * valid;
    sum2 += mid * !valid;
})
console.log(sum1, sum2);