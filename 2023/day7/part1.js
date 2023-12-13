/* 
... Because the journey will take a few days, she offers to teach you the game of Camel Cards. 
Camel Cards is sort of similar to poker except it's designed to be easier to play while riding a camel. ...
*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).map(i => i.split(' '));

const labelStrength = {
    "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7, "9": 8, 
    "T": 9, "J": 10, "Q": 11, "K": 12, "A": 13
}

const handStrength = {
    "High Card": 1, "One Pair": 2, "Two Pair": 3, "Three of a Kind": 4, 
    "Full House": 5, "Four of a Kind": 6, "Five of a Kind": 7
}

function findHandStrength(str) {
    const uniques = [...new Set(str)]
    // find all unique cards, and the number of their occurrences
    const charCount = str.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});

    // use the above object to sort the Camel Cards hands into types and return their strength
    let handType = '';
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

function findCardStrength(arr) {
    const strengths = arr.map(item => {
        return [item[0], item[1], findHandStrength(item[0])]
    })
    // sort the hands by their strength values (sorts the hands by hand type)
    return strengths.sort((a, b) => a[2] - b[2]);
}

// modified bubble sort to compare the card strengths within each hand type, one card at a time
function handSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            let currentLabel = arr[j][0];
            let nextLabel = arr[j + 1][0];

            // initialize the index for individual card comparison
            let index = 0;
            while (index < currentLabel.length && index < nextLabel.length) {
                // compare label strengths at the current card index 
                if (labelStrength[currentLabel[index]] > labelStrength[nextLabel[index]]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    break;
                } else if (labelStrength[currentLabel[index]] < labelStrength[nextLabel[index]]) {
                    // break the loop if the next card is actually stronger 
                    break;
                }
                // move to the next card if neither condition is met
                index++;
            }
        }
    }

    return arr;
}

function sortCards(arr) {
    let highCard = [];
    let onePair = [];
    let twoPair = [];
    let threeKind = [];
    let fullHouse = [];
    let fourKind = [];
    let fiveKind = [];

    // disassemble the incoming array of hands by their hand type
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

    // sort each hand type by individual card strength, 
    // then reassemble and return a new array of hands
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
console.log(totalWinnings(sortCards(findCardStrength(data))))