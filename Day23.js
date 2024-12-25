const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const entites = data.split('\r\n');

const relations = {

};

entites.forEach((e) => {
    const [u, v] = e.split('-');
    if (!relations[u]) relations[u] = [u];
    if (!relations[v]) relations[v] = [v];
    relations[u].push(v);
    relations[v].push(u);
    relations[u].sort();
    relations[v].sort();
});

const findCommon = (a, b) => {
    let res = []
    a.forEach((st) => { if (b.includes(st)) res.push(st) });
    return res;
}

let best = '';
Object.keys(relations).forEach((k) => {
    const relA = relations[k];
    Object.keys(relations).forEach((l) => {
        if (k === l) return;
        const relB = relations[l];
        const common = findCommon(relA, relB);
        let truCommon = [...common];
        common.forEach((val) => {
            if (val === k || val === l) return;
            truCommon = findCommon(truCommon, relations[val]);
        })
        const loc = truCommon.sort().join(',');
        if (loc.length > best.length) best = loc;
    });
});

console.log(best);