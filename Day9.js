const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();
const input = data.split('').map((c) => parseInt(c));
const memoryBlocks = [];

let occuId = 0;
input.forEach((value, index) => {
    if (index % 2 === 0) {
        memoryBlocks.push({
            partition: [[occuId, value]], // id - count
        })
        occuId++;
    } else if (value !== 0) {
        memoryBlocks[occuId - 1].partition.push([-1, value]) // free space places
    }
})

const partitions = memoryBlocks.flatMap((mb) => mb.partition);
let partitionToMove = occuId;
while (partitionToMove--) {
    const targetPartitionIndex = partitions.findIndex((p) => p[0] === partitionToMove);
    const targetPartition = partitions[targetPartitionIndex];

    const freePartitionIdx = partitions.findIndex((p, index) => p[0] === -1 && p[1] >= targetPartition[1] && index < targetPartitionIndex);
    if (freePartitionIdx === -1) {
        continue;
    }

    const freePartition = partitions[freePartitionIdx];
    const freeLeft = freePartition[1] - targetPartition[1];

    partitions.splice(targetPartitionIndex, 1, [-1, targetPartition[1]]);
    partitions.splice(freePartitionIdx, 1, targetPartition);
    if (freeLeft > 0) {
        partitions.splice(freePartitionIdx + 1, 0, [-1, freeLeft])
    }
}


let sum = 0;
let accounted = 0;
// const parts = memoryBlocks.flatMap((block) => block.partition);

partitions.forEach((part) => {
    const id = part[0];
    const numEl = part[1];
    if (id !== -1)
        sum += ((numEl * (numEl + 1) / 2) + accounted * numEl - numEl) * id; // - numEl because sum is from 0
    accounted += numEl;
})

console.log(sum)