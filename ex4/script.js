let botao = document.querySelector('#buttonId');
let p = document.querySelector('#pId');

botao.addEventListener('click', () => {
    const cadastro = {
        matricula: document.querySelector('#matriculaId').value,
        nome: document.querySelector('#nomeId').value,
        cpf: document.querySelector('#cpfId').value,
        idade: document.querySelector('#idadeId').value
    }
    console.log(cadastro)
    
    p.innerHTMT = JSON.stringify(cadastro)
})