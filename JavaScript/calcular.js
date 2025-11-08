import { evaluate } from 'https://cdn.jsdelivr.net/npm/mathjs@12.4.1/+esm';

/* Criamos um objeto para armazenar as funções, ao final do arquivo criamos uma variavel global com esse objeto. Aplicamos no HTML o atributo calculator.(sua função) */

const calculator = {
    insertToDisplay(value) {
        // inserimos o valor no display
        document.querySelector('#display').value += value;
        this.preview(); // chamamos nossa função
    },

    clearDisplay(){
        // limpamos o display e preview
        document.querySelector('#display').value = '';
        document.querySelector('#soma').innerHTML = '';
    },

    backspace(){
        // deletamos o ultimo elemento colocado utilizando slice
        document.querySelector('#display').value = document.querySelector('#display').value.slice(0, -1);
        /* slice vai remover o ultimo elemento sem mudar o valor da variavel */
        /* começando de 0 e retirando -1 */
        this.preview(); // chamamos nossa função para efetuar limpeza
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

        // utilizamos um try catch para tratamentos de erros
        try {
            // utilizando
            const result = evaluate(expression);
            display.value = result;
            display.style.fontSize = '35px';
            document.querySelector('#soma').innerHTML = ''; // limpeza do preview quando mandamos calcular
        } catch (e) {
            display.value = 'Operação inválida!'; 
            setTimeout(() => {
                this.clearDisplay();
            }, 2000);
        }
    },

    preview(){
        // criamos uma funcao para fazer o preview
        const display = document.querySelector('#display');
        const preview = document.querySelector('#soma');
        const expression = display.value;

        // caso não tenha nada no display vai ficar vazio
        if (!expression) {
            preview.innerHTML = '';
            return;
        }

        // criamos validador de divisão por zero para não dar infinit
        if (expression.includes('/0') || expression.includes('/ 0')){
            preview.innerHTML = '';
            return;
        }

        // criamos validador para não calcular enquanto não tiver um operador
        if (/[+\-*/]$/.test(expression)) {
            preview.innerHTML = '';
            return;
        }

        try {
            // mesmo esquema do result, porém estamos fazendo com que o preview seja dinâmico
            const result = evaluate(expression);
            display.style.fontSize = '30px';
            preview.innerHTML = ` = ${result}`;
        } catch (e) {
            preview.innerHTML = '';
        }
    }
};

// criamos uma variavel global com o window
window.calculator = calculator;
