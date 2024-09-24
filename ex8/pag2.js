const inputBuscaDados = document.querySelector('#idBuscaDados');
const buttonBuscaDados = document.querySelector('#idButtonBuscaDados');
const textoBuscaDados = document.querySelector('#textoBuscaDados');

const buttonDadosFetchClick = () => {
    const buscaDadosValue = inputBuscaDados.value.trim();

    fetch(`https://api.weatherstack.com/current?access_key=003983a79486b39217ab23785884b952&query=${buscaDadosValue}`)
    .then(response => response.json())
    .then((data) => {
        textoBuscaDados.innerText = JSON.stringify(data)
    })
}

buttonBuscaDados.onclick = buttonDadosFetchClick;