function add(num1,num2=0) {
    return +num1 + +num2;
}

function subtract(num1,num2=0) {
    return num1 - num2;
}

function multiply(num1,num2=1) {
    return num1 * num2;
}

function divide(num1,num2=1) {
    return num1 / num2;
}

function operate(num1,operator,num2) {
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



const fullDisplay = document.querySelector('.fullOp');
const solutionField = document.querySelector('.answer');

let allowMore = true;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.getAttribute('id') === "num") {
            if(allowMore === false) {
                solutionField.textContent = button.getAttribute('class');
                allowMore = true;
            }
            else {
                solutionField.textContent += button.getAttribute('class');
            }
        }

        if(button.getAttribute('id') === "operator") {
            if(solutionField.textContent !== "" && allowMore === true) {
                fullDisplay.textContent += solutionField.textContent;
                fullDisplay.textContent += " " + button.getAttribute('class') + " ";
                allowMore = false;
            }
            else if(fullDisplay.textContent.endsWith("=")) {
                fullDisplay.textContent = solutionField.textContent + " " + button.getAttribute('class') + " ";
                allowMore = false;
            }
        }

        if(button.getAttribute('class') === '=' && allowMore && fullDisplay.textContent !== "") {
            fullDisplay.textContent += solutionField.textContent;
            let operation = fullDisplay.textContent.split(" ");
            let answer = operate(operation[0],operation[1],operation[2]);
            fullDisplay.textContent += " =";
            solutionField.textContent = answer;
            allowMore = false;
        }


        if(button.getAttribute('class') === "clear") {
            solutionField.textContent = "";
            fullDisplay.textContent = "";
        }

        if(button.getAttribute('class') === "delete") {
            solutionField.textContent = solutionField.textContent.slice(0,-1);
        }
    });
});