const {input} = require('./Day5Input');

let locations = [];


//Get seed numbers
const seedNumbers = input[0].split(":")[1].trim().split(" ").map(x => parseInt(x))
//Create each map

for (let x = 0; x < seedNumbers.length; x++){
    let destinationNumber = seedNumbers[x]

    for (let i = 2; i < input.length; i++) {
        //Map section
        if (input[i].includes("map")){
            console.log(input[i])
            let j = i + 1;
            while (input[j] !== "\r" && j !== input.length){
                let tempDestination = parseInt(input[j].split(" ")[0]);
                let tempSource = parseInt(input[j].split(" ")[1]);

                
                if (destinationNumber <= tempSource + tempLength && destinationNumber >= tempSource){ 
                    let temp = tempDestination - tempSource;
                    destinationNumber =  destinationNumber + temp;
                    break;
                }
                j++;
            }
            i = j;
        }
    }
    locations.push(destinationNumber);
}
console.log(Math.min(...locations))