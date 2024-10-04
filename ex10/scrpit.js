let buttonSubmit = document.querySelector('#buttonEnviarDespesas');
let inputDespesas = document.querySelector('#inputDespesa');
let inputValorDespesas = document.querySelector('#inputvalorGastoDespesa');
let olList = document.querySelector('#list')

const headers = {
    "X-Parse-Application-Id": "Ph6uxRL3eforH6wBiUwqYeFCrcoxiR0pJKSDxGeU",
    "X-Parse-REST-API-Key": "2K8jzpSHks2j5r7e7UtfCrt1HAnqxIdCXWMErSEb"
};
const headersJson = {
    ...headers,
    "Content-Type" : "application/json"
};

const url = 'https://parseapi.back4app.com/classes/Despesas';

buttonSubmit.addEventListener('click', async () =>{

})

const getTask = async () =>{
    try {
        const response = await fetch( url, {
            method: 'GET',
            headers
        });
        if(!response.ok){
            alert(`Erro no servidor ${response.status}`)
            throw new Error(`Erro no servidor ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        displayTask(data)
    } catch (error) {
        alert(`Erro no servidor ${error}`)
    }
}

const displayTask = async (data) => {
    olList.innerText = ' ';
    const resultado = data.results;
    resultado.forEach( (result) => {
        // Adicionar o R$ usando o toLocateString()
        const text = document.createTextNode(`${result.nome_despesas} = ${result.valor}`)
        let list = document.createElement('li');
        list.appendChild(text);
        olList.appendChild(list)
    });
}

window.onload = getTask