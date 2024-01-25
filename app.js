let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// A função "exibirTexto" recebe dois parâmetros: 'tag' (uma string representando a tag HTML) e 'texto' (uma string com o conteúdo a ser exibido).
// Ela utiliza o seletor para encontrar o elemento HTML com a tag especificada e atualiza o conteúdo interno desse elemento com o texto fornecido.
function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}


function exibirMensagensInical() {
   // As linhas abaixo chamam a função "exibirTexto" para atualizar o conteúdo dos elementos h1 e p.
    exibirTexto('h1', 'Jogo do Número secreto');
    exibirTexto('p','Escolha um número entre 1 e 10'); 
}

exibirMensagensInical ();

// A função abaixo não faz nada além de imprimir uma mensagem no console quando chamada.
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTexto('h1','Acertou');
        let palavraTentativa = tentativas > 1  ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `voce descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto ('p','O número secreto é menor!');
        } else {
            exibirTexto ('p','O número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
    
}


// A função "gerarNumeroAleatorio" gera um número aleatório entre 1 e 10 e retorna o resultado como um número inteiro.
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
   let quantidadesDeElementosNaLista = listaDeNumerosSorteados.length;

   if (quantidadesDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }

}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo ();
    tentativas = 1;
    exibirMensagensInical();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}