const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(line => line.trim())
  .filter(line => line !== '');

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
}

function dayOneOPartTwo() {
    const strTest = /(one|two|three|four|five|six|seven|eight|nine)/g;
    const revStrTest = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g;
    const numTest = /[0-9]/;
    let elfNumA = '';
    let elfNumB = '';
    let elfResult = '';
    let result = 0;

    for (let i = 0; i < data.length; i++) {
    console.log("------------------------------------------------------------------------------------")
        for (let j = 0; j < data[i].length; j++) {
            if (numTest.test(data[i][j]) && !elfNumA) {
                elfNumA = '';
                elfNumA += data[i][j];
                j = data[i].length;
            };
        };

        if (strTest.test(data[i])) {
            let match = data[i].match(strTest);
            let arr = data[i].split(/(\d+)/).filter(Boolean);
            let chunkArrA = arr.flatMap(i => i.split(strTest).filter(Boolean));
            let finalArrA = chunkArrA.flatMap(i => {
                if (!isNaN(i)) {
                    return i.split('').map(Number); 
                } else {
                    return [i]; 
                }
            }).filter(Boolean);
            console.log(finalArrA);

            let regexA = finalArrA.indexOf(match[0]);
            console.log("Index of regex A: " + finalArrA.indexOf(match[0]))

            let currentA = 0;
            for (let i = 0; i < finalArrA.length; i++) {
                if (finalArrA[i] == elfNumA) {
                    currentA += i;
                    i = finalArrA.length;
                }
            }
            console.log("Index of current A: " + currentA)

            if (regexA < currentA) {
                elfNumA = match[0];
            }
        };

        str = data[i].split('').reverse().join('');
        console.log("Original string: " + data[i])
        console.log("Reversed string: " + str)
        
        for (let k = 0; k < str.length; k++ ) {
            if (numTest.test(str[k]) && !elfNumB) {
                elfNumB = '';
                elfNumB += str[k];
                k = str.length;
            };
        };

        if (revStrTest.test(str)) {
            let revMatch = str.match(revStrTest);
            console.log("-------------match found! " + revMatch[0]);
            let revArr = str.split(/(\d+)/).filter(Boolean);
            //flatMap both splits the array elements and flattens the resulting
            //arrays into a single array
            let chunkArr = revArr.flatMap(i => i.split(revStrTest).filter(Boolean));
            let finalArr = chunkArr.flatMap(i => {
                if (!isNaN(i)) {
                    return i.split('').map(Number); 
                } else {
                    return [i]; 
                }
            }).filter(Boolean);
            console.log(finalArr);

            let regexB = finalArr.indexOf(revMatch[0])
            console.log("Index of regex B: " + finalArr.indexOf(revMatch[0]))
            
            let currentB = 0;
            for (let i = 0; i < finalArr.length; i++) {
                if (finalArr[i] == elfNumB) {
                    currentB += i;
                    i = finalArr.length;
                }
            }
            console.log("Index of current B: " + currentB)

            if (regexB < currentB) {
                elfNumB = revMatch[0]
            }
        };

        // console.log("PRE: A: " + elfNumA + " " + "B: " + elfNumB);

        elfNumA = elfNumA.length > 1 ? Math.abs(convert(elfNumA)) : elfNumA;
        elfNumB = elfNumB.length > 1 ? Math.abs(convert(elfNumB)) : elfNumB;

        console.log("FINAL: A: " + elfNumA + " " + "B: " + elfNumB);
        // console.log("A: " + typeof elfNumA + " " + "B: " + typeof elfNumB);

        elfNumA = elfNumA.toString();
        elfNumB = elfNumB.toString();

        elfResult = elfNumA + elfNumB;
        console.log(elfResult)

        result += parseInt(elfResult);
        elfNumA = '';
        elfNumB = '';
    };

    return result;
};

console.log(dayOneOPartTwo());