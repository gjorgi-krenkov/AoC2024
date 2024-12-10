const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

let dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];

let rows = data.split("\r\n").map((r) => r.split(''));
const rowCount = rows.length;
const colCount = rows[0].length;

const isValid = (rId, cId) => 0 <= rId && rId < rowCount && 0 <= cId && cId < colCount;
let res = 0;

rows.forEach((row, indI) => {
    row.forEach((value, indJ) => {
        if (value === '0') {
            let search = 1;
            let foundItems = [[indI, indJ]]
            while (search < 10) {
                const tempFound = []
                while (foundItems.length) {
                    const temp = foundItems.pop();
                    const [i, j] = temp;
                    for (const [dx, dy] of dirs) {
                        if (isValid(i + dx, j + dy)) {
                            if (rows[i + dx][j + dy] === search.toString())
                                tempFound.push([i + dx, j + dy])
                        }
                    }
                }
                foundItems = [...tempFound]
                search++;
            }

            if (search === 10) {
                res += foundItems.length;
            }
        }
    })
})

console.log(res);