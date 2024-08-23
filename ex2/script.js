let botaoSubmit = document.getElementById("botao");

botaoSubmit.addEventListener('click', ()=>{
    let inputValor = document.getElementById("numeroId");
    let inputSomatorio = document.getElementById("somatorioId");

    if(inputValor == ''){
        alert("Digite um número inteiro")
    }
    else{
        inputSomatorio.value = Number(inputValor.value) + Number(inputSomatorio.value);
    }

})