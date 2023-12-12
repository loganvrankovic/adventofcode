const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

// get seeds
const seedData = data[0].slice(7).split(' ');
let seeds = [];
for (let i = 0; i < seedData.length; i += 2) {
    seeds.push([parseInt(seedData[i]), parseInt(seedData[i + 1])]);
}

// get data for maps 
const maps = data.slice(2);

// fit the sliced data into the model structure
function processValues(values) {
    const srcRanges = [];
    const destRanges = [];

    values.map(i => {
        if (i) {
           srcRanges.push([parseInt(i[1]), parseInt(i[2])]);
            destRanges.push([parseInt(i[0]), parseInt(i[2])]); 
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

// get fertilizer map
const fertilizerIndex = maps.indexOf('');
const fertilizerData = maps.slice(fertilizerIndex + 1);
const fertEndIndex = fertilizerData.indexOf('');
const fertValues = fertilizerData.slice(1, fertEndIndex).map(i => i.split(' '));

const toFertilizer = processValues(fertValues);

// get water map
const waterIndex = fertilizerData.indexOf('');
const waterData = fertilizerData.slice(waterIndex + 1);
const waterEndIndex = waterData.indexOf('');
const waterValues = waterData.slice(1, waterEndIndex).map(i => i.split(' '));

const toWater = processValues(waterValues);

// get light map
const lightIndex = waterData.indexOf('');
const lightData = waterData.slice(lightIndex + 1);
const lightEndIndex = lightData.indexOf('');
const lightValues = lightData.slice(1, lightEndIndex).map(i => i.split(' '));

const toLight = processValues(lightValues);

// get temperature map
const tempIndex = lightData.indexOf('');
const tempData = lightData.slice(tempIndex + 1);
const tempEndIndex = tempData.indexOf('');
const tempValues = tempData.slice(1, tempEndIndex).map(i => i.split(' '));

const toTemp = processValues(tempValues);

// get humidity map 
const humIndex = tempData.indexOf('');
const humData = tempData.slice(humIndex + 1);
const humEndIndex = humData.indexOf('');
const humValues = humData.slice(1, humEndIndex).map(i => i.split(' '));

const toHumidity = processValues(humValues);

// get location map 
const locIndex = humData.indexOf('');
const locData = humData.slice(locIndex + 1);
const locValues = locData.slice(1).map(i => i.split(' ').filter(Boolean));

const toLocation = processValues(locValues);

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