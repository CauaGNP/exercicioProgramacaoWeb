let buttonAddTask = document.querySelector('#addTask');
let inputAddTask = document.querySelector('#inputTask');

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

// Exibindo as tarefas 
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
        checkBox.onchange = () => checkBoxCLick(checkBox, result)
        list.appendChild(checkBox);
        const buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'x';
        buttonDelete.onclick = () => buttonDeleteTask(button, result)
        list.appendChild(buttonDelete);
        olList.appendChild(list);
    });
}

const checkBoxCLick = async (checkbox, result) => {
    try {
        checkbox.dissabled = false;
        const response = await fetch(`${url}/${result.objectId}`, {
            method: 'PUT',
            headers: headersJson,
            body: JSON.stringify({concluida : !result.concluida})
        })
        checkbox.dissabled = true;
        if(!response.ok){
            checkbox.checked = !checkbox.checked;
            alert("Erro ao acessar o servidor: " + response.status);
            throw new Error("Erro encontrado: " + response.status);
        }
        console.log(response)
    } catch (error) {
        checkbox.checked = !checkbox.checked;
        console.log(error);
    }
}


// Obtendo as tarefas do banco de dados 
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

// Adicionando tarefas para o banco de dados
buttonAddTask.addEventListener('click', async () => {;
    let inputAddTaskValue = inputAddTask.value.trim();
    if(inputAddTaskValue == ''){
        alert('Insira uma nova tarefa para prosseguir');
        inputAddTask.focus();
        return;
    }
    try {
        // responseAddTask == response
        const responseAddTask = await fetch(url ,{
            method: "POST",
            headers: headersJson,
            body : JSON.stringify({descricao : inputAddTaskValue})
        })
        console.log(responseAddTask)
        if(!responseAddTask.ok){
            alert(`Erro ao acessar o servidor${responseAddTask.status}`);
            throw new Error(`Erro ao acessar o servidor${responseAddTask.status}`);
        }
        inputAddTask.value = ''
        inputAddTask.focus()
        getTask()
    } catch (error) {
        console.log(error)
    }
})


window.onload = getTask