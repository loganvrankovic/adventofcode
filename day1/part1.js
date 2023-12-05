const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n');

function dayOne() {
    const numTest = /[0-9]/;
    let elfNum = '';
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (numTest.test(data[i][j])) {
                elfNum += data[i][j];
                j = data[i].length;
            };
        };

        str = data[i].split('').reverse().join('');
        for (let k = 0; k < str.length; k++) {
            if (numTest.test(str[k])) {
                elfNum += str[k];
                k = str.length;
            };
        };
        
        // console.log(elfNum)
        result += Math.abs(elfNum)
        elfNum = ''
    };
    
    return result;
};

console.log(dayOne())