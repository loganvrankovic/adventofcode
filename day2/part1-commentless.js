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
        let match = true;

        for (let j = 1; j < data[i].length; j++) {
            for (let k = 0; k < data[i][j].length; k++) {
                let cubes = data[i][j][k];
                if (rgbRegex.test(cubes)) {
                    match = (cubes.includes("red") && parseInt(cubes) > r) ? false :
                        (cubes.includes("green") && parseInt(cubes) > g) ? false :
                        (cubes.includes("blue") && parseInt(cubes) > b) ? false :
                    match;
                }
            }
        }
        result += (match ? Math.abs(data[i][0]) : 0);
    }
    return result;
};

util.inspect.defaultOptions.maxArrayLength = null;
console.log(util.inspect(dayTwo(12, 13, 14)));