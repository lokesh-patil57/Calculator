document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentNumber = '';
    let firstOperand = null;
    let operator = null;
    let shouldResetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                if (shouldResetScreen) {
                    result.value = '';
                    shouldResetScreen = false;
                }
                result.value += button.textContent;
                currentNumber = result.value;
            }

            if (button.classList.contains('decimal')) {
                if (!result.value.includes('.')) {
                    result.value += '.';
                }
            }

            if (button.classList.contains('operator')) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentNumber);
                } else if (operator) {
                    const secondOperand = parseFloat(currentNumber);
                    firstOperand = calculate(firstOperand, operator, secondOperand);
                    result.value = firstOperand;
                }
                operator = button.textContent;
                shouldResetScreen = true;
            }

            if (button.classList.contains('equals')) {
                if (firstOperand !== null && operator) {
                    const secondOperand = parseFloat(currentNumber);
                    firstOperand = calculate(firstOperand, operator, secondOperand);
                    result.value = firstOperand;
                    operator = null;
                    shouldResetScreen = true;
                }
            }

            if (button.classList.contains('clear')) {
                result.value = '';
                currentNumber = '';
                firstOperand = null;
                operator = null;
                shouldResetScreen = false;
            }
        });
    });

    function calculate(a, operator, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                return b !== 0 ? a / b : 'Error';
            default:
                return b;
        }
    }
}); 