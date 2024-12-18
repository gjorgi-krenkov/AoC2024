const fs = require('node:fs');

const data = fs.readFileSync('input.txt').toString();

const [registersRaw, sequenceRaw] = data.split('\r\n\r\n')

const registers = registersRaw.split('\r\n');
let regA = Number.parseInt(registers[0].split(': ')[1])
let regB = Number.parseInt(registers[1].split(': ')[1])
let regC = Number.parseInt(registers[2].split(': ')[1])

const sequence = sequenceRaw.split(': ')[1].split(',').map((value) => parseInt(value));

let offset = 0;
let output = "";
while (output !== sequence.join(',')) {
    output = "";
    let b = 0, c = 0;
    let x = offset;

    for (let i = sequence.length - 1; i >= 0; i--) {
        b = x % 8;
        x = x * 8;
        b = b ^ c;
        c = x * Math.pow(2 ^ b);
        b = b ^ 4;
        x += sequence[i];
    }
    regA = x, regB = 0, regC = 0;
    let ip = 0;
    for (; ip < sequence.length; ip += 2) {
        const instruction = sequence[ip];
        const operand = sequence[ip + 1];
        const comboOperands = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: regA,
            5: regB,
            6: regC,
            7: undefined
        }

        const instructionSet = {
            0: (operand) => { regA = parseInt(regA / Math.pow(2, comboOperands[operand])) },
            1: (operand) => { regB = regB ^ operand },
            2: (operand) => { regB = comboOperands[operand] % 8 },
            3: (operand) => { if (regA !== 0) ip = operand - 2 },
            4: (operand) => { regB = regB ^ regC },
            5: (operand) => { output += ((comboOperands[operand] % 8) + ',') },
            6: (operand) => { regB = parseInt(regA / Math.pow(2, comboOperands[operand])) },
            7: (operand) => { regC = parseInt(regA / Math.pow(2, comboOperands[operand])) },
        }

        instructionSet[instruction](operand);
    }

    output = output.slice(0, -1);
    console.log(output, sequence.join(','))
    offset++;
}