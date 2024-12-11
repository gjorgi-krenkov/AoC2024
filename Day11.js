const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();


const values = data.split(" ").map((r) => Number.parseInt(r));
let stones = values;

for (let i = 0; i < 75; i++) {
    const tempRes = [];
    stones.forEach((stone) => {
        if (Number.parseInt(stone) === 0) {
            tempRes.push("1");
            return;
        }
        const st = stone.toString();
        if (st.length % 2 === 0) {
            const [l, r] = [st.substring(0, st.length / 2), st.substring(st.length  / 2)];
            tempRes.push(Number.parseInt(l).toString(), Number.parseInt(r).toString())
            return;
        }
        tempRes.push((Number.parseInt(stone) * 2024).toString())
    })
    stones = tempRes;
}

console.log(stones.length);