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
    unf.sort((a,b) => {
        if(adjList[a].includes(b)) return -1;
        if(adjList[b].includes(a)) return 1;
        return 0;
    })
    const valid = uS.map(Number).every((n, index) => n === unf[index])
    const mid = unf[parseInt(unf.length / 2)];
    sum1 += mid * valid;
    sum2 += mid * !valid;
})
console.log(sum1, sum2);