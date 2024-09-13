
function clicar(){
    let inputT = document.querySelector('#inputText').value.toUpperCase();
    let divSeparador = document.querySelector('#separador');
    let array = inputT.split('');

    for (let i = 0; i < array.length; i++){

        let p = document.createElement('p');
        p.classList.add('separador');
  
        p.textContent = array[i];
        divSeparador.appendChild(p);    
    }
}

