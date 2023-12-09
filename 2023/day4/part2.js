/* 
... Just as you're about to report your findings to the Elf, one of you realizes that the rules have 
actually been printed on the back of every card this whole time.
There's no such thing as "points". Instead, scratchcards only cause you to win more scratchcards equal to the number of winning numbers you have.
Specifically, you win copies of the scratchcards below the winning card equal to the number of matches. 
So, if card 10 were to have 5 matching numbers, you would win one copy each of cards 11, 12, 13, 14, and 15. ...
*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/)
               .map(i => i.replace(/\r/, '')).filter(Boolean)
               .map(i => i.split(/:|\|/).map(i => i.trim()))
               .map(i => i.map(i => i.split(/\s/g)))
               .map(i => i.map(i => i.map(i => i.replace(/Card/g, '')).filter(Boolean)))
               .map(i => {
                i.shift();
                return i;
               })
               
var scratchcards = 0;

function findMatches(card) {	
    let matches = 0;

	data[card][0].map(i => {
		if (data[card][1].includes(i)) {
			matches += 1;
		}
	})

    return matches;
}

function checkCards(card, matches) {
    let totalCards = 0;

    for (let c = 1; c <= matches; c++) {
        totalCards += findMatches(card + c);
        totalCards += checkCards(card + c, findMatches(card + c));
    }

    return totalCards;
}

for (let i = 0; i < data.length; i++) {
    let matches = findMatches(i)
    scratchcards += matches;
    scratchcards += checkCards(i, matches)
}

// - before locking in the answer, you need to make sure to add the cards you already have! 
scratchcards += data.length;
console.log(scratchcards)

/* this solution doesn't like the console logs, so the explanation is here:
    - in general, the goal of this program is to use recursion to check the copies for matches 
    - first, the data is chopped up into an array of arrays, with the winning numbers and 
    our own numbers stored in their own arrays.
    - at the bottom, the for loop iterates over all the "cards", keeps track of the matches in the current card,
    adds the matches to the global scratchcard count, and then adds the sum of all the matches, including 
    the copies of the cards, using recursion. 
    - findMatches(card): uses .map() and .includes() to find the matches per card 
    - checkCards(card, matches): 
        - totalCards keeps track of the total number of scratchcards won by the copies
        - iterates through subsequent cards (card + c) up to the number of matches
        - for each subsequent card, 
            - caclulate matches in the current subsequent card (card + c) up to the number of matches
            - recursively calls checkCards on the subsequent card to check for more matches and cards won
            - accumulates all the cards into totalCards along the way 
        - the base case occurs implicitly within the for loop:
            - the recursive calls continue until there are no more matches left on the current chain of cards.
            - then matches becomes 0 or less, the loop in checkCards stops iterating because c <= matches condition fails.
            - The function stops making recursive calls and simply returns the accumulated count of 
            - additional scratch cards (totalCards) won due to matches on the cards in this chain.              
*/