const inputBuscaSimbolo = document.querySelector('#idBuscaSimbolo');
const buttonBuscaSimbolo = document.querySelector('#idButtonBuscaSimbolos');
const textoBuscaSimbolo = document.querySelector('#textoBuscaSimbolo');

const buttonSimboloFetchClick = () => {
    const buscaSimbolosValue = inputBuscaSimbolo.value.trim().toUpperCase();

    fetch(`https://data.fixer.io/api/latest?access_key=f6190df64b4bca0771a657225c053101&symbols=${buscaSimbolosValue}`)
    .then(response => response.json())
    .then((data) => {
       textoBuscaSimbolo.innerText = JSON.stringify(data)
    })
}

buttonBuscaSimbolo.onclick = buttonSimboloFetchClick;