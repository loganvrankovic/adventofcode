const { seeds, toSoil, toFertilizer, toWater, toLight, toTemp, toHumidity, toLocation } = require('./part1-mapping.js');

/* 
... The gardener and his team want to get started as soon as possible, so they'd like to know the closest location that needs a seed. 
Using these maps, find the lowest location number that corresponds to any of the initial seeds. To do this, you'll need to convert each 
seed number through other categories until you can find its corresponding location number ...
*/

function findLocation(src, map) {
    const srcRanges = map[0].map(i => i.map(i => parseInt(i)));
    const destRanges = map[1].map(i => i.map(i => parseInt(i)));
    let location = 0;

    for (let i = 0; i < srcRanges.length; i++) {
        // use a range here instead of storing the entire range in memory 
        if (src >= srcRanges[i][0] && src <= (srcRanges[i][0] + (srcRanges[i][1] - 1))) {
            let distance = src - srcRanges[i][0];
            location = destRanges[i][0] + distance;
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

    const optimalLocation = Math.min(...seedLocations);

    return optimalLocation;
}

console.log(dayFive(seeds)); 