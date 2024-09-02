let botao = document.querySelector('#buttonSortear');
let span = document.querySelector('#valueSpan');

botao.addEventListener('click', () => {

    let menorValor = parseInt(document.querySelector('#menorValor').value);
    let maiorValor = parseInt(document.querySelector('#maiorValor').value);

    let numeroAleatorio = Math.floor(Math.random() * (maiorValor - menorValor + 1)) + menorValor;
    let numero = numeroAleatorio
    span.innerHTML = numero;
    console.log(numero)
});

let botaoLoop = document.querySelector('#buttonSortearLoop');
let spanLoop = document.querySelector('#valueSpanLoop')

botaoLoop.addEventListener('click', () => {
    let menorLoop = parseInt(document.querySelector('#menorValorLoop').value);
    let maiorLoop = parseInt(document.querySelector('#maiorValorLoop').value);
    let quanNumLoop = parseInt(document.querySelector('#QuanNumSortId').value);

    let resultado = '';

    for(let x = 0; x < quanNumLoop; x++){

        let numeroAleatorio = Math.floor(Math.random() * (maiorLoop - menorLoop + 1)) + menorLoop;
        resultado += numeroAleatorio + ' ';
        console.log(resultado)
    }
    spanLoop.innerHTML = resultado
})
