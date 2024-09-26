const inputBuscaIP = document.querySelector('#idBuscaIP');
const buttonBuscaIP = document.querySelector('#idButtonBuscaIP');
const textoBuscaIP = document.querySelector('#textoBuscaIp');

const buttonIPFetchClick = () => {
    const buscaIPValue = inputBuscaIP.value.trim();

    if(!buscaIPValue){
        alert('Preencha o campo');
        inputBuscaIP.focus();
        return 
    }else{
        fetch(`https://api.ipstack.com/${buscaIPValue}?access_key=9e85bb46f185abba73f30cd834c74f3a`)
        .then(response => {
            if (!response.ok){
                throw new Error('Erro ao obter os dados.');
            }
            return response.json();
        })
        .then(data => {
        if(data.success != false){
            textoBuscaIP.innerText = '';
            let objectData = [
                {nomeCampo : "Nome do continente:" , dados : data.continent_name},
                {nomeCampo : "Nome do país:" , dados : data.continent_name},
                {nomeCampo : "Nome do estado:" , dados : data.region_name},
                {nomeCampo : "Nome da cidade:" , dados : data.city},
                {nomeCampo : "Nome da capital:" , dados : data.location.capital},
                {nomeCampo : "Latitude:" , dados : data.latitude},
                {nomeCampo : "Longitude:" , dados : data.longitude}
            ];
            objectData.forEach((data) => {
                const listData = document.createElement('li');
                listData.innerText = `${data.nomeCampo} ${data.dados}`;
                textoBuscaIP.appendChild(listData);
            })
        }else{
            alert(`Erro ${data.error.code}, ${data.error.type}`);
            inputBuscaIP.focus();
        }})
        .catch((error) => {
            console.log(error)
        }) 
    }
}

buttonBuscaIP.onclick = buttonIPFetchClick;