function isDNF(expression) {
    const subExpressions = expression.split(' OR ');
    const variables = {};
    const negatedVariables = new Set();
    for (let i = 0; i < subExpressions.length; i++) {
        const subExpression = subExpressions[i];
        const subVariables = new Set();
        const subNegatedVariables = new Set();
        const terms = subExpression.split(' AND ');
        for (let j = 0; j < terms.length; j++) {
            const term = terms[j].trim();
            if (!isValidVariable(term)) {
                // Если терм не соответствует шаблону "A" или "NOT A"
                return false;
            }
            const negated = term.startsWith('NOT ');
            const variable = negated ? term.slice(4) : term;
            if (variables[variable] > 0) {
                // Проверяем, что каждая переменная входит только в одну конъюнкцию Ai
                return false;
            }
            variables[variable] = (variables[variable] || 0) + 1;
            if (negated) {
                negatedVariables.add(variable);
                subNegatedVariables.add(variable);
            } else {
                subVariables.add(variable);
            }
        }
        // Проверяем, что каждая конъюнкция Ai включает каждую переменную или ее отрицание, причем каждая переменная может быть включена только один раз
        if (subVariables.size + subNegatedVariables.size > Object.keys(variables).length) {
            return false;
        }
    }
    return true;
}


function isValidVariable(variable) {
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
    

    return true;
}

function isLetter(character) {
    return (character >= 'A' && character <= 'Z');
}

function isLetterOrDigit(character) {
    return isLetter(character) || (character >= '0' && character <= '9');
}

const expression2 = 'NOT A AND B OR A AND D'; // не является ДНФ
console.log(isDNF(expression2))



const expression1 = 'A AND B OR NOT C AND D'; // не является ДНФ
//console.log(isDNF(expression1))
