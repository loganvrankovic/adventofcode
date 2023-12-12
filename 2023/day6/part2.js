/* 
... As the race is about to start, you realize the piece of paper with race times and record distances 
you got earlier actually just has very bad kerning. 
There's really only one race - ignore the spaces between the numbers on each line. ...
*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/)
                  .map(i => i.split(' ').filter(Boolean))
                  .map(i => i.slice(1))
                  .map(i => i.join(''));

function daySix() {
    const time = parseInt(data[0]);
    const distance = parseInt(data[1]);

    let myBoatsDistance = 0;
    let scenarios = [];
    for (let i = 0; i < time; i++) {
        myBoatsDistance = i * (time - i);
        scenarios.push(myBoatsDistance);
    }

    let winningRaces = 0;
    for (let i = 0; i < scenarios.length; i++) {
        if (scenarios[i] > distance) {
            winningRaces++
        }
    }

    return winningRaces;
}

console.log(daySix())

/*
I'm not sure if this is using the full quadratic formula the smart people on Reddit were using,
but there are parts of it used to work out boat distances and things like that. 
Even if it isn't, this runs pretty fast. 

The idea is to just find out how many possible winning races there are, and return that right away. 
*/