const fs = require('fs');
const util = require('util')
const data = fs.readFileSync('input.txt', 'utf8')
               .split('\n')
               .map(line => line.trim().split(/[:;]/))
               .map(line => line.map(i => i.replace(/(\s*Game\s*)|\s/g, '').split(",")))

function dayTwo() {
    let rgbRegex = /(red|green|blue)/;
    let maxR = 0;
    let maxG = 0;
    let maxB = 0;
    let power = 0;
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 1; j < data[i].length; j++) {
            for (let k = 0; k < data[i][j].length; k++) {
                let cubes = data[i][j][k];
                if (rgbRegex.test(data[i][j][k])) {
                    maxR = (cubes.includes("red") && parseInt(cubes) > maxR) ? parseInt(cubes) : maxR;
                    maxG = (cubes.includes("green") && parseInt(cubes) > maxG) ? parseInt(cubes) : maxG;
                    maxB = (cubes.includes("blue") && parseInt(cubes) > maxB) ? parseInt(cubes) : maxB;
                }
            }
        }
        power = maxR * maxG * maxB;
        result += power;
        power = 0;
        maxR = 0;
        maxG = 0;
        maxB = 0;
    }
    return result;
};

util.inspect.defaultOptions.maxArrayLength = null;
console.log(util.inspect(dayTwo(12, 13, 14)));