const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const entites = data.split('\r\n\r\n');
const keys = [], locks = []
entites.forEach((e, eId) => {
    const ent = [-1,-1,-1,-1,-1];
    let isKey = true;
    e.split('\r\n').forEach((line, lId) => {
        line.split('').forEach((v, vId) => {
            if (v === '#') {
               ent[vId]++;
               if(lId === 0) isKey = false;
            }
        })
    });
    if(isKey) keys.push(ent);
    else locks.push(ent);
});
let score = 0;
keys.forEach(key => {
    locks.forEach(lock => {
        const isValid = key.every((k, index) => k + lock[index] <= 5);
        if(isValid) score++;
    })
})
console.log(score)