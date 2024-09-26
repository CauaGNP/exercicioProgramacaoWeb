const inputBuscaDados = document.querySelector('#idBuscaDados');
const buttonBuscaDados = document.querySelector('#idButtonBuscaDados');
const textoBuscaDados = document.querySelector('#textoBuscaDados');

const buttonDadosFetchClick = () => {
    const buscaDadosValue = inputBuscaDados.value.trim();

    if(buscaDadosValue == ''){
        alert('Preencha o campo');
        inputBuscaDados.focus();
        return 
    }

    fetch(`https://api.weatherstack.com/current?access_key=003983a79486b39217ab23785884b952&query=${buscaDadosValue}`)
    .then(response => {
        if (!response.ok){
            throw new Error('Erro ao obter os dados.');
        }
        return response.json();
    })
    .then((data) => {
        if(data.success != false){
            textoBuscaDados.innerText = '';
            let objectData = [
                {nomeCampo : "Nome da localização:" , dados: data.location.name},
                {nomeCampo : "Nome do país:" , dados: data.location.country},
                {nomeCampo : "Nome da região:" , dados: data.location.region},
                {nomeCampo : "Hora do local:" , dados: data.current.observation_time},
                {nomeCampo : "Temperatura Local:" , dados :  data.current.temperature}
            ];
            objectData.forEach((data) =>{
                const listData = document.createElement('li');
                listData.innerText = `${data.nomeCampo} ${data.dados}`;
                textoBuscaDados.appendChild(listData);
            })
            
        }else{
            alert(`Erro ${data.error.code}, ${data.error.type}`);
            inputBuscaDados.focus();
        }
    })
}

buttonBuscaDados.onclick = buttonDadosFetchClick;