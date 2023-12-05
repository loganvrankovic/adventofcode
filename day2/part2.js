const fs = require('fs');
const util = require('util')

const data = fs.readFileSync('input.txt', 'utf8')
               .split('\n')
               .map(line => line.trim().split(/[:;]/))
               .map(line => line.map(i => i.replace(/(\s*Game\s*)|\s/g, '').split(",")))

function dayTwo(r, g, b) {
    let rgbRegex = /(red|green|blue)/;
    let maxR = 0;
    let maxG = 0;
    let maxB = 0;
    let power = 0;
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        console.log(`Game ID: ${data[i][0]}------------------------------------------------`)  

        for (let j = 1; j < data[i].length; j++) {
            // the Game ID = data[i][0]
            // first games = data[i][2], etc...
            console.log(util.inspect(data[i][j]))
            for (let k = 0; k < data[i][j].length; k++) {
                let cubes = data[i][j][k];
                // console.log(parseInt(cubes))
                if (rgbRegex.test(data[i][j][k])) {
                    if (cubes.includes("red") && parseInt(cubes) > maxR) {
                        maxR = parseInt(cubes);
                        // console.log("max r is: " + maxR)
                    }
                    if (cubes.includes("green") && parseInt(cubes) > maxG) {
                        maxG = parseInt(cubes);
                        // console.log("max g is: " + maxG)
                    }
                    if (cubes.includes("blue") && parseInt(cubes) > maxB) {
                        maxB = parseInt(cubes);
                        // console.log("max b is: " + maxB)
                    }
                }
            }
        }
        console.log(`r max: ${maxR} g max: ${maxG} b max: ${maxB}`)
        power = maxR * maxG * maxB;
        console.log("power is: " + power);
        result += power;
        power = 0;
        maxR = 0;
        maxG = 0;
        maxB = 0;

        console.log("result: " + result)
    }
    return result;
};

util.inspect.defaultOptions.maxArrayLength = null;
console.log(util.inspect(dayTwo(12, 13, 14)));