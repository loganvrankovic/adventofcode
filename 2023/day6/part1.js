/* 
... Determine the number of ways you could beat the record in each race. What do you get if you multiply these numbers together?
*/ 

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/)
                  .map(i => i.split(' ').filter(Boolean))
                  .map(i => i.slice(1));

const times = data[0];
const distances = data[1];

let possibilities = [];
for (let i = 0; i < times.length; i++) {
    let time = times[i];
    let distance = distances[i];

    let myBoatsDistance = 0;
    let scenarios = [];
     
    for (let j = 0; j < time; j++) {
        myBoatsDistance = j * (time - j);
        scenarios.push(myBoatsDistance);
    }

    let winningRaces = 0;
    for (let j = 0; j < scenarios.length; j++) {
        if (scenarios[j] > distance) {
            winningRaces++
        }
    }

    possibilities.push(winningRaces);
}

const answer = possibilities.reduce((acc, i) => acc * i)
console.log(answer)