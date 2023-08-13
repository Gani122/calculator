function add(num1,num2) {
    num1 = +num1;
    num2 = +num2;
    return num1 + num2;
}

function subtract(num1,num2) {
    num1 = +num1;
    num2 = +num2;
    return num1 - num2;
}

function multiply(num1,num2) {
    num1 = +num1;
    num2 = +num2;
    return num1 * num2;
}

function divide(num1,num2) {
    num1 = +num1;
    num2 = +num2;
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

    if(Number.isFinite(answer))
    {
        let n = +answer.toString().length;
        let limit = n - (Math.round(+answer).toString().length + 7);
        if (limit < 0) {
            limit = 0;
        }
        if(n > 12) {
            return +answer.toFixed(limit);
        }
        else {
            return +answer.toFixed(7);
        }
    }
    else {
        return "Can't do it"
    }
}



const fullDisplay = document.querySelector('.fullOp');
const solutionField = document.querySelector('.answer');

let allowMore = false;
let operation;
let answer;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.getAttribute('id') === "num") {
            if(allowMore === false) {
                solutionField.textContent = button.getAttribute('class');
                allowMore = true;
            }
            else if(solutionField.textContent.length < 10) {
                solutionField.textContent += button.getAttribute('class');
            }
        }

        if(button.getAttribute('class') === 'decimal') {
                if(solutionField.textContent === "" || allowMore === false){
                    solutionField.textContent = 0 + '.';
                    allowMore = true;
                }
                else if(!solutionField.textContent.includes(".")) {
                solutionField.textContent += '.';
                allowMore = true;
                }
        }

        if(button.getAttribute('id') === "operator") {
            if(solutionField.textContent !== "" && allowMore && fullDisplay.textContent === "") {
                fullDisplay.textContent += solutionField.textContent + " " + button.getAttribute('class') + " ";
                allowMore = false;
            }
            
            if(fullDisplay.textContent.endsWith("=")) {
                fullDisplay.textContent = solutionField.textContent + " " + button.getAttribute('class') + " ";
                allowMore = false;
                answer = 0;
            }

            if(fullDisplay.textContent.endsWith(" ")) {
                if(allowMore === false){
                    fullDisplay.textContent = fullDisplay.textContent.slice(0, -2) + button.getAttribute('class') + " ";
                }
                else {
                    operation = fullDisplay.textContent.split(" ");
                    answer = operate(operation[0],operation[1],solutionField.textContent);
                    solutionField.textContent = answer;
                    fullDisplay.textContent = answer + " " + button.getAttribute('class') + " ";
                    allowMore = false;
                }
            }
        }

        if(button.getAttribute('class') === '=' 
        && allowMore 
        && fullDisplay.textContent !== ""
        && !fullDisplay.textContent.includes("=")) {
            fullDisplay.textContent += solutionField.textContent;
            operation = fullDisplay.textContent.split(" ");
            answer = operate(operation[0],operation[1],operation[2]);
            fullDisplay.textContent += " =";
            solutionField.textContent = answer;
            allowMore = false;
        }

        if(button.getAttribute('class') === "clear") {
            solutionField.textContent = "0";
            fullDisplay.textContent = "";
            allowMore = false;
        }

        if(button.getAttribute('class') === "delete") {
            solutionField.textContent = solutionField.textContent.slice(0,-1);
        }
    });
});