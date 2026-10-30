
// Elementos da página
const jogador = document.getElementById("jogador");
const inimigo = document.getElementById("inimigo");
const placar = document.getElementById("pontos");
const textoNivel = document.getElementById("nivel");
const textoCarros = document.getElementById("carros");
const mensagem = document.getElementById("mensagem");

// Faixas: 0 = esquerda, 1 = meio, 2 = direita
let faixaJogador = 1;
let faixaInimigo = 0;

let posicaoInimigo = -70;
let pontos = 0;
let carrosDesviados = 0;
let nivel = 1;
let velocidade = 5;
let terminou = false;

// Movimentação do jogador
function mover(direcao) {
  if (terminou) return;

  faixaJogador = faixaJogador + direcao;

  if (faixaJogador < 0) faixaJogador = 0;
  if (faixaJogador > 2) faixaJogador = 2;

  jogador.style.left = (faixaJogador * 100 + 30) + "px";
}

// Controles do teclado
document.addEventListener("keydown", function(evento) {
  if (evento.key === "ArrowLeft") {
    evento.preventDefault();
    mover(-1);
  }

  if (evento.key === "ArrowRight") {
    evento.preventDefault();
    mover(1);
  }
});

// Loop principal do jogo
const intervalo = setInterval(function() {
  const posicaoAnterior = posicaoInimigo;
  posicaoInimigo += velocidade;

  inimigo.style.top = posicaoInimigo + "px";

  // Verifica colisão
  if (
    faixaJogador === faixaInimigo &&
    posicaoAnterior < 380 &&
    posicaoInimigo + 70 > 310
  ) {
    terminou = true;
    clearInterval(intervalo);
    mensagem.textContent = "Você bateu! Clique em Reiniciar.";
    return;
  }

  // Atualiza pontuação
  pontos += nivel * 0.2;
  placar.textContent = Math.floor(pontos);

  // Verifica se o inimigo saiu da pista
  if (posicaoInimigo > 400) {
    carrosDesviados++;
    textoCarros.textContent = carrosDesviados;

    // A cada cinco carros desviados, aumenta o nível
    if (carrosDesviados % 5 === 0) {
      nivel++;
      velocidade++;
      textoNivel.textContent = nivel;
    }

    // Sorteia uma nova faixa para o inimigo
    posicaoInimigo = -70;
    faixaInimigo = Math.floor(Math.random() * 3);

    inimigo.style.left = (faixaInimigo * 100 + 30) + "px";
    inimigo.style.top = posicaoInimigo + "px";
  }
}, 20);
