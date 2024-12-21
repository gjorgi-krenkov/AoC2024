const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const lines = data.split('\r\n')


const numericLoc = {
    'A': [3, 2],
    0: [3, 1],
    7: [0, 0],
    8: [0, 1],
    9: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    1: [2, 0],
    2: [2, 1],
    3: [2, 2]
}

const roboticLoc = {
    'A': [0, 2],
    '^': [0, 1],
    '<': [1, 0],
    'v': [1, 1],
    '>': [1, 2],
}

const positions = ['A', 'A', 'A'];

const getNextState = (currentState, action) => {
    if (currentState === 'A') {
        if (action === '<') return '^';
        if (action === 'v') return '>';
        return undefined;
    }
    if (currentState === '^') {
        if (action === '>') return 'A';
        if (action === 'v') return 'v'
        return undefined;
    }
    if (currentState === '>') {
        if (action === '^') return 'A';
        if (action === '<') return 'v';
        return undefined;
    }
    if (currentState === 'v') {
        if (action === '^') return '^';
        if (action === '<') return '<';
        if (action === '>') return '>';
        return undefined;
    }
    if (currentState === '<') {
        if (action === '>') return 'v';
        return undefined;
    }
}

const getNextStateNumeric = (currentState, action) => {
   
}

const findCost = (neededState, robotIndex = 0, cost = 0) => {
    let currentState = positions[robotIndex];
    if (neededState === currentState) { // if the robot is in the needed state just click it
        return cost;
    }
    if (robotIndex === positions.length - 1) {
        positions[robotIndex] = neededState;
        return cost + Math.abs(roboticLoc[currentState][0] - roboticLoc[neededState][0]) + Math.abs(roboticLoc[currentState][1] - roboticLoc[neededState][1]);
    }
    while (currentState !== neededState) { // Am I what I need to be?
        const [cx, cy] = roboticLoc[currentState];
        const [nx, ny] = roboticLoc[neededState];
        const [dx, dy] = [nx - cx, ny - cy];

        if (dx < 0 && currentState !== '<') { // left and not top
            cost += findCost('^', robotIndex + 1, cost);
            currentState = getNextState(currentState, '^');
        }
        else if (dy < 0 && currentState !== '^') { // up and not left
            cost += findCost('<', robotIndex + 1, cost);
            currentState = getNextState(currentState, '<');
        } else if (dx) {
            cost += findCost('v', robotIndex + 1, cost);
            currentState = getNextState(currentState, 'v');
        } else if (dy) {
            cost += findCost('>', robotIndex + 1, cost);
            currentState = getNextState(currentState, '>');
        }
    }
    positions[robotIndex] = neededState;
    return cost;
}

const currentNumeric = 'A';

lines.forEach((line) => {
    const lineArr = line.split('');
    lineArr.forEach((char) => {
        const [travelX, travelY] = [numericLoc[char][0] - numRob[currentNumeric][0], numericLoc[char][1] - numericLoc[currentNumeric][1]];
        let cost = 0;
        while (travelX || travelY) {
            // todo: figure out if it's better to do it similarly as for the robotic (probably guarantees optimal solution)
        }

        numRob = numericLoc[char];
    });
});
