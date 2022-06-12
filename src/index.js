const brain = require('brain.js'); 

const net = new brain.NeuralNetwork();

net.train([
    {input: [0,0], output: [0]},
    {input: [0,1], output: [1]},
    {input: [1,0], output: [1]},
    {input: [1,1], output: [0]},
]);

console.log(net.run([0, 1]));

const value = document.createElement('h1');
value.innerHTML = net.run([0, 1]);
document.body.append(value);

