let pre = document.querySelector('#pId');

let matricula = document.querySelector('#matriculaId');
let nome = document.querySelector('#nomeId');
let cpf = document.querySelector('#cpfId');
let idade = document.querySelector('#idadeId');

function buttonAdd(){
    
    let idadeValor = Number(idade.value);

    if (matricula.value === ''){
        alert('Matricula não preenchida')
        matricula.focus()
    }else if(nome.value === ''){
        alert('Nome não preenchido')
        nome.focus()
    }else if(cpf.value === ''){
        alert('CPF não preenchido')
        cpf.focus()
    }else if(idade.value === '' || isNaN(idadeValor)){
        alert('Idade não preenchida ou letras')
        idade.focus()
    }else if (!Number.isInteger(idadeValor)) {
        alert('A idade deve ser um número inteiro.');
        idade.focus()
    }else{
        const cadastro = {
            matricula: matricula.value,
            nome: nome.value,
            cpf: cpf.value,
            idade:idade.value
        }
        console.log(cadastro)
        pre.innerHTML += JSON.stringify(cadastro) + '<br>';
    }
}

function buttonClear(){
    matricula.value = '';
    nome.value = '';
    cpf.value = '';
    idade.value = '';
    matricula.focus();

    pre.innerHTML = ''
}