const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

let rows = data.split("\r\n").map((r) => r.split(''));
const rowCount = rows.length;
const colCount = rows[0].length;

const isValid = (rId, cId) => 0 <= rId && rId < rowCount && 0 <= cId && cId < colCount;

let antennaIds = [];
const antennaLocations = {}
const antinodeLocations = [];

rows.forEach((row, i) => {
    row.forEach((antennaId, j) => {
        if(antennaId !== '.')
        {
            antennaIds.push(antennaId);
            if(antennaLocations[antennaId])
                antennaLocations[antennaId].push([i,j]);
            else
                antennaLocations[antennaId] = [[i,j]];
        }
    })
})
antennaIds = [... new Set(antennaIds)];
let antennasAsAntidotesCount = 0;
antennaIds.forEach((antennaId) => {
    const locations = antennaLocations[antennaId];

    for(let i = 0; i < locations.length - 1; i++)
    {
        for(let j = i + 1; j < locations.length; j++)
        {
            const antenna1 = locations[i]; // (3, 4) - (1, 3)
            const antenna2 = locations[j]; // (5, 5) - (7, 6)
                                          //  (2, 1)
            const diffX = antenna2[0] - antenna1[0];
            const diffY = antenna2[1] - antenna1[1];
            a1aX = antenna1[0] - diffX;
            a1aY = antenna1[1] - diffY;
            
            if(!antinodeLocations.some((aL) => aL[0] === antenna1[0] && aL[1] === antenna1[1]))
                antinodeLocations.push([antenna1[0], antenna1[1]])            
            if(!antinodeLocations.some((aL) => aL[0] === antenna2[0] && aL[1] === antenna2[1]))
                antinodeLocations.push([antenna2[0], antenna2[1]])


            while(isValid(a1aX, a1aY))
            {
                if(!antinodeLocations.some((aL) => aL[0] === a1aX && aL[1] === a1aY))
                    antinodeLocations.push([a1aX, a1aY])
                a1aX -= diffX;
                a1aY -= diffY;
            }

            let a2aX = antenna2[0] + diffX;
            let a2aY = antenna2[1] + diffY; 
            while(isValid(a2aX, a2aY))
            {
                if(!antinodeLocations.some((aL) => aL[0] === a2aX && aL[1] === a2aY))
                    antinodeLocations.push([a2aX, a2aY])
                a2aX += diffX;
                a2aY += diffY;
            }
        }
    }
})
antinodeLocations.forEach((location) => rows[location[0]][location[1]] = '#');
console.log(antinodeLocations.length);