const {input} = require('./input');

let pattern = input[0].trim();

var Nodes = [];

for (let i = 2; i < input.length; i++) {
    let nodeName = input[i].split('=')[0].trim();
    let nodeValues = input[i].split('=')[1].trim().split(',');
    let node1 = nodeValues[0].trim().slice(1);
    let node2 = nodeValues[1].trim().slice(0, -1);
    
    Nodes[nodeName] = {
        node: nodeName,
        nodes: [node1, node2]
    }
}
console.log(Nodes)
let patternIndex = 0;
let counter = 0;

function traverseNodes(node, patternElement) {
    if (patternElement === 'L'){
        currentNodeName = Nodes[node.nodes[0]];
    }else{
        currentNodeName = Nodes[node.nodes[1]];
    }
    counter++;
}

let currentNodeName = Nodes["AAA"];

console.log(currentNodeName)

while (currentNodeName.node !== 'ZZZ'){
    
    traverseNodes(Nodes[currentNodeName.node], pattern[patternIndex])
    console.log(currentNodeName)

    if (patternIndex === pattern.length - 1){
        patternIndex = 0;
    }else {
        patternIndex++;
    }
}
console.log(counter)
