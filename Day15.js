const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const [p1, sequence] = data.split('\r\n\r\n')
let board = []

const p2 = p1.split('\r\n');

let dirs = {
    '<': [0, -1],
    '>': [0, 1],
    '^': [-1, 0],
    'v': [1, 0]
}
let cx, cy;
for (let i = 0; i < p2.length; i++) {
    board.push([]);
    for (let j = 0; j < p2[0].length; j++) {

        if (p2[i][j] === '#')
            board[i].push('#', '#')
        if (p2[i][j] === '.')
            board[i].push('.', '.')
        if (p2[i][j] === 'O')
            board[i].push('[', ']')
        if (p2[i][j] === '@') {
            cx = i;
            cy = board[i].length;
            board[i].push('@', '.')
        }
    }
}

const processMove = (move) => {
    const [dx, dy] = dirs[move];
    if (board[cx + dx][cy + dy] === '#') return;
    if (move === '>' && board[cx + dx][cy + dy] === '[') {
        let cnt = 1;
        while (board[cx + cnt * dx][cy + cnt * dy] === '[' && board[cx + cnt * dx][cy + cnt * dy + dy] === ']') cnt += 2;
        if (board[cx + cnt * dx][cy + cnt * dy] === '#') return;
        board[cx + cnt * dx][cy + cnt * dy] = '['
        while (cnt >= 0) {
            if (board[cx + cnt * dx][cy + cnt * dy] === '[') board[cx + cnt * dx][cy + cnt * dy] = ']'
            else if (board[cx + cnt * dx][cy + cnt * dy] === ']') board[cx + cnt * dx][cy + cnt * dy] = '['
            cnt--;
        }
    }
    if (move === '<' && board[cx + dx][cy + dy] === ']') {
        let cnt = 1;
        while (board[cx + cnt * dx][cy + cnt * dy] === ']' && board[cx + cnt * dx][cy + cnt * dy + dy] === '[') cnt += 2;
        if (board[cx + cnt * dx][cy + cnt * dy] === '#') return;
        board[cx + cnt * dx][cy + cnt * dy] = ']'
        while (cnt >= 0) {
            if (board[cx + cnt * dx][cy + cnt * dy] === ']') board[cx + cnt * dx][cy + cnt * dy] = '['
            else if (board[cx + cnt * dx][cy + cnt * dy] === '[') board[cx + cnt * dx][cy + cnt * dy] = ']'
            cnt--;
        }
    }
    if ((move === '^' || move === 'v') && (board[cx + dx][cy + dy] === '[' || board[cx + dx][cy + dy] === ']')) {
        const boxesToVisit = []; // at level dx
        const movedBoxes = [];
        if (board[cx + dx][cy + dy] === '[') {
            boxesToVisit.push([cx + dx, cy + dy])
            movedBoxes.push([cx + dx, cy + dy])
        }
        else {
            boxesToVisit.push([cx + dx, cy + dy - 1])
            movedBoxes.push([cx + dx, cy + dy - 1])
        }

        let valid = true;
        while (boxesToVisit.length) {
            const [bx, by] = boxesToVisit.shift();
            if (board[bx + dx][by + dy] === '#' || board[bx + dx][by + dy + 1] === '#') {
                valid = false; break;
            }
            if (board[bx + dx][by + dy] === '[') {
                boxesToVisit.push([bx + dx, by + dy])
                movedBoxes.push([bx + dx, by + dy])
            }
            if (board[bx + dx][by + dy] === ']') {
                boxesToVisit.push([bx + dx, by + dy - 1])
                movedBoxes.push([bx + dx, by + dy - 1])
            }
            if (board[bx + dx][by + dy + 1] === '[') {
                boxesToVisit.push([bx + dx, by + dy + 1])
                movedBoxes.push([bx + dx, by + dy + 1])
            }
        }
        if (move === '^')
            movedBoxes.sort((a, b) => a[0] - b[0])
        else movedBoxes.sort((a, b) => b[0] - a[0])
        if (!valid) return;
        movedBoxes.forEach(([x, y]) => {
            board[x + dx][y + dy] = '['
            board[x + dx][y + dy + 1] = ']'
            board[x][y] = '.'
            board[x][y + 1] = '.'
        })
    }

    board[cx + dx][cy + dy] = '@';
    board[cx][cy] = '.'
    cx += dx
    cy += dy
}

const validDirs = ['<', '>', '^', 'v']

sequence.split('').filter((t) => validDirs.includes(t)).forEach((move) => {
    processMove(move)
})

let sum = 0;
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === '[') {
            sum += 100 * i + j;
        }
    }
}
console.log(sum)