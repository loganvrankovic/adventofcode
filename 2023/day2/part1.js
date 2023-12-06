const fs = require('fs');
const util = require('util')

const data = fs.readFileSync('input.txt', 'utf8')
               .split('\n')
               .map(line => line.trim().split(/[:;]/))
               .map(line => line.map(i => i.replace(/(\s*Game\s*)|\s/g, '').split(",")))

function dayTwo(r, g, b) {
    let rgbRegex = /(red|green|blue)/;
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        console.log(`------------------------------------------------
        Game ID: ${data[i][0]}`)  
        let match = true;

        for (let j = 1; j < data[i].length; j++) {
            // the Game ID = data[i][0]
            // first games = data[i][2], etc...
            console.log(util.inspect(data[i][j]))
            for (let k = 0; k < data[i][j].length; k++) {
                console.log(parseInt(data[i][j][k]))
                if (rgbRegex.test(data[i][j][k])) {
                    if (data[i][j][k].includes("red") && parseInt(data[i][j][k]) > r) {
                        console.log("r is impossible")
                        match = false;
                    }
                    if (data[i][j][k].includes("green") && parseInt(data[i][j][k]) > g) {
                        console.log("g is impossible")
                        match = false;
                    }
                    if (data[i][j][k].includes("blue") && parseInt(data[i][j][k]) > b) {
                        console.log("b is impossible")
                        match = false;
                    }
                }
            }
        }
        if (match) {
            result += Math.abs(data[i][0]);
        };
        console.log("result: " + result)
    }
    return result;
};

util.inspect.defaultOptions.maxArrayLength = null;
console.log(util.inspect(dayTwo(12, 13, 14)));