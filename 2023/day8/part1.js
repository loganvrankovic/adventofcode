const fs = require('fs');
const data = fs.readFileSync('example2.txt', 'utf-8').split(/\r?\n/);

const inst = data.slice(0, 1).join('').split('');
const mapArr = data.slice(2)
                .map(item => item.split("="))
                .map(item => item.map(i => i.trim()))
                .map(item => item.map(i => i.replace(/[)(]/g, '')))
                .map(item => [item[0], item[1].split(', ')]);

let steps = 0;
let currEl = 'AAA';

while (currEl !== 'ZZZ') {
    for (let i = 0; i < inst.length + 1; i++) {
        let index = 0;
        for (let j = 0; j < mapArr.length; j++) {
            if (mapArr[j][0] === currEl) {
                index = j;
            }
        }

        if (inst[i] === 'L') {
            currEl = mapArr[index][1][0]
            steps++;
        } else if (inst[i] === 'R') {
            currEl = mapArr[index][1][1]
            steps++;     
        }
    }
}

console.log("Steps from AAA to ZZZ: " + steps)