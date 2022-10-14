var isLog = true;
var highlightedButton;
var operand1;
var operator;

var acButton = document.querySelector('.btn.ac');
var invertButton = document.querySelector('.btn.plus-minus');
var percentButton = document.querySelector('.btn.percent');
var digitButtons = document.querySelectorAll('.btn-digit');
var operatorButtons = document.querySelectorAll('.btn-operator');
var equalButton = document.querySelector('.btn.equal');
var screen = document.querySelector('#calc-screen p');

var buttons = document.getElementById('buttons');
var calc = document.getElementById('calc');
var body = document.querySelector('body');

function log(message) {
    if (isLog) {
        console.log(message);
    }
}

function calcFontSize(textLength) {
    var fontSize = Math.round((350 * 1) / textLength);
    return fontSize;
}

function updateScreenStyle() {
    if (screen.textContent.length > 7) {
        var fontSize = calcFontSize(screen.textContent.length);
        screen.style = 'font-size: ' + fontSize + 'px';
    } else {
        screen.style = 'font-size: 55px';
    }
}

function resetOperatorButton() {
    if (highlightedButton) {
        highlightedButton.classList.remove('highlight');
        highlightedButton = undefined;
    }
}

function setScreenContent(newValue) {
    screen.textContent = newValue;
    updateScreenStyle();
}

function calcResult() {
    if (operand1 != undefined && operator != undefined) {
        var operand1Number = Number(operand1.replace(',', '.'));
        var operand2Number = Number(screen.textContent.replace(',', '.'));
        var result = 0;

        switch (operator) {
            case '+':
                result = operand1Number + operand2Number;
                break;
            case '-':
                result = operand1Number - operand2Number;
                break;
            case '×':
                result = operand1Number * operand2Number;
                break;
            case '/':
                result = operand1Number / operand2Number;
                break;
        }

        setScreenContent(String(result).replace('.', ','));
    }
}

for (var digitButton of digitButtons) {
    digitButton.onclick = function () {
        handleDigit(this.innerHTML);
    };
}

for (var operatorButton of operatorButtons) {
    operatorButton.onclick = function () {
        handleOperator(this);
    };
}

acButton.onclick = function () {
    handleAcButton(this);
};

invertButton.onclick = function () {
    handleInvertButton(this);
};

equalButton.onclick = function () {
    handleEqualButton(this);
};

percentButton.onclick = function () {
    handlePercentButton(this);
};

function handleDigit(digit) {
    if (digit == ',') {
        if (screen.textContent == '0' || highlightedButton) {
            setScreenContent('0,');
        } else {
            var dotNotFound = screen.textContent.indexOf(',') == -1;

            if (dotNotFound) {
                setScreenContent(screen.textContent + ',');
            }
        }
    } else {
        if (screen.textContent == '0' || highlightedButton) {
            setScreenContent(digit);
        } else {
            setScreenContent(screen.textContent + digit);
        }
    }

    resetOperatorButton();
}

function handleOperator(operatorButton) {
    if (!highlightedButton) {
        calcResult();
    }

    resetOperatorButton();

    operatorButton.classList.add('highlight');
    highlightedButton = operatorButton;

    operator = operatorButton.innerHTML;

    operand1 = screen.textContent;
}

function handleAcButton() {
    setScreenContent('0');
    operand1 = undefined;

    resetOperatorButton();
    operator = undefined;
}

function handleInvertButton() {
    if (screen.textContent != '0') {
        var minusNotFound = screen.textContent.indexOf('-') == -1;

        if (minusNotFound) {
            setScreenContent('-' + screen.textContent);
        } else {
            setScreenContent(screen.textContent.substring(1));
        }
    }
}

function handleEqualButton() {
    calcResult();
    resetOperatorButton();
    operator = undefined;
}

function handlePercentButton() {
    var textContentNumber = Number(screen.textContent.replace(',', '.'));

    var result = textContentNumber / 100;

    setScreenContent(String(result).replace('.', ','));
}

body.onkeyup = function (event) {
    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case ',':
            handleDigit(event.key);
            break;
        case '.':
            handleDigit(',');
            break;
        case '+':
            handleOperator(document.querySelector('.btn.plus'));
            break;
        case '-':
            handleOperator(document.querySelector('.btn.minus'));
            break;
        case '/':
            handleOperator(document.querySelector('.btn.division'));
            break;
        case '*':
            handleOperator(document.querySelector('.btn.multiply'));
            break;
        case '!':
            handleInvertButton();
            break;
        case 'Escape':
            handleAcButton();
            break;
        case '=':
        case 'Enter':
            handleEqualButton();
            break;
        case '%':
            handlePercentButton();
            break;
    }
};
