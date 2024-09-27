const olList = document.querySelector('#olListId');

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
        const response = await fetch('https://parseapi.back4app.com/classes/Tarefa', {
            method: "GET",
            headers: {
                "X-Parse-Application-Id": "AlAa6WeIMH4BOSUbQjRV4eQ5MtzzSMITSo05IP7S",
                "X-Parse-REST-API-Key": "apIcBBbOVEz8bx4LsimkB6A4tFd6OW0ukN7StPaE",
            }
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

window.onload = getTask