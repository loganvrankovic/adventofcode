/* 
... As far as the Elf has been able to figure out, you have to figure out which of the numbers you have 
appear in the list of winning numbers. The first match makes the card worth one point and 
each match after the first doubles the point value of that card ...
*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

function dayFour() {
    let points = 0;
    let total = 0; 

    for (let i = 0; i < data.length; i++) {
        let winners = data[i].slice(10, 39).split(' ').filter(Boolean)
        let ours = data[i].slice(42, data[i].length).split(' ').filter(Boolean);
        // console.log("this card's winners: " + winners);
        // console.log("our card's numbers: " + ours);

        for (let j = 0; j < winners.length; j++) {
            if (ours.includes(winners[j]) && points < 1) {
                points = 1;
            } else if (ours.includes(winners[j]) && points > 0) {
                points *= 2;
            }
        }
        total += points;
        points = 0;
    }

    return total;
}

console.log(dayFour());