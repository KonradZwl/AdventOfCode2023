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

let NodeNamesWithA = [];
for (let node in Nodes){
    if (node[node.length - 1] === 'A'){
        NodeNamesWithA.push(Nodes[node]);
    }
}

console.log(NodeNamesWithA);

let NodesContainZ = NodeNamesWithA.filter(x => x.node[x.node.length - 1] === 'Z');

function traverseNodes(NodesWithA, patternElement) {
    let newNodes = [];
    counter++;
    NodesWithA.forEach(x => {
        if (patternElement === 'L'){
            newNodes.push(Nodes[x.nodes[0]]);
        }else{
            newNodes.push(Nodes[x.nodes[1]]);
        }
    })
    NodeNamesWithA = newNodes;
}
let patternIndex = 0;
let counter = 0;
while (NodesContainZ.length !== NodeNamesWithA.length){

    traverseNodes(NodeNamesWithA, pattern[patternIndex])
    console.log(NodeNamesWithA)

    if (patternIndex === pattern.length - 1){
        patternIndex = 0;
    }else {
        patternIndex++;
    }
    NodesContainZ = NodeNamesWithA.filter(x => x.node[x.node.length - 1] === 'Z');
    console.log(counter)
}
console.log(counter)