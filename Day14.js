const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();


const values = data.split("\r\n");

const X = 101; // 101 / 2 = 51 + 1 + 51 [0, 51), [51], [52, 103)
const Y = 103; // 103 / 2 = 50 [0, 50), [50], [51, 101)
const Xh = parseInt(X / 2);
const Yh = parseInt(Y / 2);

const determineQuadrant = (cx, cy) => {
    if (0 <= cx && cx < Xh && 0 <= cy && cy < Yh) return 0;
    if (0 <= cx && cx < Xh && Yh < cy && cy < Y) return 2;
    if (Xh < cx && cx < X && 0 <= cy && cy < Yh) return 1;
    if (Xh < cx && cx < X && Yh < cy && cy < Y) return 3;
    return 4;
}

const getNextPosition = (cx, cy, vx, vy) => {
    return [(cx + vx + X) % X, (cy + vy + Y) % Y, vx, vy];
}

let robotData = values.map((value) => {
    const [praw, vraw] = value.split(' ')
    const [pxraw, pyraw] = praw.split(',')
    const px = parseInt(pxraw.split('=')[1])
    const py = parseInt(pyraw)
    const [vxraw, vyraw] = vraw.split(',')
    const vx = parseInt(vxraw.split('=')[1])
    const vy = parseInt(vyraw)
    return [px, py, vx, vy]
})

for (let i = 0; i < 100000; i++) {

    const shouldCheck = robotData.some((robot) => {
        const rx = robot[0];
        const ry = robot[1];
        const ndirs = [[0, 1], [1, 0], [1, 1], [-1, 1], [1, -1], [-1, 0], [-1, -1], [0, -1]]
        const nbors = robotData.filter((r) => ndirs.some((dir) => r[0] === rx + dir[0] && r[1] === ry + dir[1]))
        return nbors.length >= 8;
    })
    if (shouldCheck) {
        const tempMap = []

        for (let i = 0; i < X; i++) {
            let s = '';
            for (let j = 0; j < Y; j++) {
                if (robotData.some((robot) => robot[0] === i && robot[1] === j)) {
                    s += ('#')
                }
                else {
                    s += ('.')
                }
            }
            tempMap.push(s);
        }
        console.log(tempMap.join("\r\n"))
        console.log(`\r\n${i}\r\n`)
    }
    robotData = robotData.map((robot) => {
        return getNextPosition(...robot);
    })
}

const quandrantCount = [0, 0, 0, 0, 0]
robotData.forEach((robot) => {
    quandrantCount[determineQuadrant(robot[0], robot[1])]++
})

console.log(quandrantCount[0] * quandrantCount[1] * quandrantCount[2] * quandrantCount[3])