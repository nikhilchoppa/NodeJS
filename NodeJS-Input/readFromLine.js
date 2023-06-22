// In Node.js, the readline module provides an interface for reading data from a Readable stream 
// First, it imports the readline module using require('readline').

const readline = require('readline');

// Next, it creates a readline.Interface instance, rl. This is configured to read from process.stdin, 
// and write to process.stdout

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Then it calls rl.question(). This function writes a query to the output, waits for user input, 
// then calls a callback function with the user's input as an argument.

rl.question('Please enter your name: ', (inputName) => {
  // Print a greeting
  console.log(`Hello ${inputName}`);
  rl.close();
});
