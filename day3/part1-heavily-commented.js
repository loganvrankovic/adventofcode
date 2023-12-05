// Day 3 - Part 1 
    // included is a thorough explanation of searching a grid to solve this problem:
    // any number adjacent to a symbol, even diagonally, is a "part number" and 
    // must be added to a total. 

const fs = require('fs');
// split the puzzle input by newline characters (\n)
// this creates the grid (2D array)
const data = fs.readFileSync('input.txt', 'utf8').split('\n');

function dayThree() {
    let total = 0;
    let numStr = '';
    let flag = false;
    const symbolRegex = /[-$*+=&#@%\/]/g;

    // iterate through the rows of the whole input.
    for (let y = 0; y < data.length; y++) {
        // iterate through the columns of the whole input. 
        for (let x = 0; x < data[y].length; x++) {
            // if the character is a number ...
            if (!isNaN(data[y][x])) {
                for (let dy = -1; dy <= 1; dy++) {
                    // iterate to make a vertical offset of current the cell, 
                    // from -1 (one row up) to 1 (one row down), including the current row (0 offset).
                    for (let dx = -1; dx <= 1; dx++) {
                        // iterate to make a horizontal offset of the current cell,
                        // from -1 (one column left) to 1 (one column right), including the current column (0 offset).

                        // finally, for each offset combination (dx, dy), calculates (n)ew x and y coordinates by 
                        // adding the offsets to the current x and y coordinates of the cell.
                        let nx = x + dx;
                        let ny = y + dy;

                        // ... and if it touches a symbol ...
                        if (
                            // are the new coordinates within the grid's boundaries?
                            nx >= 0 && // is the new x coordinate not negative? checks if within the leftmost boundary 
                            nx < data[y].length && // is the new x coordinate < the length of the row? checks if within the rightmost boundary  
                            ny >= 0 && // is the new y coordinate not negative? checks if within the topmost boundary
                            ny < data.length && // is the new y coordinate < the number of rows? checks if within the bottommost boundary 
                            data[ny][nx] && data[ny][nx].match(symbolRegex) // does the cell exist? is the cell a symbol? 
                        ) {
                            // .. set a "touched" flag to true.
                            flag = true;
                            break;
                        }
                    }
                    // exit once a symbol is found 
                    if (flag) break;
                }
                // build up a number until you hit a period or symbol ...
                numStr += data[y][x];
            } else if (data[y][x] === "." || data[y][x].match(symbolRegex)) {
                // ... add to total if flag is marked true.
                flag ? total += parseInt(numStr) : null;
                numStr = '';
                flag = false;
            }
        }
    }
    return total;
}

console.log(dayThree());