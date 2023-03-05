function isDNF(expression) {
    // Разбиваем выражение на конъюнкции Ai
    const subExpressions = expression.split(' OR ');

    // Объект для хранения количества вхождений каждой переменной в конъюнкции
    const variables = {};

    // Проходимся по каждой конъюнкции
    for (let i = 0; i < subExpressions.length; i++) {
        const subExpression = subExpressions[i];

        // Разбиваем конъюнкцию на литералы
        const literals = subExpression.split(' AND ');

        // Проверяем, что каждый терм является конъюнкцией литералов
        if (literals.length < 2) {
            return false;
        }

        // Проходимся по каждому литералу
        for (let j = 0; j < literals.length; j++) {
            const literal = literals[j];

            // Проверяем, что литерал соответствует шаблону "A" или "NOT A"
            if (!isValidVariable(literal)) {
                return false;
            }

            // Определяем, является ли литерал отрицанием переменной
            const negated = literal.startsWith('NOT ');

            // Получаем имя переменной
            const variable = negated ? literal.substr(4) : literal;

            // Увеличиваем количество вхождений переменной в объекте variables
            variables[variable] = (variables[variable] || 0) + 1;
        }
    }

    // Проверяем, что каждая переменная входит только в одну конъюнкцию
    for (const variable in variables) {
        if (variables[variable] > 1) {
            return false;
        }
    }

    // Если все проверки прошли успешно, то выражение является ДНФ
    return true;
}


function isValidVariable(variable) {
    if (variable.length === 1) {
        // Проверяем, что переменная не пуста
        if (variable.length === 0) {
            return false;
        }

        // Проверяем, что переменная начинается с буквы
        if (!isLetter(variable[0])) {
            return false;
        }

        // Проверяем, что все символы переменной являются буквами или цифрами
        for (let i = 1; i < variable.length; i++) {
            if (!isLetterOrDigit(variable[i])) {
                return false;
            }
        }
    }

    return true;
}

function isLetter(character) {
    return (character >= 'A' && character <= 'Z');
}

function isLetterOrDigit(character) {
    return isLetter(character) || (character >= '0' && character <= '9');
}

function containsNegationAndValue(arr) {
    const values = new Set();
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (value.startsWith('NOT ')) {
            if (values.has(value.slice(4))) {
                return false;
            }
        } else {
            if (values.has('NOT ' + value)) {
                return false;
            }
        }
        values.add(value);
    }
    return true;
}
//
// const arr1 = ['A', 'NOT A'];
// const arr2 = ['A', 'B', 'C', 'NOT D'];
// console.log(containsNegationAndValue(arr1)); // false
// console.log(containsNegationAndValue(arr2)); // true
//
// const expression2 = 'A AND NOT A OR B AND C'; // не является ДНФ
// console.log(isDNF(expression2))
//
//
//
// console.log(isDNF('(A AND B) OR C')); // false
// console.log(isDNF('A AND B OR C OR D AND E')); // true
// console.log(isDNF('NOT A AND NOT B AND NOT C')); // true
// console.log(isDNF('A AND B AND C AND D OR E AND F AND G AND H OR I AND J AND K AND L')); // true
// console.log(isDNF('A OR NOT A AND C')); // false
// console.log(isDNF('A AND NOT A OR B')); // false
// console.log(isDNF('NOT A OR B OR C')); // false
console.log(isDNF('(A OR B) AND (C OR D) AND (E OR F OR NOT G)'))