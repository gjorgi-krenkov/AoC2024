const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const coordsRaw = data.split('\r\n')

const GRID_X = 71;
const GRID_Y = 71;

let grid = [];

const coords = coordsRaw.map((coordP) => coordP.split(',').map((v) => parseInt(v)));
let filter = 1024;
while (filter < coords.length) {
    const cf = coords.filter((c, index) => index < filter);
    grid = [];
    for (let i = 0; i < GRID_X; i++) {
        grid.push([]);
        for (let j = 0; j < GRID_Y; j++) {
            if (cf.some((c) => c[0] === i && c[1] === j)) {
                grid[i].push(-1);
            } else grid[i].push(99999999)
        }
    }

    const q = [[0, 0]];
    const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]]

    grid[0][0] = 0;
    while (q.length) {
        const [x, y] = q.shift();
        for ([dx, dy] of dirs) {
            const isValid = (x, y) => 0 <= x && x < GRID_X && 0 <= y && y < GRID_Y && grid[x][y] !== -1

            if (isValid(x + dx, y + dy) && grid[x + dx][y + dy] === 99999999) {
                grid[x + dx][y + dy] = grid[x][y] + 1;
                q.push([x + dx, y + dy])
            }
        }
    }
    if(grid[GRID_X - 1][GRID_Y - 1] === 99999999) break;
    filter++;
}
console.log(coords[filter - 1])