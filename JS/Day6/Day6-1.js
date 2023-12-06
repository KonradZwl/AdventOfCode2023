const {input} = require('./Day6Input');

let arrayOfRaces = [];
let amountOfRaces = input[0].split(":")[1].trim().replace(/\s+/g, '-').split("-");
let distance = input[1].split(":")[1].trim().replace(/\s+/g, '-').split("-");

for (let i = 0; i < amountOfRaces.length; i++) {
    if (amountOfRaces[i] !== "" && distance[i] !== ""){
        arrayOfRaces.push({time: amountOfRaces[i].trim(), distance: distance[i].trim()})
    }
}
let fasterThan = []
for (let i = 0; i <arrayOfRaces.length; i++){
    let fasterThanRecord = 0;
    for (let j = 0; j <= parseInt(arrayOfRaces[i].time); j++){
        if ((parseInt(arrayOfRaces[i].time) - j ) * j  > parseInt(arrayOfRaces[i].distance)){
            fasterThanRecord++;
        }
    }
    fasterThan.push(fasterThanRecord);
}

let sum = 1;
for (let i = 0; i < fasterThan.length; i++){
    sum *= fasterThan[i];
}

console.log(sum)