// Element selectors
let display = document.querySelector(".app-screen .screen-content");
let key = document.querySelectorAll(".key");

//Status variables
let currInput = "";
let prevInput = "";
let operator = "";
let err = "Error";

// Update display
function updateDisplay(value) {
  display.textContent = value || "0";
}

//Operation function
function calculate() {
  let x = parseFloat(prevInput);
  let y = parseFloat(currInput);
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
    if (currInput === "0" || currInput === "") {
      if(value === ".") {
        currInput = "0."
      } else {
        currInput = value;
      }
    } else {
      
      currInput += value;
    }

    updateDisplay(currInput);
  }

//If operator 
  if(arr.includes(value) && value !== "+/-") {
    if(!currInput) return err;

    if(prevInput && operator) {
      currInput = calculate();
      updateDisplay(currInput);
    }

    operator = value;
    prevInput = currInput;
    currInput = "";
    return;
  }

//If +/- 
  if(value === "+/-") {
    if(!currInput ) return err; 
    currInput = (parseFloat(currInput) * -1).toString();
    updateDisplay(currInput);  
    return;  
  }  

//If = 
  if(value === "=") {
    if(!currInput || !prevInput || !operator) return err;

    currInput = calculate();
    updateDisplay(currInput);
    prevInput = "";
    operator = "";
    return;    
  }

//If Clear 
  if(value === "AC") {
    currInput = "";
    prevInput = "";
    operator = "";
    updateDisplay("0");
    return;
  }  
}

key.forEach(button => {
  button.addEventListener("click", buttonClick)
})

