const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const numbers = data.split('\r\n').map((c) => parseInt(c));

const MOD = 16777216;

const step1 = (secret) => {
    const res = (secret * 64 )% MOD;
    const mix = res ^ secret;
    const prune = mix % MOD;
    return prune;
}

const step2 = (secret) => {
    const res = Math.floor(secret / 32);
    const mix = res ^ secret;
    const prune = mix % MOD;
    return prune;
}

const step3 = (secret) => {
    const res = (secret * 2048)%MOD;
    const mix = res ^ secret;
    const prune = mix % MOD;
    return prune;
}

let res = 0;

const sequBan = {}; // sequence - bananas hmp;
for (let i = 0; i < numbers.length; i++) {
    let secret = numbers[i];
    let seq = '';
    const visitedSequBan = {};
    for (let j = 0; j < 2000; j++) {
        const prevPrice = secret % 10;
        secret = step3(step2(step1(secret)));
        const newPrice = secret % 10;
        diff = newPrice - prevPrice;
        seq += diff.toString();

        if(j > 2) {
            if(!visitedSequBan[seq]) {
                if(!sequBan[seq]) {
                    sequBan[seq] = newPrice;
                } else sequBan[seq] += newPrice;
                visitedSequBan[seq] = true;
            }
            if(seq[0] === '-')
                seq = seq.slice(1);
            seq = seq.slice(1);
        }
    }
    res += secret;
}
let res2 = 0;

Object.values(sequBan).forEach((val) => {
    res2 = Math.max(res2, val);
});

console.log(res2);
console.log(res);
