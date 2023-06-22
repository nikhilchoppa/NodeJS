// this is Server code
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 100

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // This is the line that replaced bodyParser.urlencoded()

// GET handler for the root endpoint
app.get('/', (req, res) => {
    res.send('Hello world!');
});


// function to validate numbers and check for errors
function validateNumbers(num1, num2) {
    let errorMsg= '';
    if (typeof num1 !== 'number' || typeof num2 !== 'number'){
        errorMsg = 'Invalid data types'
    }else if (num1 <-1e6 || num2 <-1e6 || num1+num2 < -1e6){
        errorMsg = 'Underflow'
    } else if (num1 > 1e6 || num2 > 1e6 || num1+num2 > 1e6){
        errorMsg = 'Overflow'
    }

    return errorMsg;
}

// Add endpoint
app.post('/add', (req, res) => {
    const {num1, num2} = req.body;

    const error = validateNumbers(num1, num2);

    if (error) {
        return res.json({ status: 'error', message: error});
    }

    const sum = num1 + num2;
    res.json({status:'error', message: 'The sum of given two numbers', sum});
});

// Subtraction endpoint
app.post('/sub', (req, res) => {
    const { num1, num2 } = req.body;
  
    const error = validateNumbers(num1, num2);
  
    if (error) {
      return res.json({ status: 'error', message: error });
    }
  
    const difference = num1 - num2;
    res.json({ status: 'success', message: 'the difference of given two numbers', difference });
  });
  


// Multiplication endpoint
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
  
    const error = validateNumbers(num1, num2);
  
    if (error) {
      return res.json({ status: 'error', message: error });
    }
  
    const result = num1*num2;
    res.json({ status: 'success', message: 'The product of given numbers', result });
  });
  
// Divide endpoint
app.post('/divide', (req, res)=> {
    const {num1, num2} = req.body;

    const error = validateNumbers(num1, num2);

    if (error) {
        return res.json({status: 'error', message: error});
    }

    // Check if num2 is zero
    if(num2 === 0) {
        return res.json({status: 'error', message: 'Cannot divide by zero'});
    }

    const result = num1/num2;
    res.json({status:'success', message: 'This divison of given numbers', result});
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;