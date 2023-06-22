// process.argv is an array of to input from command line
// [2]: first element of this array is the path to the Node.js executable, 
// the second element is the path of the JavaScript file being executed,
// and the remaining elements are any additional command line arguments.
// Access command line arguments
const userName = process.argv[2];

// Print a greeting
console.log(`Hello ${userName}`);

// In the script readCommandLineArguments.js, we're grabbing the third element (index 2) from this array, which we assume to be a name passed as a command line argument when running the script.
// third element: node readCommandLineArguments.js Ravi
