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

let calories = 0;
for (let i = 0; i < result.length; i++) {
    if (calories < result[i].reduce((acc, i) => acc + i, 0)) {
        calories = result[i].reduce((acc, i) => acc + i, 0);
    }
}

console.log("the result is: " + calories)