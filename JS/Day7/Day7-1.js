const {input} = require('./input');

const arrayOfCards = [];

arrayOfCards["A"] = 14;
arrayOfCards["K"] = 13;
arrayOfCards["Q"] = 12;
arrayOfCards["J"] = 11;
arrayOfCards["T"] = 10;
arrayOfCards["9"] = 9;
arrayOfCards["8"] = 8;
arrayOfCards["7"] = 7;
arrayOfCards["6"] = 6;
arrayOfCards["5"] = 5;
arrayOfCards["4"] = 4;
arrayOfCards["3"] = 3;
arrayOfCards["2"] = 2;

const HAND_TYPES = {
    FIVE_OF_A_KIND: 7,
    FOUR_OF_A_KIND: 6,
    FULL_HOUSE: 5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 3,
    ONE_PAIR: 2,
    HIGH_CARD: 1,
};

function checkFiveOfAKind(hand) {
    if (!hand) {
        return false; 
    }

    const firstChar = hand[0];
    for (let i = 1; i < hand.length; i++) {
        if (hand[i] !== firstChar) {
            return false; 
        }
    }

    return true;
}

function checkFourOfAKind(hand) {
    if (!hand) {
        return false;
    }

    const rankCounts = {};
    for (const card of hand) {
        if (!rankCounts[card]) {
            rankCounts[card] = 1;
        } else {
            rankCounts[card]++;
        }
    }

    const uniqueRanks = Object.keys(rankCounts);
    return uniqueRanks.length === 2 && (rankCounts[uniqueRanks[0]] === 1 || rankCounts[uniqueRanks[1]] === 1);
}

function checkFullHouse(hand) {
    if (!hand) {
        return false;
    }

    const rankCounts = {};
    for (const card of hand) {
        if (!rankCounts[card]) {
            rankCounts[card] = 1;
        } else {
            rankCounts[card]++;
        }
    }

    const uniqueRanks = Object.keys(rankCounts);
    return uniqueRanks.length === 2 && ((rankCounts[uniqueRanks[0]] === 3 || rankCounts[uniqueRanks[0]] === 2) || (rankCounts[uniqueRanks[1]] === 3 ||rankCounts[uniqueRanks[1]] === 2));
}

function checkThreeOfAKind(hand) {
    if (!hand) {
        return false;
    }

    const rankCounts = {};
    for (const card of hand) {
        if (!rankCounts[card]) {
            rankCounts[card] = 1;
        } else {
            rankCounts[card]++;
        }
    }

    const uniqueRanks = Object.keys(rankCounts);
    return uniqueRanks.length === 3 && (rankCounts[uniqueRanks[0]] === 3 || rankCounts[uniqueRanks[1]] === 3 || rankCounts[uniqueRanks[2]] === 3);
}

function checkTwoPair(hand) {
    if (!hand) {
        return false;
    }

    const rankCounts = {};
    for (const card of hand) {
        if (!rankCounts[card]) {
            rankCounts[card] = 1;
        } else {
            rankCounts[card]++;
        }
    }

    const uniqueRanks = Object.keys(rankCounts);
    const pairCount = uniqueRanks.reduce((count, rank) => count + (rankCounts[rank] === 2 ? 1 : 0), 0);

    return pairCount === 2;
}

function checkOnePair(hand) {
    if (!hand || hand.length !== 5) {
        return false; // Return false for empty or non-five-card hands
    }

    const rankCounts = {};
    for (const card of hand) {
        if (!rankCounts[card]) {
            rankCounts[card] = 1;
        } else {
            rankCounts[card]++;
        }
    }

    const uniqueRanks = Object.keys(rankCounts);
    const pairCount = uniqueRanks.reduce((count, rank) => count + (rankCounts[rank] === 2 ? 1 : 0), 0);

    return pairCount === 1 && uniqueRanks.length === 4;
}

function checkHighCard(hand) {
    if (!hand) {
        return false;
    }

    const uniqueRanks = new Set(hand);

    return uniqueRanks.size === 5;
}

function getHandType(hand) {
    if (checkFiveOfAKind(hand)) {
        return HAND_TYPES.FIVE_OF_A_KIND;
    }

    if (checkFourOfAKind(hand)) {
        return HAND_TYPES.FOUR_OF_A_KIND;
    }

    if (checkFullHouse(hand)) {
        return HAND_TYPES.FULL_HOUSE;
    }

    if (checkThreeOfAKind(hand)) {
        return HAND_TYPES.THREE_OF_A_KIND;
    }

    if (checkTwoPair(hand)) {
        return HAND_TYPES.TWO_PAIR;
    }

    if (checkOnePair(hand)) {
        return HAND_TYPES.ONE_PAIR;
    }

    if (checkHighCard(hand)) {
        return HAND_TYPES.HIGH_CARD;
    }

    return 1; // Default to HIGH_CARD if no match is found
}

const hands = [];

input.forEach(x => {
    hands.push({hands: x.split(' ')[0].trim(), bid: x.split(' ')[1].trim()})
})

function compareEachCardInHand(hands, hands2) {
    for (let i = 0; i < hands.length; i++) {
        if (arrayOfCards[hands[i]] > arrayOfCards[hands2[i]]) {
            return 1;
        }else if (arrayOfCards[hands[i]] < arrayOfCards[hands2[i]]) {
            return -1;
        }
    } 
}
 
let result = [];
result = hands.sort((a, b) => {
        let dif = getHandType(a.hands) - getHandType(b.hands);
        if (dif === 0){
            return compareEachCardInHand(a.hands, b.hands);
        }
        return dif;
    });

console.log(result);

let sum = 0;
for (let i = 1; i <= result.length; i++){
    console.log(result[i - 1])
    sum += parseInt(result[i - 1].bid) * i;
}

console.log(sum)
