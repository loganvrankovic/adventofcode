/* 
- This will work for the example, but NOT for the input! 
- You can try running it, but it will just overflow. 
- A more elegant implementation of this strategy might eventually give you an answer,
but overall it's important to do this puzzle in a smarter way-- i.e. don't store
literally every single number in each range in the array. When the range is in the 
tens of millions, it becomes evident that this strategy is practically impossible.
(it's wrong!)
- However, the logic is mostly the same as my final solution so I'm including it 
anyway as an example of what a bruteforce solution looks like. 
*/

const { seeds, toSoil, toFertilizer,
toWater, toLight, toTemp,
toHumidity, toLocation } = require('./part1-mapping.js');

const util = require('util');
util.inspect.defaultOptions.maxArrayLength = null;

function findRanges(map) {
    const src = map[0];
    let srcRanges = [];

    for (let i = 0; i < src.length; i++) {
        let range = src[i][1];
        let arr = [];
        for (let j = 0; j < range; j++) {
            arr.push([parseInt(src[i]) + j]);
        }
        srcRanges.push(arr);
        arr = [];
    }

    const dest = map[1];
    let destRanges = [];

    for (let i = 0; i < dest.length; i++) {
        let range = dest[i][1];
        let arr = [];
        for (let j = 0; j < range; j++) {
            arr.push([parseInt(dest[i]) + j]);
        }
        destRanges.push(arr);
        arr = [];
    }

    return [srcRanges, destRanges]
}

function findLocation(src, map) {
    const ranges = findRanges(map);
    const srcRanges = ranges[0].map(i => i.flat());
    const destRanges = ranges[1].map(i => i.flat());
    let location = 0;

    for (let i = 0; i < srcRanges.length; i++) {
        if (srcRanges[i].includes(src)) {
            let distance = src - parseInt(srcRanges[i][0]);
            location = parseInt(destRanges[i][0]) + distance;
            break;
        } else {
            location = src;
        }
    }

    return location;
}

function farmSearch(src) {
    const soil = findLocation(src, toSoil);
    const fertilizer = findLocation(soil, toFertilizer);
    const water = findLocation(fertilizer, toWater);
    const light = findLocation(water, toLight);
    const temperature = findLocation(light, toTemp);
    const humidity = findLocation(temperature, toHumidity);
    const location = findLocation(humidity, toLocation);

    return location;
}

function dayFive(arr) {
    const seedArr = arr.map(i => parseInt(i));
    let seedLocations = [];

    seedArr.map(i => {
        seedLocations.push(farmSearch(i));
    })

    const optimalLocation = Math.min(...seedLocations)

    return optimalLocation;
}

console.log(util.inspect(dayFive(seeds)))