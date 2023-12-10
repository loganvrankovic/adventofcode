const util = require('util');
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

/*
const model = [
    [[98, 2], [50, 48]], // source ranges
    [[50, 2], [52, 48]]  // destination ranges
]
*/

// get seeds
const seeds = data[0].slice(7).split(' ');
console.log("-----------------seeds------------------------------");
console.log(util.inspect(seeds));
console.log("----------------------------------------------------");

const maps = data.slice(2);

// fit the sliced data into the model structure
function processValues(values) {
    const srcRanges = [];
    const destRanges = [];

    values.map(i => {
        if (i) {
           srcRanges.push([i[1], i[2]]);
            destRanges.push([i[0], i[2]]); 
        }
    })

    return [srcRanges, destRanges];
}

// get soil map 
const soilIndex = data.slice(2).indexOf('');
const soilValues = data.slice(2)
				   .slice(0, soilIndex)
				   .slice(1).map(i => i.split(' '));

const toSoil = processValues(soilValues);

console.log("-----------------toSoil----------------------------");
// console.log(util.inspect(soilValues));
console.log(util.inspect(toSoil));
console.log("---------------------------------------------------");

// get fertilizer map
const fertilizerIndex = maps.indexOf('');
const fertilizerData = maps.slice(fertilizerIndex + 1);
const fertEndIndex = fertilizerData.indexOf('');
const fertValues = fertilizerData.slice(1, fertEndIndex).map(i => i.split(' '));

const toFertilizer = processValues(fertValues);

console.log("-----------------toFertilizer----------------------");
// console.log(util.inspect(fertValues));
console.log(util.inspect(toFertilizer));
console.log("---------------------------------------------------");

// get water map
const waterIndex = fertilizerData.indexOf('');
const waterData = fertilizerData.slice(waterIndex + 1);
const waterEndIndex = waterData.indexOf('');
const waterValues = waterData.slice(1, waterEndIndex).map(i => i.split(' '));

const toWater = processValues(waterValues);

console.log("-----------------toWater---------------------------");
// console.log(util.inspect(waterValues));
console.log(util.inspect(toWater));
console.log("---------------------------------------------------");

// get light map
const lightIndex = waterData.indexOf('');
const lightData = waterData.slice(lightIndex + 1);
const lightEndIndex = lightData.indexOf('');
const lightValues = lightData.slice(1, lightEndIndex).map(i => i.split(' '));

const toLight = processValues(lightValues);

console.log("-----------------toLight---------------------------");
// console.log(util.inspect(lightValues));
console.log(util.inspect(toLight));
console.log("---------------------------------------------------");

// get temperature map
const tempIndex = lightData.indexOf('');
const tempData = lightData.slice(tempIndex + 1);
const tempEndIndex = tempData.indexOf('');
const tempValues = tempData.slice(1, tempEndIndex).map(i => i.split(' '));

const toTemp = processValues(tempValues);

console.log("-----------------toTemp----------------------------");
// console.log(util.inspect(tempValues));
console.log(util.inspect(toTemp));
console.log("---------------------------------------------------");

// get humidity map 
const humIndex = tempData.indexOf('');
const humData = tempData.slice(humIndex + 1);
const humEndIndex = humData.indexOf('');
const humValues = humData.slice(1, humEndIndex).map(i => i.split(' '));

const toHumidity = processValues(humValues);

console.log("-----------------toHumidity------------------------");
// console.log(util.inspect(humValues));
console.log(util.inspect(toHumidity));
console.log("---------------------------------------------------");

// get location map 
const locIndex = humData.indexOf('');
const locData = humData.slice(locIndex + 1);
const locValues = locData.slice(1).map(i => i.split(' ').filter(Boolean));

const toLocation = processValues(locValues);

console.log("-----------------toLocation------------------------");
// console.log(util.inspect(locValues));
console.log(util.inspect(toLocation));
console.log("---------------------------------------------------");

module.exports = {
    seeds,
	toSoil, 
	toFertilizer,
	toWater, 
	toLight, 
	toTemp,
	toHumidity, 
	toLocation
}

// console.log(util.inspect(seeds));