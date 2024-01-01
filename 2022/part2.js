const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').split(/\n/g);

let result = [];
let subArray = [];
for (let i = 0; i < data.length; i++) {
    if (data[i] !== '') {
        subArray.push(Math.abs(data[i]));
    } else if (subArray.length > 0) {
        result.push(subArray);
        subArray = [];
    }
}

let calories = [];
for (let i = 0; i < result.length; i++) {
    calories.push(result[i].reduce((acc, i) => acc + i, 0));
}

const sortCalories = calories.sort((a, b) => b - a)

console.log("the result is: " + (sortCalories[0] + sortCalories[1] + sortCalories[2]))