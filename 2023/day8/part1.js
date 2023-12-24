/* 
... It seems like you're meant to use the left/right instructions to navigate the network. 
Perhaps if you have the camel follow the same instructions, you can escape the haunted wasteland! ...
*/

const fs = require('fs');
const data = fs.readFileSync('example2.txt', 'utf-8').split(/\r?\n/);

const inst = data.slice(0, 1).join('').split('');
const mapArr = data.slice(2)
                .map(item => item.split("="))
                .map(item => item.map(i => i.trim()))
                .map(item => item.map(i => i.replace(/[)(]/g, '')))
                .map(item => [item[0], item[1].split(', ')]);

let steps = 0;
let currentElement = 'AAA';

while (currentElement !== 'ZZZ') {
    for (let i = 0; i < inst.length; i++) {
        let index = 0;
        for (let j = 0; j < mapArr.length; j++) {
            if (mapArr[j][0] === currentElement) {
                index = j;
            }
        }

        if (inst[i] === 'L') {
            currentElement = mapArr[index][1][0]
            steps++;
        } else if (inst[i] === 'R') {
            currentElement = mapArr[index][1][1]
            steps++;     
        }
    }
}

console.log("Steps from AAA to ZZZ: " + steps)