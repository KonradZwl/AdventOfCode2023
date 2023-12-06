const {input} = require('./Day6Input');

let time = input[0].split(":")[1].trim().replace(/\s+/g, '');
let distance = input[1].split(":")[1].trim().replace(/\s+/g, '');

let fasterThanRecord = 0;
for (let i = 0; i <= parseInt(time); i++){
        if ((parseInt(time) - i) * i > parseInt(distance))
            fasterThanRecord++;
}
console.log(fasterThanRecord);
