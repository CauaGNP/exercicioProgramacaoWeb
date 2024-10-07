const inputBuscaSimbolo = document.querySelector("#idBuscaSimbolo");
const buttonBuscaSimbolo = document.querySelector("#idButtonBuscaSimbolos");
const textoBuscaSimbolo = document.querySelector("#textoBuscaSimbolo");

const buttonSimboloFetchClick = () => {
  const buscaSimbolosValue = inputBuscaSimbolo.value.trim().toUpperCase();

  if (buscaSimbolosValue == "") {
    alert("Preencha o campo");
    inputBuscaSimbolo.focus();
    return;
  }

  fetch(
    `https://data.fixer.io/api/latest?access_key=f6190df64b4bca0771a657225c053101&symbols=${buscaSimbolosValue}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter os dados.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success != false) {
        textoBuscaSimbolo.innerText = "";
        let objectData = [
          { nomeCampo: "Base da conversão:", dados: data.base },
          { nomeCampo: "Conversão de ", dados: Object.entries(data.rates) },
        ];
        objectData.forEach((data) => {
          const listData = document.createElement("li");
          listData.innerText = `${data.nomeCampo} ${data.dados}`;
          textoBuscaSimbolo.appendChild(listData);
        });
      } else {
        alert(`Erro ${data.error.code}, ${data.error.type}`);
        inputBuscaSimbolo.focus();
      }
    });
};
buttonBuscaSimbolo.onclick = buttonSimboloFetchClick;