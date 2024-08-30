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
