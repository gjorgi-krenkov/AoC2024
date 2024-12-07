const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const rows = data.split("\r\n");

let totalSum = 0;
rows.forEach((row) => {
    const [neededRaw, opRaw] = row.split(': ')
    const needed = Number.parseInt(neededRaw);
    op = opRaw.split(' ').map((c) => Number.parseInt(c));
    let resultSet = [op[0] + op[1], op[0] * op[1], Number.parseInt(`${op[0]}${op[1]}`)];
    for (let i = 2; i < op.length; i++) {
        resultSet = resultSet.flatMap((el) => ([el + op[i], el * op[i], Number.parseInt(`${el}${op[i]}`)]));
        resultSet = [... new Set(resultSet)];
    }
    if (resultSet.includes(needed)) totalSum += needed;
})
console.log(totalSum);