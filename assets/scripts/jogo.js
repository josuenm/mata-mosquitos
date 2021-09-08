let altura = 0;
let largura = 0;

function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
  document.body.style.width = `${largura}px`;
  document.body.style.height = `${altura}px`;
}

ajustaTamanhoPalcoJogo();

function clicou() {
  let select = document.querySelector("#select").value;
  let tempo = 0;
  if (select === "SM") {
    alert("SELECIONE O NÍVEL");
  } else if (select === "N") {
    tempo = 1500;
    document.querySelector("#box").style.display = "none";
    posicaoRandomica(tempo), painel();
  } else if (select === "D") {
    tempo = 1000;
    document.querySelector("#box").style.display = "none";
    posicaoRandomica(tempo), painel();
  } else if (select === "CN") {
    tempo = 750;
    document.querySelector("#box").style.display = "none";
    posicaoRandomica(tempo), painel();
  }
}

function painel() {
  let contador = document.createElement("div");
  contador.id = "contador";
  document.querySelector("#interface").appendChild(contador);
  document.querySelector("#contador").innerHTML = "Contador: ";

  let relogio = document.createElement("span");
  relogio.id = "relogio";
  document.querySelector("#contador").appendChild(relogio);

  let vidas = document.createElement("div");
  vidas.id = "vidas";
  document.querySelector("#contador").appendChild(vidas);

  let vida1 = document.createElement("img");
  vida1.className = `vida vida1Cheia`;
  vida1.src = "./imagens/coracao_cheio.png";

  let vida2 = document.createElement("img");
  vida2.className = `vida vida2Cheia`;
  vida2.src = "./imagens/coracao_cheio.png";

  let vida3 = document.createElement("img");
  vida3.className = `vida vida3Cheia`;
  vida3.src = "./imagens/coracao_cheio.png";

  document.querySelector("#vidas").appendChild(vida1);
  document.querySelector("#vidas").appendChild(vida2);
  document.querySelector("#vidas").appendChild(vida3);

  let i = 60;
  let cronometro = setInterval(() => {
    if (!document.querySelector("#newInterface")) {
      document.querySelector("#relogio").innerHTML = i;
      if (i === 0) {
        clearInterval(cronometro);
        setTimeout(() => {
          document.querySelector("#interface").remove();
          let comportamento = "win";
          novaInterface(comportamento);
        }, 1000);
      }
      i--;
    }
  }, 1000);
}

function posicaoRandomica(tempo) {
  let i = 60;
  let criarMosquito = setInterval(() => {
    //remover o elemento caso exista
    if (document.querySelector("#mosquito")) {
      document.querySelector("#mosquito").remove();
      perderPontos();
    }
    if (i == 0) {
      clearInterval(criarMosquito);
    } else {
      let posX = Math.floor(Math.random() * largura) - 90;
      let posY = Math.floor(Math.random() * altura) - 90;

      posX = posX < 0 ? 0 : posX;
      posY = posY < 0 ? 0 : posY;

      //criar o elemento html
      let mosquito = document.createElement("img");
      mosquito.src = "./imagens/mosca.png";
      mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`;
      mosquito.id = "mosquito";
      mosquito.style.position = "absolute";
      mosquito.style.top = `${posY}px`;
      mosquito.style.left = `${posX}px`;
      if (document.querySelector("#interface")) {
        document.querySelector("#interface").appendChild(mosquito);
      }
      i--;
      mosquito.onclick = () => {
        mosquito.remove();
        ganharPontos();
      };
    }
  }, tempo);
}

let pontos = 0;
function ganharPontos() {
  pontos += 2;
  console.log(pontos);
}
function perderPontos() {
  let vida1Cheia = document.querySelector(".vida1Cheia");
  let vida2Cheia = document.querySelector(".vida2Cheia");
  let vida3Cheia = document.querySelector(".vida3Cheia");

  if (vida3Cheia) {
    vida3Cheia.src = "./imagens/coracao_vazio.png";
    vida3Cheia.className = `vida vida3Vazia`;
  } else if (vida2Cheia) {
    vida2Cheia.src = "./imagens/coracao_vazio.png";
    vida2Cheia.className = `vida vida2Vazia`;
  } else if (vida1Cheia) {
    vida1Cheia.src = "./imagens/coracao_vazio.png";
    vida1Cheia.className = `vida vida1Vazia`;

    document.querySelector("#interface").remove();
    let comportamento = "gameOver";
    novaInterface(comportamento);
  }
}

function tamanhoAleatorio() {
  let classe = Math.floor(Math.random() * 3);
  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function ladoAleatorio() {
  let classe = Math.floor(Math.random() * 3);
  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}

function novaInterface(comportamento) {
  let interface = document.createElement("div");
  interface.id = "newInterface";
  document.body.appendChild(interface);
  let img = document.createElement("img");
  if (comportamento === "gameOver") {
    img.src = "./imagens/game_over.png";
  } else if (comportamento === "win") {
    img.src = "./imagens/vitoria.png";
  }
  document.querySelector("#newInterface").appendChild(img);
  let divPontuacao = document.createElement("div");
  divPontuacao.id = "pontuacao";
  let botaoVoltar = document.createElement("a");
  botaoVoltar.id = "voltar";
  botaoVoltar.addEventListener("click", () => window.location.reload());
  document.querySelector("#newInterface").appendChild(divPontuacao);
  document.querySelector("#newInterface").appendChild(botaoVoltar);
  document.querySelector(
    "#pontuacao"
  ).innerHTML = `Sua pontuação foi de: ${pontos}`;
  document.querySelector("#voltar").innerHTML = "VOLTAR";
}
