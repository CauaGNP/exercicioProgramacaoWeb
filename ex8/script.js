const idInput = document.querySelector('#idInput');
const buttonId = document.querySelector('#buttonId');
const textPre = document.querySelector('#textPre');

buttonId.onclick = buttonIdFetchClick;

async function fetcha(){
    const inputValue = String(idInput.value)
    const fetchURL = `https://swapi.dev/api/people/${inputValue}`
    const fetch_ = await fetch(fetchURL)
    .then((resposta) => {
        console.log(resposta)
    });

    const awaitJSON = await fetch_.json()
    console.log(awaitJSON)
}

function buttonIdFetchClick(){
    fetcha()
}
// free rest api