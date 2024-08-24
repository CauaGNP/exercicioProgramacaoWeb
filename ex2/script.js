let botaosubmit = document.querySelector('#botao');

botaosubmit.addEventListener( 'click', ()=>{
    let inputValor = document.querySelector('#numeroId');
    let inputsoma = document.querySelector('#somatorioId');

    let num = parseInt(inputValor.value)
    
    if (!isNaN(num)){
        inputsoma.value = Number(inputValor.value) + Number(inputsoma.value);
    }
    else{
        alert("Digite um número inteiro!");
        inputValor.focus();
        inputValor = " ";
    }
})
