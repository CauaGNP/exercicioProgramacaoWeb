let buttonAddTask = document.querySelector('#addTask');
let inputGetTask = document.querySelector('#inputTask');

const olList = document.querySelector('#olListId');
const headers = {
    "X-Parse-Application-Id": "AlAa6WeIMH4BOSUbQjRV4eQ5MtzzSMITSo05IP7S",
    "X-Parse-REST-API-Key": "apIcBBbOVEz8bx4LsimkB6A4tFd6OW0ukN7StPaE"
};
const headersJson = {
    ...headers,
    "Content-Type" : "application/json"
};
const url = "https://parseapi.back4app.com/classes/Tarefa";


const displayTask = (data) => {
    olList.innerHTML = '';
    const resultado = data.results;

    resultado.forEach((result) => {
        const text = document.createTextNode(`${result.descricao}`)
        const list = document.createElement('li');
        list.appendChild(text);
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = result.concluida;
        checkBox.disabled = true;
        list.appendChild(checkBox);
        olList.appendChild(list);
    });
}

const getTask = async () =>{
   try {
        const response = await fetch(url , {
            method: "GET",
            headers: headersJson
        })
        if(!response.ok){
            alert(`Erro causado pelo acesso ao servidor ${response.status}`);
            throw new Error(`Erro encontrado ${response.status}`);
        }
        const data = await response.json();
        displayTask(data)
    } catch (error) {
        console.log(error);
    }
}

buttonAddTask.addEventListener('click', async () => {;
    let inputAddTaskValue = inputGetTask.value.trim();

    if(inputAddTaskValue == ''){
        alert('Insira uma nova tarefa');
        inputGetTask.focus();
    }
    
    try {
        const responseAddTask = await fetch(url ,{
            method: "POST",
            headers: headersJson,
        }
                 
        )
    } catch (error) {
        console.log(error)
    }
})

window.onload = getTask