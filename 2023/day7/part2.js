/*
... To make things a little more interesting, the Elf introduces one additional rule. Now, J cards are jokers - 
wildcards that can act like whatever card would make the hand the strongest type possible.
To balance this, J cards are now the weakest individual cards, weaker even than 2. ...
*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).map(i => i.split(' '));

const labelStrength = {
    "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7, "9": 8, 
    "T": 9, "J": 0, "Q": 11, "K": 12, "A": 13
}

const handStrength = {
    "High Card": 1, "One Pair": 2, "Two Pair": 3, "Three of a Kind": 4, 
    "Full House": 5, "Four of a Kind": 6, "Five of a Kind": 7
}

function findHandStrength(str) {
    const uniques = [...new Set(str)]

    const charCount = str.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});

    let handType = '';
    if (uniques.includes('J')) {
        // variables 
        let jokerNum = charCount['J'];

        let strongest = '';
        for (let i = 0; i < uniques.length; i++) {
            if (
                ((charCount[uniques[i]] > charCount[strongest])
                || (!strongest)) && uniques[i] !== 'J'
            ) {
                strongest = uniques[i]
            }
        }

        // conditions 
        if (uniques.length === 1 && jokerNum === 5) {
            handType = 'Five of a Kind';
            return handStrength[handType];
        }

        if (uniques.length === 2) {
            if (jokerNum + charCount[strongest] === 5) {
                handType = 'Five of a Kind';
                return handStrength[handType];
            }
        }

        if (uniques.length === 3) {
            if ((jokerNum + charCount[strongest] === 4)) {
                handType = 'Four of a Kind';
                return handStrength[handType];
            } else {
                let flag = '';
                for (let i = 0; i < uniques.length; i++) {
                    if (uniques[i] !== 'J' && uniques[i] > flag) {
                        flag = uniques[i];
                    }
                }
                if (charCount[flag] === 2) {
                    handType = 'Full House';
                    return handStrength[handType];
                }
            }
        }

        if (uniques.length === 4 && (jokerNum + charCount[strongest] === 3)) {
            handType = 'Three of a Kind';
            return handStrength[handType];
        } 

        if (uniques.length === 5 && (jokerNum + charCount[strongest] === 2)) {
            handType = 'One Pair';
            return handStrength[handType];
        }



    } else {
        // original logic copy/pasted from part 1 for hands without jokers 
        if (uniques.length === 5) {
            handType = 'High Card';
            return handStrength[handType];
        } else if (uniques.length === 1) {
            handType = 'Five of a Kind';
            return handStrength[handType];
        } else if (uniques.length === 3) {
            for (let i = 0; i < uniques.length; i++) {
                if (charCount[uniques[i]] === 3) {
                    handType = 'Three of a Kind';
                    return handStrength[handType];
                } 
            }
            handType = 'Two Pair';
            return handStrength[handType];
        }

        if (uniques.length === 2) {
            for (let i = 0; i < uniques.length; i++) {
                if (charCount[uniques[i]] === 4) {
                    handType = 'Four of a Kind';
                    return handStrength[handType];
                } 
            }
            handType = 'Full House';
            return handStrength[handType];
        }

        if (uniques.length === 4) {
            for (let i = 0; i < uniques.length; i++) {
                if (charCount[uniques[i]] > 2) {
                    break;
                } else {
                    handType = 'One Pair';
                    return handStrength[handType];
                }
            }
        }
    }
}

function findCardStrength(arr) {
    const strengths = arr.map(item => {
        return [item[0], item[1], findHandStrength(item[0])]
    })
    // creates an array of the hands sorted by hand type
    return strengths.sort((a, b) => a[2] - b[2]);
}

// modified bubble sort
function handSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            let currentLabel = arr[j][0];
            let nextLabel = arr[j + 1][0];

            // check each individual card 
            let index = 0;
            while (index < currentLabel.length && index < nextLabel.length) {
                if (labelStrength[currentLabel[index]] > labelStrength[nextLabel[index]]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    break;
                } else if (labelStrength[currentLabel[index]] < labelStrength[nextLabel[index]]) {
                    break;
                }
                index++;
            }
        }
    }

    return arr;
}

// reassemble an array sorted by hand type and individual card strength
function sortCards(arr) {
    let highCard = [];
    let onePair = [];
    let twoPair = [];
    let threeKind = [];
    let fullHouse = [];
    let fourKind = [];
    let fiveKind = [];

    arr.map(item => {
        if (item[2] === 1) {
            highCard.push([item[0], item[1], item[2]]);
        } else if (item[2] === 2) {
            onePair.push([item[0], item[1], item[2]]);
        } else if (item[2] === 3) {
            twoPair.push([item[0], item[1], item[2]]);
        } else if (item[2] === 4) {
            threeKind.push([item[0], item[1], item[2]]);
        } else if (item[2] === 5) {
            fullHouse.push([item[0], item[1], item[2]]);
        } else if (item[2] === 6) {
            fourKind.push([item[0], item[1], item[2]]);
        } else if (item[2] === 7) {
            fiveKind.push([item[0], item[1], item[2]]);
        }
    })

    return [
            handSort(highCard),
            handSort(onePair),
            handSort(twoPair),
            handSort(threeKind),
            handSort(fullHouse),
            handSort(fourKind),
            handSort(fiveKind)
        ].flat()
}

function totalWinnings(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += (i + 1) * parseInt(arr[i][1])
    }

    return total;
}
console.log("Total Winnings: " + totalWinnings(sortCards(findCardStrength(data))))