// Element selectors
let display = document.querySelector(".app-screen .screen-content");
let key = document.querySelectorAll(".key");

//Status variables
let currentInput = "";
let previousInput = "";
let operator = "";
let err = "Error";

// Update display
function updateDisplay(value) {
  display.textContent = value || "0";
}

//Operation function
function calculate() {
  let x = parseFloat(previousInput);
  let y = parseFloat(currentInput);
  let result;

  if(isNaN(x) || isNaN(y)) return err;

  switch (operator) {
    case "%" : result = x % y;
    break;
    case "÷" : result = y !== 0 ? x / y : err;
    break;
    case "x" : result = x * y;
    break;
    case "-" : result = x - y;
    break;
    case "+" : result = x + y;
    break;
    default: result = x;
  }

  return result.toString();
}


//Event Listener for buttons
function buttonClick(event) {
  const value = event.target.textContent;
  let arr = ["+", "-", "x", "÷", "%", "+/-"];

//If number or .
  if(!isNaN(value) || value === ".") {
    if (currentInput === "0" || currentInput === "") {
      if(value === ".") {
        currentInput = "0."
      } else {
        currentInput = value;
      }
    } else {
      
      currentInput += value;
    }

    updateDisplay(currentInput);
  }

//If operator 
  if(arr.includes(value) && value !== "+/-") {
    if(!currentInput) return err;

    if(previousInput && operator) {
      currentInput = calculate();
      updateDisplay(currentInput);
    }

    operator = value;
    previousInput = currentInput;
    currentInput = "";
    return;
  }

//If +/- 
  if(value === "+/-") {
    if(!currentInput ) return err; 
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay(currentInput);  
    return;  
  }  

//If = 
  if(value === "=") {
    if(!currentInput || !previousInput || !operator) return err;
    
    currentInput = calculate();
    updateDisplay(currentInput);
    previousInput = "";
    operator = "";
    return;    
  }

//If Clear 
  if(value === "AC") {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
    return;
  }  
}

key.forEach(button => {
  button.addEventListener("click", buttonClick)
})

