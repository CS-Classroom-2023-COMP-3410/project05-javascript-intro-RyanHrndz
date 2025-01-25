
/* JavaScript for Calculator */
const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons button');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else {
            handleOperator(value);
        }
    });
});

function handleNumber(value) {
    if (operator && !previousInput) {
        previousInput = currentInput;
        currentInput = '';
    }
    currentInput += value;
    updateDisplay(currentInput);
}

function handleOperator(value) {
    if (currentInput) {
        operator = value;
    }
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (!previousInput || !currentInput || !operator) {
        return;
    }

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            if (num2 === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            currentInput = (num1 / num2).toString();
            break;
    }

    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('');
}

function updateDisplay(value) {
    display.value = value || '0';
}
