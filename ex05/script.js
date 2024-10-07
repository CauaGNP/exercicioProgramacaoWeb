let array = [];
let soma = 0;

let preArray = document.querySelector('#preArray');
let preMedia = document.querySelector('#preMedia');

function buttonAdd(){
    let inputNum = document.querySelector('#numberId');

    array.push(Number(inputNum.value));
    console.log(`Array ${array}`)
    soma = array.reduce((vAcumulado, vAtual) => vAcumulado + vAtual, 0);
    console.log(soma)

    media = soma / array.length;
    console.log(media)

    preArray.innerHTML = array
    preMedia.innerHTML = media
}