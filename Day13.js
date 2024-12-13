const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();


const values = data.split("\r\n");

let A1, B1;
let A2, B2;
let total = 0;

values.forEach((value, index) => {
    if (index % 4 === 0) {
        const [useless, A, B] = value.split('+');
        A1 = Number.parseInt(A);
        B1 = Number.parseInt(B);
    }
    if (index % 4 === 1) {
        const [useless, A, B] = value.split('+');
        A2 = Number.parseInt(A);
        B2 = Number.parseInt(B);
    }
    if (index % 4 === 2) {
        const [useless, A, B] = value.split('=');
        let Px = Number.parseInt(A) + 10000000000000;
        let Py = Number.parseInt(B) + 10000000000000;
        const EQ1 = [A1, A2, Px]
        const EQ2 = [B1, B2, Py].map((value) => value * (A1 / B1));
        const EQ3 = EQ1.map((value, index) => value - EQ2[index])
        const R2 = Math.round(EQ3[2] / EQ3[1])
        const R1 = Math.round((Px - A2 * R2) / A1)

        
        if (A1*R1 + A2*R2 === Px && B1*R1 + B2*R2 === Py && R1 > 0 && R2 > 0){
            total += 3 * R1 + R2;
        }
    }
})
console.log(total);
