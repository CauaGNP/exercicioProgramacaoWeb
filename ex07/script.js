const palavras = [
    "abacaxi", "anel", "amigo", "ave", "abacate",
    "bola", "bala", "banho", "bau", "banco",
    "casa", "cachorro", "carro", "cafe", "cama",
    "dado", "dedo", "doce", "dia", "dente",
    "elefante", "estrela", "escola", "elo", "escada",
    "faca", "festa", "fogo", "foca", "fada",
    "gato", "galo", "gelo", "goma", "ganso",
    "helicoptero", "hipopotamo", "hotel", "harpa", "horta",
    "ilha", "iglu", "iris", "indio", "ima", 
    "janela", "jarra", "jogo", "jumento", "joaninha",
    "ketchup", "kiwi", "karate", "koala", "kamikaze",
    "leao", "lago", "lua", "lima", "livro",
    "maca", "mala", "muro", "mapa", "mesa",
    "neve", "ninho", "navio", "nuvem", "nota",
    "olho", "ovo", "onda", "ouro", "orelha",
    "pato", "peixe", "pipoca", "pato", "perna",
    "quilo", "quadro", "queijo", "quina", "queda",
    "raio", "rosa", "rede", "rato", "roupa",
    "seboso", "sapo", "seda", "sabao", "sapato",
    "tigre", "touro", "teto", "tela", "tesoura",
    "uva", "urso", "urna", "uniao", "umidade",
    "vaca", "verao", "vento", "vela", "vidro",
    "webcam", "whisky", "waffle", "walker", "wifi",
    "xale", "xadrez", "xerox", "xarope", "xampu",
    "yoga", "yakisoba", "yogurte", "yeti", "yuppie",
    "zebra", "zoologico", "zumbi", "zero", "zagueiro"
];

const letras = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
]

const teclado = document.querySelector('#teclado');
const palavra = document.querySelector('#palavra');
let palavraEscolhida
let letrasApertadas = [];

let divLetrasEscolhidas = document.querySelector('#mostrarLetras');
let paragrafo = document.querySelector('#paragrafo')

letras.forEach((letra)=>{
    const tecla = document.createElement('button')
    tecla.innerText = letra;

    tecla.addEventListener('click', ()=>{
        handleTeclaClick(letra)
    })

    teclado.appendChild(tecla)
})

function palavraAleatoria(){
    palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length - 1)].toUpperCase();
    console.log(palavraEscolhida);

    erros = 0
    letrasApertadas = []
    paragrafo.innerText = ''
    renderizarLetras()
}

function renderizarLetras(){
    palavra.innerHTML = ''

    palavraEscolhida.split('').forEach((letra) => {
        palavra.insertAdjacentHTML('beforeend', letrasApertadas.includes(letra) ? `<p>${letra}</p>` : `<p>_</p>`
    )
    })
}

function handleTeclaClick(tecla){
    console.log(palavraEscolhida.includes(tecla))

    letrasApertadas.push(tecla)

    paragrafo.innerText = letrasApertadas
    divLetrasEscolhidas.appendChild(paragrafo)

    if (!palavraEscolhida.includes(tecla)){
        addError()
        return 
    }
    renderizarLetras()
}

function addError(){
    erros++
    if(erros == 1){
        document.querySelector('#cabeca').style.display = 'block';
    }else if(erros == 2){
        document.querySelector('#corpo').style.display = 'block';
    }else if(erros == 3){
        document.querySelector('#bracoD').style.display = 'block';
    }else if(erros == 4){
        document.querySelector('#bracoE').style.display = 'block';
    }else if(erros == 5){
        document.querySelector('#pernaD').style.display = 'block';
    }else{
        document.querySelector('#pernaE').style.display = 'block';
        alert("Você perdeu!!");
        erros = 0; 
        document.querySelector('#cabeca').style.display = 'none';
        document.querySelector('#corpo').style.display = 'none';
        document.querySelector('#bracoD').style.display = 'none';
        document.querySelector('#bracoE').style.display = 'none';
        document.querySelector('#pernaD').style.display = 'none';     
        document.querySelector('#pernaE').style.display = 'none';
        palavraAleatoria()
        letrasApertadas = []
        paragrafo.innerText = ''
    }
}