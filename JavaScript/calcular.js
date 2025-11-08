import { evaluate } from 'https://cdn.jsdelivr.net/npm/mathjs@12.4.1/+esm';

/* Criamos um objeto para armazenar as funções, ao final do arquivo criamos uma variavel global com esse objeto. Aplicamos no HTML o atributo calculator.(sua função) */

const calculator = {
    insertToDisplay(value) {
        // inserimos o valor no display
        document.querySelector('#display').value += value;
    },

    clearDisplay(){
        // limpamos o display
        document.querySelector('#display').value = '';
    },

    backspace(){
        // deletamos o ultimo elemento colocado utilizando slice
        document.querySelector('#display').value = document.querySelector('#display').value.slice(0, -1);
        /* slice vai remover o ultimo elemento sem mudar o valor da variavel */
        /* começando de 0 e retirando -1 */
    },

    result(){
        // criamos uma função para calcular
        const display = document.querySelector('#display'); // pegamos o display
        const expression = display.value; // pegamos o valor do display

        // criamos validador de divisão por zero
        if (expression.includes('/0') || expression.includes('/ 0')){
            display.value = 'Erro: Divisão por zero!';
            setTimeout(() => {
                this.clearDisplay();
            }, 2000);
            return;
        }

        // criamos validador de operação inválida ++ -- etc...
        if (/[+\-*/]{2,}/.test(expression)){ // criamos uma validador utilizando RegEx 
            display.value = 'Erro: Operação inválida!';
            setTimeout(() => {
                this.clearDisplay();
            }, 2000);
            return;
        }

        // utilizamos um try catch para tratar erros de operação
        try {
            const result = evaluate(expression);
            display.value = result;
        } catch (e) {
            display.value = 'Operação inválida!'; 
            setTimeout(() => {
                this.clearDisplay();
            }, 2000);
        }
    },
};

// criamos uma variavel global com o window
window.calculator = calculator;
