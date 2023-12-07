// "The missing part wasn't the only issue - one of the gears in the engine is wrong. 
// A gear is any * symbol that is adjacent to exactly two part numbers. 
// Its gear ratio is the result of multiplying those two numbers together.
// This time, you need to find the gear ratio of every gear and add them all up so that the engineer 
// can figure out which gear needs to be replaced".

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => i.trim().split(''));

function partNumbers() {
const symbolRegex = /[-$*+=&#@%\/]/g;
let partNumbers = [];
let flag = false;
let gearFlag = false;
let numStr = '';

    // iterate over all characters ...
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (!isNaN(data[y][x])) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        let nx = x + dx;
                        let ny = y + dy;

                        // ... if it's a number and touches a symbol...
                        if (
                            nx >= 0 && nx < data[y].length &&
                            ny >= 0 && ny < data.length &&
                            data[ny][nx] && data[ny][nx].match(symbolRegex)
                        ) {
                            // ... set a flag to true ...
                            flag = true;
                        }
                        // ... and if it touches a "gear" ...
                        if (
                            nx >= 0 && nx < data[y].length &&
                            ny >= 0 && ny < data.length &&
                            data[ny][nx] && data[ny][nx] == "*"
                        ) {
                            // ... set another flag to true.
                            gearFlag = true;
                            break;
                        }
                    }
                    if (flag) break;
                }
                // build up the string to get the full number. 
                numStr += data[y][x];
            // when you hit a period or symbol, decide what to do with the number.
            } else if (data[y][x] === "." || data[y][x].match(symbolRegex)) {
                // creates an array of all "parts" adjacent to a "gear" if both flags are true.
                flag && gearFlag ? partNumbers.push(parseInt(numStr)) : null;
                numStr = '';
                flag = false;
                gearFlag = false;
            }
        }
    }
    return partNumbers;
}

function gearRatio(arr) {
    let gearCalc = [];
    let total = 0;

    // iterate over all characters ...
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            // ... if it's a "gear" ...
            if (data[y][x] == "*") {
                // ... get the gear's index, and make a snapshot of its surroundings.
                // also, create an array of possible gear numbers using findNum
                let gearIndex = x;
                let prevLine = data[y - 1].slice((gearIndex - 3), (gearIndex + 4)).join('')
                gearCalc.push(findNum(arr, prevLine));
		        let currLine = data[y].slice((gearIndex - 3), (gearIndex + 4)).join('')
                gearCalc.push(findNum(arr, currLine));
		        let nextLine = data[y + 1].slice((gearIndex -3), (gearIndex + 4)).join('')
                gearCalc.push(findNum(arr, nextLine));
                
                // flatten the results, filter out falsy values, and 
                // filter out numbers that aren't adjacent to the gear. 
                gearCalc = gearCalc.flat().filter(Boolean).filter(num => {
                    const snapshot = [prevLine, currLine, nextLine];
                    const numLength = num.toString().length;
                    const numRegex = new RegExp(`(?:^|\\D)${num}(?:\\D|$)`, 'gm');

                    let numLine = 0;
                    for (let i = 0; i < snapshot.length; i++) {
                        if (numRegex.test(snapshot[i])) {
                            numLine = i + 1;
                            break;
                        }
                    }

                    let numIndex = -1;
                    for (let i = 0; i < snapshot.length; i++) {
                        const match = snapshot[i].match(numRegex);
                        if (match && match.length > 0) {
                            const startIndex = snapshot[i].indexOf(match[0]);
                            if (startIndex !== -1) {
                                numIndex = startIndex + match[0].indexOf(String(num));
                                break;
                            }
                        }
                    }

                    // ...
                    if (numLine === 1) {
                        if (numIndex === 0) {
                            if (numLength === 1 || numLength === 2) {
                                return false;
                            } else if (numLength === 3) {
                                return true;
                            }
                        } else if (numIndex === 1) {
                            if (numLength === 1) {
                                return false;
                            } else if (numLength === 2 || numLength === 3) {
                                return true;
                            }
                        } else if (numIndex === 2 || numIndex === 3 || numIndex === 4) {
                            return true;
                        } else if (numIndex === 5 || numIndex === 6) {
                            return false;
                        }
                    } else if (numLine === 2) {
                        if (numIndex === 0) {
                            if (numLength === 1 || numLength === 2) {
                                return false;
                            } else if (numLength === 3) {
                                return true;
                            }
                        } else if (numIndex === 1) {
                            if (numLength === 1) {
                                return false;
                            } else if (numLength === 2 || numLength === 3) {
                                return true;
                            }
                        } else if (numIndex === 2 || numIndex === 4) {
                            return true;
                        } else if (numIndex === 5 || numIndex === 6) {
                            return false;
                        }
                    } else if (numLine === 3) {
                        if (numIndex === 0) {
                            if (numLength === 1 || numLength === 2) {
                                return false;
                            } else if (numLength === 3) {
                                return true;
                            }
                        } else if (numIndex === 1) {
                            if (numLength === 1) {
                                return false;
                            } else if (numLength === 2 || numLength === 3) {
                                return true;
                            }
                        } else if (numIndex === 2 || numIndex === 3 || numIndex === 4) {
                            return true;
                        } else if (numIndex === 5 || numIndex === 6) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });

                // ... by now you have the true gear ratio pairs, and can add them to the total!
                if (gearCalc.length === 2) {
                    total += gearCalc.reduce((acc, i) => acc * i);
                }
                gearCalc = [];
            };
        }
    }

    return total;
}

// process the array of part numbers with the given line of the snapshot grid, 
// then return every part number that is truly adjacent to the current 
// gear symbol in the outer grid to get possible gear ratio candidates
function findNum(arr, str) {
    const regexArr = arr.map(num => new RegExp(`\\b${num}\\b`, 'g'));
    const matches =  str.match(/\d+/g);
    const gearNumbers = new Set();

    if (matches) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < matches.length; j++) {
                if (str.match(regexArr[i]) && parseInt(matches[j]) == arr[i] && matches[j].length === String(arr[i]).length) {
                    gearNumbers.add(arr[i]);
                    break;
                }
            }
        }
    } 
    return gearNumbers.size > 0 ? Array.from(gearNumbers) : null;
}

console.log(gearRatio(partNumbers()))