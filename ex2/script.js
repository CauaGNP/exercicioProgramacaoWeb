let quantClickNum = 0;
let inputValor = document.querySelector('#numeroId');
let inputsoma = document.querySelector('#somatorioId');
let inputQuanClick = document.querySelector('#quaClick');
let inputMedia = document.querySelector('#mediaId');

function buttonAdd(){
 
    let num = parseInt(inputValor.value)
    
    if (!isNaN(num)){
        inputsoma.value = Number(inputValor.value) + Number(inputsoma.value);
        // Introduz o numeros de clicks 
        quantClickNum ++;
        inputQuanClick.value = quantClickNum;
        // Introduz a media
        
        inputMedia.value = Number(inputsoma.value / quantClickNum)
        console.log(inputMedia.value)
    }
    else{
        alert("Digite um número inteiro!");
        inputValor.focus();
        inputValor = " ";
    }
}

function buttonClear(){
    inputValor.value = 0;
    inputsoma.value = 0;
    inputMedia.value = 0;
    inputQuanClick.value = 0;
}
