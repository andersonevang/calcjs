const display = document.getElementById('display');
const botoes = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
const decimal = document.querySelector('#decimal');

let novoNumero = true;
let operador;
let numeroAnterior;
let decimalUsado = false; 

function atualizarDisplay(numero){
    if(novoNumero){
        display.textContent = numero; 
        display.textContent = display.textContent.replace('.', ',');
        novoNumero = false;
    }
    else display.textContent += numero;
}

const inserirNumero = (event) => {
    atualizarDisplay(event.target.textContent);
}

botoes.forEach((button) => button.addEventListener('click', inserirNumero));

const selecionaOperador = () => {
    novoNumero = true; 
    decimalUsado = false; 
    operador = event.target.textContent;
    numeroAnterior = display.textContent.replace(',', '.');
}

operadores.forEach((operador) => operador.addEventListener('click', selecionaOperador));

const calcular = () => {
    const numeroAtual = display.textContent.replace(',', '.');
    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    console.log(numeroAnterior);
    console.log(numeroAtual);
    console.log(resultado);
    novoNumero = true;
    decimalUsado = false;
    atualizarDisplay(resultado);
}

const igual = document.querySelector('#igual');

igual.addEventListener('click', calcular);

const limparDisplay = () => {
    display.textContent = "";
    decimalUsado = false;
}

document.querySelector("#limparDisplay").addEventListener('click', limparDisplay);

const limparCalc = () => {
    limparDisplay();
    novoNumero = true;
    operador = undefined;
    numeroAnterior = undefined;
    console.log(decimalUsado);
};

document.querySelector("#limparCalculo").addEventListener('click', limparCalc); 

const removeUltimoNumero = () => { 
    display.textContent = display.textContent.slice(0,-1);
    if(display.textContent == ""){
        novoNumero = true;
        decimalUsado = false;
    }
}

document.querySelector("#backspace").addEventListener('click', removeUltimoNumero);

const inverteSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}; 

document.querySelector("#inverter").addEventListener('click', inverteSinal);

const trataDecimal = () => {
    if(!decimalUsado){
        if(novoNumero) {
            display.textContent = "0";
            novoNumero = false;
        } 
        display.textContent = display.textContent.concat(decimal.textContent);
        decimalUsado = true;
    }
}

document.querySelector("#decimal").addEventListener('click', trataDecimal);