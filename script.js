function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    return num1 / num2;
}

function operate(operator,num1,num2) {
    let answer;
    if(operator === "+"){
        answer = add(num1,num2);
    }
    else if(operator === "-"){
        answer = subtract(num1,num2);
    }
    else if(operator === "*"){
        answer = multiply(num1,num2);
    }
    else if(operator === "/") {
        answer = divide(num1,num2);
    }
    return answer;
}

const fullOperation = document.querySelector('.fullOp');
const solutionField = document.querySelector('.answer');

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.getAttribute('id') === "num") {
            if(fullOperation.textContent.endsWith(" ")) {
                solutionField.textContent = button.getAttribute('class');
            }
            else {
                solutionField.textContent += button.getAttribute('class');
            }
        }

        if(button.getAttribute('id') === "operation") {
            if(solutionField.textContent !== "" && !fullOperation.textContent.endsWith(" ")) {
                fullOperation.textContent = solutionField.textContent;
                fullOperation.textContent += " " + button.getAttribute('class') + " ";
            }
        }

        if(button.getAttribute('class') === "clear") {
            solutionField.textContent = "";
            fullOperation.textContent = "";
        }

        if(button.getAttribute('class') === "delete") {
            solutionField.textContent = solutionField.textContent.slice(0,-1);
            fullOperation.textContent = fullOperation.textContent.slice(0,-1);
        }
    });
});