import { evaluate } from 'https://cdn.jsdelivr.net/npm/mathjs@12.4.1/+esm';

/* Criamos um objeto para armazenar as funções, ao final do arquivo criamos uma variavel global com esse objeto. Aplicamos no HTML o atributo calculator.(sua função) */

/*
NOTA: Ideias para implementar futuramente:
- criar preview da expressão ✅
- criar um historico de contas com um button para abrir e fechar ✅
- melhoria de qualidade do código ✅
- keyboard event para digitar ✅
- criar um botão para limpar historico
- criar uma forma de guardar o historico no localStorage
- criar uma forma de recarregar a conta do historico no display
- temas dark e light
- copiar e colar
- atalhos de teclado ctr + c, ctr + v, ctr + h etc...
- responsividade mobile !IMPORTANTE ✅

*/

const calculator = {

    // melhoria de qualidade do código
    // nota: para evitar ficar procurando sem parar a mesma coisa, criamos uma variavel global

    display: null,
    soma: null,
    historic: null,
    viewHistoric: null,
    backdrop: null,

    // iniciamos os elementos do DOM antes de utilizar

    init() {
        this.display = document.querySelector('#display');
        this.soma = document.querySelector('#soma');
        this.historic = document.querySelector('#historic-calc');
        this.viewHistoric = document.querySelector('#view-historic');
        this.backdrop = document.querySelector('#backdrop');
    },


    insertToDisplay(value) {

        // inserimos o valor no display

        this.display.value += value;
        this.preview(); // chamamos nossa função para ver o preview da expressão
    },

    clearDisplay(){

        // limpamos o display e preview

        this.display.value = '';
        this.soma.innerHTML = '';
    },

    backspace(){

        // deletamos o ultimo elemento colocado utilizando slice
        this.display.value = this.display.value.slice(0, -1);

        /* slice vai remover o ultimo elemento sem mudar o valor da variavel */
        /* começando de 0 e retirando -1 */

        this.preview(); // chamamos nossa função para efetuar limpeza
    },

    result(){
        // criamos uma função para calcular

        const expression = this.display.value; // pegamos o valor do display

        // criamos validador de divisão por zero

        if (expression.includes('/0') || expression.includes('/ 0')){
            this.showError('Erro: Divisão por zero!');
            return;
        }

        // criamos validador de operação inválida ++ -- etc...
        if (/[+\-*/]{2,}/.test(expression)){ // criamos uma validador utilizando RegEx 
            this.showError('Erro: Operação inválida!');
            return;
        }

        // utilizamos um try catch para tratamentos de erros

        try {
            const result = evaluate(expression);
            this.display.value = result;
            this.soma.innerHTML = ''; // limpeza do preview quando mandamos calcular
            this.historic.innerHTML += `<p>${expression} = ${result}</p>`; // criamos um histórico de contas efetuadas
        } catch (e) {
            this.showError('Operação inválida!'); 
        }
    },

    // criamos uma funçao para exibir erros

    showError(message){
            this.display.value = message;
            setTimeout(() => {
                this.clearDisplay();
            }, 2000);
        },

    preview(){
        // criamos uma função para fazer o preview da expressão

        const expression = this.display.value;

        // caso não tenha nada no display vai ficar vazio

        if (!expression) {
            this.soma.innerHTML = '';
            return;
        }

        // criamos validador de divisão por zero para não dar infinit

        if (expression.includes('/0') || expression.includes('/ 0')){
            this.soma.innerHTML = '';
            return;
        }

        // criamos validador para não calcular enquanto não tiver um operador

        if (/[+\-*/]$/.test(expression)) {
            this.soma.innerHTML = '';
            return;
        }

        try {
            // mesmo esquema do result, porém estamos fazendo com que o preview seja dinâmico

            const result = evaluate(expression);
            this.soma.innerHTML = ` = ${result}`;
        } catch (e) {
            this.soma.innerHTML = '';
        }
    },

    // funçao para abrir e fechar o historico

    openHistoric(){
        this.backdrop.style.display = 'block';
        this.viewHistoric.style.display = 'block';
    },

    closeHistoric(){
        this.backdrop.style.display = 'none';
        this.viewHistoric.style.display = 'none';
    },

    keyBoard() {

        // criamos uma funçao para digitar com o teclado

        document.addEventListener('keydown', (e) => {
            const key = e.key;

            // colocamos para que apenas os numeros e os operadores sejam digitados

            if (key >= 0 && key <= 9){ // apenas numeros podem ser colocados
                this.insertToDisplay(key)
            } 
            
            else if (key == '+' || key == '-' || key == '*' || key == '/') { // definimos os operadores
                this.insertToDisplay(key)
            } 
            
            else if (key === 'Enter' || key === '=') { // definimos o enter para calcular
                e.preventDefault(); // tira efeito default do navegador para evitar algum comportamento inesperado
                this.result();
            } 
            
            else if (key === 'Escape' || key === 'Delete') { // definimos o escape para limpar tudo
                e.preventDefault(); // tira efeito default do navegador para evitar algum comportamento inesperado
                this.clearDisplay();
            } 
            
            else if (key === 'Backspace') { // para apagar apenas 1 tecla por vez
                e.preventDefault(); // tira efeito default do navegador para evitar algum comportamento inesperado
                this.backspace();
            } 
            
            else if (key === '.' || key === ',') { // definimos o ponto mesmo apertando virgula será aceito
                this.insertToDisplay('.');
            }

        })
    },

};

// Inicializa quando a página carregar
// NOTA: O DOMContentLoaded é um evento disparado quando o DOM for carregado

document.addEventListener('DOMContentLoaded', () => {
    calculator.init();
    calculator.keyBoard(); // chamamos nosso evento para que ele funcione
});
window.calculator = calculator;

