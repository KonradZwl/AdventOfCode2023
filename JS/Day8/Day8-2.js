const { input } = require('./input');

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

let pattern = input[0].trim();

var Nodes = {};

for (let i = 2; i < input.length; i++) {
    let nodeName = input[i].split('=')[0].trim();
    let nodeValues = input[i].split('=')[1].trim().split(',');
    let node1 = nodeValues[0].trim().slice(1);
    let node2 = nodeValues[1].trim().slice(0, -1);

    Nodes[nodeName] = {
        node: nodeName,
        nodes: [node1, node2]
    };
}

console.log(Nodes);

let NodeNamesWithA = Object.values(Nodes).filter(node => node.node.endsWith('A'));

console.log(NodeNamesWithA);

let patternIndex = 0;
let counter = 0;

function traverseNodes(node, patternElement) {
    if (patternElement === 'L'){
        counter++;
        return Nodes[node.nodes[0]];
    }else{
        counter++;
        return Nodes[node.nodes[1]];
    }
}

let arrayOfTraversels = [];
for (let i = 0; i < NodeNamesWithA.length; i++){
    let currentNodeName = NodeNamesWithA[i];
    while (!currentNodeName.node.endsWith('Z')){

        currentNodeName = traverseNodes(Nodes[currentNodeName.node], pattern[patternIndex])
        console.log(currentNodeName)

        if (patternIndex === pattern.length - 1){
            patternIndex = 0;
        }else {
            patternIndex++;
        }
    }
    arrayOfTraversels.push(counter);
    counter = 0;
    patternIndex = 0;
}

console.log(arrayOfTraversels)