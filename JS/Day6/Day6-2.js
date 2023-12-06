console.time("test_timer")
const {input} = require('./Day6Input');

let time = input[0].split(":")[1].trim().replace(/\s+/g, '');
let distance = input[1].split(":")[1].trim().replace(/\s+/g, '');

let fasterThanRecord = 0;
let numberIsEven = false;
if (Math.round(parseInt(time) / 2) % 2 === 0){
    numberIsEven = true;
}

let i = Math.round(parseInt(time) / 2);
while ((parseInt(time) - i) * i !== 0){
    if ((parseInt(time) - i) * i > parseInt(distance)){
        fasterThanRecord++;
    }
    i++;
}

let total;

total = fasterThanRecord * 2;
if (!numberIsEven){
    total -= 1;
}
console.log(total)
console.timeEnd("test_timer")
