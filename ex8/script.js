const inputBuscaIP = document.querySelector('#idBuscaIP');
const buttonBuscaIP = document.querySelector('#idButtonBuscaIP');
const textoBuscaIP = document.querySelector('#textoBuscaIp');

const buttonIPFetchClick = () => {
    const buscaIPValue = inputBuscaIP.value.trim();

    if(!buscaIPValue){
        alert('Input não preenchido');
        inputBuscaIP.focus()
    }else{
        fetch(`https://api.ipstack.com/${buscaIPValue}?access_key=9e85bb46f185abba73f30cd834c74f3a`)
        .then( response => response.json())
        .then(data => {
        if(data.success != false){
            console.log(data)
            textoBuscaIP.innerText = JSON.stringify(data)
        }else{
            alert(`Erro ${data.error.code}, ${data.error.type}`)
        }})
        .catch((error) => {
            console.log(error)
        }) 
    }
}

buttonBuscaIP.onclick = buttonIPFetchClick;