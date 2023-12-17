const fs = require('fs');
const data = fs.readFileSync('example.txt', 'utf-8').split(/\r?\n/);

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
        let index = 0; // find index of the current element
        for (let j = 0; j < mapArr.length; j++) {
            if (mapArr[j][0] === currEl) {
                index = j;
            }
        }
        // change the current element according to the instructions
        for (let j = index; j < mapArr.length; j++) {
            if (inst[i] === 'L') {
                currEl = mapArr[j][1][0]
                steps++;
                break;
            } else if (inst[i] === 'R') {
                currEl = mapArr[j][1][1]
                steps++;
                break;        
            }
        }
    }
}

console.log(steps)