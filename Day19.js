const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const [piecesRaw, resultsRaw] = data.split('\r\n\r\n')

const pieces = piecesRaw.split(', ');
const results = resultsRaw.split('\r\n');

let score = 0;

const pieceSet = {}
pieces.forEach((piece) => {
    pieceSet[piece] = true; // can use that piece
});

results.forEach((result) => {
    const subItems = [result];
    let itemToScan = result;
    const visited = {}; // from how many places this result can be reached
    visited[result] = 1;
    while (subItems.length) { 
        itemToScan = subItems.shift();
        pieces.forEach((piece) => {
            if (itemToScan.startsWith(piece)) {
                const newItem = itemToScan.slice(piece.length);
                if (visited[newItem]) {
                    visited[newItem] += visited[itemToScan];
                } else {
                    subItems.push(newItem);
                    visited[newItem] = visited[itemToScan];
                }
            }
        })
        subItems.sort((a, b) => b.length - a.length);
    }
    score += visited[''] || 0;
});

console.log(score);