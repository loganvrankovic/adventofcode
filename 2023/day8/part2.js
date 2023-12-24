/* 
... The sandstorm is upon you and you aren't any closer to escaping the wasteland. 
You had the camel follow the instructions, but you've barely left your starting position. 
It's going to take significantly more steps to escape! ...
*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

// instructions array
const inst = data.slice(0, 1).join('').split('');

// array of the maps 
const map = data.slice(2)
                   .map(item => item.split("="))
                   .map(item => item.map(i => i.trim()))
                   .map(item => item.map(i => i.replace(/[)(]/g, '')))
                   .map(item => [item[0], item[1].split(', ')]);

// array of starting nodes with their indices 
let nodes = [];

const startNodes = map.map(item => {
    if (item[0][2] === 'A') {
        return item[0];
    }
}).filter(Boolean);

for (let i = 0; i < startNodes.length; i++) {
    for (let j = 0; j < map.length; j++) {
        if (map[j][0] === startNodes[i]) {
            nodes.push([startNodes[i], j]); // find the nodes' indices
        }
    }
}

// ---------------------------------------------------------------------------
let lcmNumbers = [];

function findLCMNumbers() {
    let exit = false;
    let c = 0;
    while (!exit) {
        for (let i = 0; i < inst.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (inst[i] === 'L') {
                    nodes[j][0] = map[nodes[j][1]][1][0];
                    for (let k = 0; k < nodes.length; k++) {
                        for (let l = 0; l < map.length; l++) {
                            if (map[l][0] === nodes[j][0]) {
                                nodes[j][1] = l;
                            }
                        }
                    }
                } else if (inst[i] === 'R') {
                    nodes[j][0] = map[nodes[j][1]][1][1];
                    for (let k = 0; k < nodes.length; k++) {
                        for (let l = 0; l < map.length; l++) {
                            if (map[l][0] === nodes[j][0]) {
                                nodes[j][1] = l;
                            }
                        }
                    }
                }
            }

            c++

            for (let j = 0; j < nodes.length; j++) {
                if (nodes[j][0][2] === 'Z') {
                    lcmNumbers.push(c);
                    if (lcmNumbers.length === nodes.length) {
                        exit = true;
                    }
                }
            }
        }
    }
    return lcmNumbers;
}
console.log("the LCM numbers are: " + findLCMNumbers()) // You can toss these numbers into an LCM solver to get the solution