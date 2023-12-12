const { seeds, toSoil, toFertilizer, toWater, toLight, toTemp, toHumidity, toLocation } = require('./part2-mapping.js');

/*
... Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.
Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
*/

function findRanges(arr) {
    let ranges = [];

    for (let i = 0; i < arr.length; i++) {
        ranges.push([parseInt(arr[i][0]), (parseInt(arr[i][0]) + (parseInt(arr[i][1]) - 1))])
    }

    return ranges
}

function findLocation(val, map) {
    const srcRanges = findRanges(map[0]);
    const destRanges = findRanges(map[1]);

    for (let i = 0; i < destRanges.length; i++) {
        let min = destRanges[i][0]
        let max = destRanges[i][1]

        if (val >= min && val <= max) {
            return val + (srcRanges[i][0] - destRanges[i][0]);
        }
    }

    return val;
}

function findSeed() {
    const seedRanges = findRanges(seeds);
    let location = 0;

    while (location < Infinity) {
        let val = location;
        val = findLocation(val, toLocation);
        val = findLocation(val, toHumidity);
        val = findLocation(val, toTemp);
        val = findLocation(val, toLight);
        val = findLocation(val, toWater);
        val = findLocation(val, toFertilizer);
        val = findLocation(val, toSoil);

        for (let i = 0; i < seedRanges.length; i++) {
            let min = seedRanges[i][0]
            let max = seedRanges[i][1]
            if (val >= min && val <= max) {
                return location;
            }
        }
        location++
    }
}

console.log(findSeed())

/*
***DON'T RUN THIS*** 

This program will output the correct answer for the puzzle input, using a reverse search to start at location zero and walk backwards until a corresponding seed number is found.
This is NOT the optimal solution, but it's faster than bruteforcing it by a long shot. 

My favorite solution to this puzzle (which I'd like to eventually find time to implement on a second attempt) is ThePrimeagen's approach:
https://youtu.be/LuYOIzd5lKg?si=CHiWdxudwhgVRLKC&t=1833
In it, he treats it as a max flow problem and uses negative ranges to fill in the gaps between known wrong areas to rapidly search 
through vast ranges of seeds. By rapidly, I mean the program runs instantly. 
*/