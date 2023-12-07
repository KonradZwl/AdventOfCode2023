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
arrayOfCards["J"] = 1;

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
    const rankCounts = {};
    for (const card of hand) {
        if (!rankCounts[card]) {
            rankCounts[card] = 1;
        } else {
            rankCounts[card]++;
        }
    }

    const uniqueRanks = Object.keys(rankCounts);
    if (uniqueRanks.includes("J") && uniqueRanks.length > 1){
        const maxKeyWithoutJ = Object.entries(rankCounts)
            .filter(([key]) => key !== 'J')
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];        
        rankCounts[maxKeyWithoutJ] += rankCounts["J"]
    }
    if (uniqueRanks.length === 1 && uniqueRanks.includes("J")){
        return true;
    }
    return Object.values(rankCounts).includes(5);
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
    if (uniqueRanks.includes("J")){
        const maxKey = Object.entries(rankCounts)
            .filter(([key]) => key !== 'J')
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];          
        rankCounts[maxKey] += rankCounts["J"]
    }
    return Object.values(rankCounts).includes(4);
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
    if (uniqueRanks.includes("J")){
        const maxKey = Object.entries(rankCounts)
            .filter(([key]) => key !== 'J')
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];         
        rankCounts[maxKey] += rankCounts["J"]
    }
    const filteredRankCounts = Object.entries(rankCounts).filter(([key]) => key !== 'J').filter(([key, value]) => value === 2 || value === 3);

    return filteredRankCounts.some(([key, value]) => value === 2) && filteredRankCounts.some(([key, value]) => value === 3);
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
    if (uniqueRanks.includes("J")){
        const maxKey = Object.entries(rankCounts)
            .filter(([key]) => key !== 'J')
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];         
        rankCounts[maxKey] += rankCounts["J"]
    }
    return Object.values(rankCounts).includes(3);
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
    if (uniqueRanks.includes("J")){
        const maxKey = Object.entries(rankCounts)
            .filter(([key]) => key !== 'J')
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];         
        rankCounts[maxKey] += rankCounts["J"]
    }
    const pairCount = Object.values(rankCounts).reduce((count, rank) => count + (rank === 2 ? 1 : 0), 0);

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
    if (uniqueRanks.includes("J")){
        const maxKey = Object.entries(rankCounts)
            .filter(([key]) => key !== 'J')
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];         
        rankCounts[maxKey] += rankCounts["J"]
    }
    const pairCount = Object.values(rankCounts).reduce((count, rank) => count + (rank === 2 ? 1 : 0), 0);

    return pairCount === 1;
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

    return 1;
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
    let temp1 = getHandType(a.hands)
    let temp2 = getHandType(b.hands)
    
    let dif = temp1 - temp2;
    console.log(dif)
    if (dif === 0){
        return compareEachCardInHand(a.hands, b.hands);
    }
    return dif;
});


let sum = 0;
for (let i = 1; i <= result.length; i++){
    console.log(result[i - 1])
    sum += parseInt(result[i - 1].bid) * i;
}

console.log(sum)
