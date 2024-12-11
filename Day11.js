const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();


const values = data.split(" ").map((r) => Number.parseInt(r));
let stones = values;
let rsx = {}

stones.forEach((s) => rsx[s] = 1)

for (let i = 0; i < 75; i++) {
    const trsx = {}
    stones.forEach((stone) => {
        if (stone === 0) {
            if (trsx[1]) {
                trsx[1] = rsx[0];
            } else trsx[1] = rsx[0];
            return;
        }
        const st = stone.toString();
        if (st.length % 2 === 0) {
            const [l, r] = [st.substring(0, st.length / 2), st.substring(st.length / 2)];
            const lNum = Number.parseInt(l);
            const rNum = Number.parseInt(r);
            if (trsx[lNum]) {
                trsx[lNum] += rsx[stone];
            } else trsx[lNum] = rsx[stone];

            if (trsx[rNum]) {
                trsx[rNum] += rsx[stone];
            } else trsx[rNum] = rsx[stone];
            return;
        }
        if (trsx[stone * 2024])
            trsx[stone * 2024] += rsx[stone];
        else trsx[stone * 2024] = rsx[stone]
    })
    stones = Object.keys(trsx).map((c) => Number.parseInt(c));
    rsx = { ...trsx };
}
console.log(Object.values(rsx).reduce((v, c) => v + c, 0));