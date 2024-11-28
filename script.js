let currentValue = "";
let previousValue = "";
let operatorValue = "";

document.addEventListener("DOMContentLoaded", function () {
    let clear = document.querySelector(".clear");
    let numbers = document.querySelectorAll(".number");
    let equals = document.querySelector(".equal");
    let operators = document.querySelectorAll(".operator");
    let decimal = document.querySelector(".decimal");

    let currentScreen = document.querySelector(".current");
    let previousScreen = document.querySelector(".previous");

    // Handle number button clicks
    numbers.forEach((number) =>
        number.addEventListener("click", function (e) {
            handleNumber(e.target.textContent);
            currentScreen.textContent = currentValue;
        })
    );

    // Handle operator button clicks
    operators.forEach((operator) =>
        operator.addEventListener("click", function (e) {
            if (operatorValue && currentValue !== "") {
                // Perform immediate calculation
                calculate(operatorValue, currentValue, previousValue);
                currentScreen.textContent = currentValue; // Display the result
                previousValue = currentValue; // Update previous value
            } else if (currentValue !== "") {
                // Set the first operand for the calculation
                previousValue = currentValue;
            }

            handleOperator(e.target.textContent); // Update operator
            previousScreen.textContent = previousValue + " " + operatorValue; // Display ongoing operation
            currentValue = ""; // Clear current value for next input
            currentScreen.textContent = 0;
        })
    );

    // Handle equals button click
    equals.addEventListener("click", function (e) {
        if (operatorValue && currentValue !== "" && previousValue !== "") {
            calculate(operatorValue, currentValue, previousValue);
            currentScreen.textContent = currentValue; // Show the result
            previousScreen.textContent = ""; // Clear previous operation display
            operatorValue = ""; // Reset operator
        }
    });

    // Handle clear button click
    clear.addEventListener("click", function (e) {
        currentValue = "";
        previousValue = "";
        operatorValue = "";
        currentScreen.textContent = 0; // Reset display
        previousScreen.textContent = "";
    });

    // Handle decimal button click
    decimal.addEventListener("click", function (e) {
        if (!currentValue.includes(".")) {
            currentValue += ".";
        }
        currentScreen.textContent = currentValue;
    });
});

// Function to handle number input
function handleNumber(num) {
    if (currentValue === "0" && num !== ".") {
        currentValue = num; // Replace leading zero
    } else if (currentValue.length <= 5) {
        currentValue += num;
    }
}

// Function to handle operator input
function handleOperator(op) {
    operatorValue = op;
}

// Function to perform calculations
function calculate(op, curr, prev) {
    if (curr === "" || prev === "") return; // Skip if inputs are incomplete

    if (op === "+") {
        currentValue = Number(prev) + Number(curr);
    } else if (op === "-") {
        currentValue = Number(prev) - Number(curr);
    } else if (op === "*") {
        currentValue = Number(prev) * Number(curr);
    } else if (op === "/") {
        currentValue = curr === "0" ? "Error" : Number(prev) / Number(curr); // Handle division by zero
    }
    previousValue = ""; // Clear previous value after calculation
}
