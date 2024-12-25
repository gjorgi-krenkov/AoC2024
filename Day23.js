const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const entites = data.split('\r\n');

const relations = {

};

entites.forEach((e) => {
    const [u, v] = e.split('-');
    if (!relations[u]) relations[u] = [];
    if (!relations[v]) relations[v] = [];
    relations[u].push(v);
    relations[v].push(u);
});

let lazyWay = [];
Object.entries(relations).forEach(([key, connections]) => {
    if (!key.startsWith('t')) return;
    const combs = [];
    connections.forEach((c) => {
        combs.push(
            ...relations[c]
                .filter((r) => r !== key && relations[r].includes(key))
                .map((cc) => [key, c, cc].sort().join(','))
        );
    });
    lazyWay = [... new Set([...lazyWay, ...combs])];
})
console.log(lazyWay)
console.log(lazyWay.length)