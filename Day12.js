const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();


const values = data.split("\r\n").map((r) => r.split(''));

const rX = values.length
const rY = values[0].length

const isValid = (x, y) => 0 <= x && x < rX && 0 <= y && y < rY

const group = {} // key rep id, 0 = area, 1 =perimeter
const parents = values.map((rows, i) => rows.map((_, j) => `${i}-${j}`));
const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]]

values.forEach((row, x) => {
    row.forEach((value, y) => {

        let added = false;
        if (parents[x][y] === `${x}-${y}`) {
            group[parents[x][y]] = {
                area: 0,
                perimeter: 0
            }
        } else return;

        visited = [];
        const nextToVisit = [[x, y]];
        const key = `${x}-${y}`;

        while (nextToVisit.length) {
            const [realX, realY] = nextToVisit.shift();
            if (visited.some(([cx, cy]) => cx === realX && cy === realY)) continue;
            parents[realX][realY] = key;
            group[key].area++;
            group[key].perimeter += dirs.reduce((res, dir) => {
                const nX2 = realX + dir[0];
                const nY2 = realY + dir[1];
                res += Number(!isValid(nX2, nY2) || values[x][y] !== values[nX2][nY2]);
                return res;
            }, 0)

            for (const dir of dirs) {
                const nX = realX + dir[0];
                const nY = realY + dir[1];
                if (isValid(nX, nY) && !visited.some(([cx, cy]) => cx === nX && cy === nY) && values[x][y] === values[nX][nY]) {
                    nextToVisit.push([nX, nY]);
                }
            }
            visited.push([realX, realY])
        }
        let fences = []
        let uniqFences = [];
        visited.forEach(([realX, realY]) => {
            let dirI = 0;
            for (const dir of dirs) {
                const nX2 = realX + dir[0];
                const nY2 = realY + dir[1];
                if (!isValid(nX2, nY2) || values[x][y] !== values[nX2][nY2]) {
                    fences.push([nX2, nY2, dirI])
                }
                dirI++;
            }
        })
        fences.forEach(([x, y, direction]) => {
            if (direction === 0 && !fences.some(([xs, ys, dirs]) => dirs === direction && x - 1 === xs && y === ys))
                uniqFences.push([x, y, direction]);
            if (direction === 1 && !fences.some(([xs, ys, dirs]) => dirs === direction && x === xs && y - 1 === ys))
                uniqFences.push([x, y, direction]);
            if (direction === 2 && !fences.some(([xs, ys, dirs]) => dirs === direction && x === xs && y - 1 === ys))
                uniqFences.push([x, y, direction]);
            if (direction === 3 && !fences.some(([xs, ys, dirs]) => dirs === direction && x - 1 === xs && y === ys))
                uniqFences.push([x, y, direction]);
        })
        group[key].fences = uniqFences.length
    })
})

const rs = Object.values(group).reduce((res, g) => {
    return res + g.area * g.fences;
}, 0)
console.log(rs)