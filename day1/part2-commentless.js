const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line !== '');

function convert(word) {
    const digits = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "eno": "1",
        "owt": "2",
        "eerht": "3",
        "ruof": "4",
        "evif": "5",
        "xis": "6",
        "neves": "7",
        "thgie": "8",
        "enin": "9",
    };
    return digits[word.toLowerCase()];
};

function dayOne() {
    const strTest = /(one|two|three|four|five|six|seven|eight|nine)/g;
    const revStrTest = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g;
    const numTest = /[0-9]/;
    let a = '';
    let b = '';
    let stringResult = '';
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (numTest.test(data[i][j]) && !a) {
                a = '';
                a += data[i][j];
                break;
            };
        };

        if (strTest.test(data[i])) {
            let match = data[i].match(strTest);
            let arr = data[i].split(/(\d+)/).flatMap(i => i.split(strTest).flatMap(i => {
                if (!isNaN(i)) {
                    return i.split('').map(Number); 
                } else {
                    return [i]; 
                }
            }).filter(Boolean));
            

            let aRegex = arr.indexOf(match[0]);
            let aCurrent = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == a) {
                    aCurrent += i;
                    break;
                }
            }

            if (aRegex < aCurrent) { a = match[0]; };
        };

        str = data[i].split('').reverse().join('');
        for (let k = 0; k < str.length; k++ ) {
            if (numTest.test(str[k]) && !b) {
                b = '';
                b += str[k];
                break;
            };
        };

        if (revStrTest.test(str)) {
            let revMatch = str.match(revStrTest);
            let revArr = str.split(/(\d+)/).flatMap(i => i.split(revStrTest).flatMap(i => {
                return !isNaN(i) ? i.split('').map(Number) : [i];
            }).filter(Boolean));

            let bRegex = revArr.indexOf(revMatch[0])
            let bCurrent = 0;
            for (let i = 0; i < revArr.length; i++) {
                if (revArr[i] == b) {
                    bCurrent += i;
                    break;
                };
            };

            if (bRegex < bCurrent) { b = revMatch[0] };
        };

        a = a.length > 1 ? convert(a) : a;
        b = b.length > 1 ? convert(b) : b;
        stringResult = a + b;
        result += parseInt(stringResult);
        a = '';
        b = '';
    };
    return result;
};

console.log(dayOne());