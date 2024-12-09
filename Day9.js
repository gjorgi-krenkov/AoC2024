const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();
const input = data.split('').map((c) => parseInt(c));
const memoryBlocks = [];

let occuId = 0;
input.forEach((value, index) => {
    if(index % 2 === 0)
    {
        memoryBlocks.push({
            capacity: value,
            used: value,
            partition: [[occuId, value]], // id - count
        })
        occuId++;
    } else {
        memoryBlocks[occuId-1].capacity += value;
    }
})
console.log(memoryBlocks.flatMap((mb) => mb.partition));
console.log(memoryBlocks);
let blockToFill = 0;

while(blockToFill < memoryBlocks.length){
    const fillBlock = memoryBlocks[blockToFill];
    let removeBlock = memoryBlocks.pop();
    let freeSpace = fillBlock.capacity - fillBlock.used;
    while(freeSpace > 0 && removeBlock.used) {
        const partition = removeBlock.partition.pop();
        const movedPartition = [partition[0], Math.min(partition[1], freeSpace)] // partitionId, value
                
        freeSpace -= movedPartition[1];
        fillBlock.used += movedPartition[1];
        removeBlock.used -= movedPartition[1];
        partition[1] -= movedPartition[1];
        
       
        fillBlock.partition.push(movedPartition);
        if(partition[1] > 0)
            removeBlock.partition.push(partition); // potential duplicate
    }
    if(!freeSpace) blockToFill++;
    if(removeBlock.used)
        memoryBlocks.push(removeBlock);
}

let sum = 0;
let accounted = 0;
const parts = memoryBlocks.flatMap((block) => block.partition);

parts.forEach((part) => {
    const id = part[0];
    const numEl = part[1];
    sum += ((numEl * (numEl + 1) / 2) + accounted*numEl - numEl)*id; // - numEl because sum is from 0
    accounted += numEl;
})

console.log(sum)