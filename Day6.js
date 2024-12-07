const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const rows = data.split("\r\n").map((r) => r.split(''));
const tX = rows.length;
const tY = rows[0].length;
const isValid = (x, y) => 0 <= x && x < tX && 0 <= y && y < tY;
const isObstacle = (x, y) => rows[x][y] === '#';
const getNextDirection = (cDir) => {
    switch (cDir) {
        case "up": return "right";

        case "right": return "down";

        case "down": return "left";

        case "left": return "up";
        default: throw new Error('What ya doin` mate?');
    }
}
const dirs = {
    "up": [-1, 0],
    "right": [0, 1],
    "down": [1, 0],
    "left": [0, -1]
}
let direction = "up";
let cX, cY;
const obstaclesRow = {}
const obstaclesColumn = {}
for (let i = 0; i < tX; i++) {
    for (let j = 0; j < tY; j++) {
        if (rows[i][j] === '^') {
            cX = i;
            cY = j;
        }
        if (rows[i][j] === '#') {
            if (obstaclesRow[i]) {
                obstaclesRow[i].push(j);
                obstaclesRow[i].sort((a,b) => a-b);
            } else obstaclesRow[i] = [j];
            if (obstaclesColumn[j]) {
                obstaclesColumn[j].push(i);
                obstaclesColumn[j].sort((a,b) => a-b);
            } else obstaclesColumn[j] = [i];
        }
    }
}

const inX = cX;
const inY = cY;
const sP = `${cX}, ${cY}`;
let validObPos = [];
do {
    rows[cX][cY] = 'X';
    const [dX, dY] = dirs[direction];

    if (isValid(cX + dX, cY + dY)) {
        if (isObstacle(cX + dX, cY + dY)) {
            direction = getNextDirection(direction);
        } else {
            cX += dX;
            cY += dY;

            // Put hypothetical obstacle
            if (obstaclesColumn[cY])
                obstaclesColumn[cY].push(cX);
            else obstaclesColumn[cY] = [cX];
            if (obstaclesRow[cX])
                obstaclesRow[cX].push(cY);
            else obstaclesRow[cX] = [cY];

            obstaclesRow[cX].sort((a,b) => a-b); // Don't sort lexicographically :'(
            obstaclesColumn[cY].sort((a,b) => a-b);

            const cP = `${cX}, ${cY}`;
            if (cP !== sP && !validObPos.includes(cP)) {
                let tX = inX; // starting one always valid;
                let tY = inY;
                let valid = true;
                const visitedObstacles = [];
                let tempDirection = "up";
                while (valid) {
                    const [tDX, tDY] = dirs[tempDirection];
                    if (tempDirection === 'up') {
                        // find obstacle in this column that is right above me
                        const oX = [...(obstaclesColumn[tY] ?? [])].reverse().find((x) => x < tX);
                        if (typeof oX === 'undefined') valid = false; // if there is no obstacle above it's out
                        else {
                            // Have i reached previously this obstacle from current direction? It'll repeat the same pattern
                            if (visitedObstacles.some((state) => state.location === `${oX}, ${tY}` && state.dir === tempDirection)) break;
                            tX = oX - tDX; // Move just below the obstacle guard: (10, 2), obstacle (8, 2), guard: (8 - (-1), 2 - 0) - guaranteed to be free
                            visitedObstacles.push({ location: `${oX}, ${tY}`, dir: tempDirection }); // mark the obstacle as visited
                        }
                    }
                    if (tempDirection === 'down') {
                        // find obstacle in this column that is right below me
                        const oX = (obstaclesColumn[tY] ?? []).find((x) => x > tX);
                        if (typeof oX === 'undefined') valid = false; // if there is no obstacle below it's out
                        else {
                            // Have i reached previously this obstacle from current direction? It'll repeat the same pattern
                            if (visitedObstacles.some((state) => state.location === `${oX}, ${tY}` && state.dir === tempDirection)) break;
                            tX = oX - tDX; // Move just above the obstacle guard: (8, 2), obstacle (10, 2), guard: (10 - 1, 2 - 0) - guaranteed to be free
                            visitedObstacles.push({ location: `${oX}, ${tY}`, dir: tempDirection }); // mark the obstacle as visited
                        }
                    }
                    if (tempDirection === 'right') {
                        // find obstacle in this row that is right next to me
                        const oY = (obstaclesRow[tX] ?? []).find((y) => y > tY);
                        if (typeof oY === 'undefined') valid = false; // goes out if there is no obstacle next to it
                        else {
                            if (visitedObstacles.some((state) => state.location === `${tX}, ${oY}` && state.dir === tempDirection)) break;
                            tY = oY - tDY; // Move just behind the obstacle, guard: (2, 8), obstacle (2, 10), guard: (2, 10 - 1) - guaranteed to be free
                            visitedObstacles.push({ location: `${tX}, ${oY}`, dir: tempDirection });
                        }
                    }
                    if (tempDirection === 'left') {
                        // find obstacle in this row that is right behind me
                        const oY = [...(obstaclesRow[tX] ?? [])].reverse().find((y) => y < tY);
                        if (typeof oY === 'undefined') valid = false; // if there is no obstacle behind it's out
                        else {
                            if (visitedObstacles.some((state) => state.location === `${tX}, ${oY}` && state.dir === tempDirection)) break;
                            tY = oY - tDY; // Move right from the obstacle, guard (2, 10), obstacle (2, 8), guard: (2, 8 - (-1)) - guaranteed to be free
                            visitedObstacles.push({ location: `${tX}, ${oY}`, dir: tempDirection });
                        }
                    }
                    tempDirection = getNextDirection(tempDirection); // Let's continue the scan in the next direction
                }
                if (valid) {
                    validObPos.push(cP);
                }
            }
            // remove the hypothetical obstacle
            obstaclesRow[cX] = obstaclesRow[cX].filter((y) => y !== cY); 
            obstaclesColumn[cY] = obstaclesColumn[cY].filter((x) => x !== cX);
        }
    } else {
        cX += dX;
        cY += dY;
    }
} while (isValid(cX, cY));

let res = 0;
for (let i = 0; i < tX; i++) {
    for (let j = 0; j < tY; j++) {
        if (rows[i][j] === 'X') {
            res++;
        }
    }
}
console.log(res, validObPos.length);
