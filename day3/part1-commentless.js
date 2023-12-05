const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => i.trim().split(''));

function dayThree() {
    let total = 0;
    let numStr = '';
    let flag = false;
    const symbolRegex = /[-$*+=&#@%\/]/g;

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (!isNaN(data[y][x])) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        let nx = x + dx;
                        let ny = y + dy;

                        if (
                            nx >= 0 && nx < data[y].length &&
                            ny >= 0 && ny < data.length &&
                            data[ny][nx] && data[ny][nx].match(symbolRegex)
                        ) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) break;
                }
                numStr += data[y][x];
            } else if (data[y][x] === "." || data[y][x].match(symbolRegex)) {
                flag ? total += parseInt(numStr) : null;
                numStr = '';
                flag = false;
            }
        }
    }
    return total;
}

console.log((dayThree()));