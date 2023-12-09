const { seeds, toSoil, toFertilizer, toWater, toLight, toTemp, toHumidity, toLocation } = require('./part1-mapping.js');

const util = require('util');
util.inspect.defaultOptions.maxArrayLength = null;

function findRanges(map) {
    const src = map[0];
    let srcRanges = [];

    for (let i = 0; i < src.length; i++) {
        let range = BigInt(src[i][1]);
        let arr = [];
        for (let j = 0n; j < range; j++) {
            arr.push([BigInt(src[i][0]) + j]);
        }
        srcRanges.push(arr);
        arr = [];
    }

    const dest = map[1];
    let destRanges = [];

    for (let i = 0; i < dest.length; i++) {
        let range = BigInt(dest[i][1]);
        let arr = [];
        for (let j = 0n; j < range; j++) {
            arr.push([BigInt(dest[i][0]) + j]);
        }
        destRanges.push(arr);
        arr = [];
    }

    return [srcRanges, destRanges];
}

function findLocation(src, map) {
    const ranges = findRanges(map);
    const srcRanges = ranges[0].map(i => i.flat());
    const destRanges = ranges[1].map(i => i.flat());
    let location = 0n;

    for (let i = 0; i < srcRanges.length; i++) {
        if (srcRanges[i].includes(src)) {
            let distance = src - BigInt(srcRanges[i][0]);
            location = BigInt(destRanges[i][0]) + distance;
            break;
        } else {
            location = src;
        }
    }

    return location;
}

function farmSearch(src) {
    const soil = findLocation(BigInt(src), toSoil);
    const fertilizer = findLocation(soil, toFertilizer);
    const water = findLocation(fertilizer, toWater);
    const light = findLocation(water, toLight);
    const temperature = findLocation(light, toTemp);
    const humidity = findLocation(temperature, toHumidity);
    const location = findLocation(humidity, toLocation);

    return location;
}

function dayFive(arr) {
    const seedArr = arr.map(i => BigInt(i));
    let seedLocations = [];

    seedArr.map(i => {
        seedLocations.push(farmSearch(i));
        console.log(`${i} function finished!`)
    });

    let optimalLocation = seedLocations[0];
    for (let i = 1; i < seedLocations.length; i++) {
        if (seedLocations[i] < optimalLocation) {
            optimalLocation = seedLocations[i];
        }
    }

    return optimalLocation;
}

console.log(util.inspect(dayFive(seeds).toString())); 
