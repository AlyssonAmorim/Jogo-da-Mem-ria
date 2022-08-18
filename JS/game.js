/* Vou criar uma função que vai carregar as cartas de forma aleatória pra o jogo, não ficar a mesma coisa todo momento. 
Aqui vou criar um script pra isso. 
cria uma função que vai criar as cartas pra mim*/ 

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

/*arrays com todos os personagens*/
const characters = [
  'Beth',
  'Jerry',
  'Jessica',
  'Morty',
  'Pessoa-passaro',
  'Pickle-rick',
  'Rick',
  'Summer',
  'Meeseeks',
  'Scroopy',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = ''; /* pra virar a carta se não for iguais*/
let secondCard = ''; /* se for diferente elas retorna*/

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`); /* spanplayer é pra mostrar o nome do jogador quando ele ganhar*/
  }
}

const checkCards = () => { /* vai checar pra saber se as cartas são iguais*/
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = ''; /* essa Funções serve para resetar quando acertar o jogo*/

    checkEndGame(); /* Essa função serve para checar se a pessoa terminou o jogo e acertou*/

  } else { 
    setTimeout(() => {

      firstCard.classList.remove('reveal-card'); /* esconder as cartas se a pessoa errou. A de baixo tem a mesma função*/
      secondCard.classList.remove('reveal-card'); 

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') { /* primeira carta tá vazia?*/

    target.parentNode.classList.add('reveal-card'); /*revela a carta*/
    firstCard = target.parentNode; /* salva a carta que a pessoa clicou*/

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../Img/${character}.png')`;

  card.appendChild(front); /*Acrescentar um filho nessa div*/
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [ ...characters, ...characters ];/* Duplicando as cartas de forma mais limpa, porém posso repetir os nomes no arrays*/

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); /* sort embaralha o arrays*/

  shuffledArray.forEach((character) => { /*criar várias cartas*/
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => { /*função que inicia a contagem do tempo no jogo*/

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML; /* o sinalde + tranforma aqui emm número*/
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => { /* executa quando a janela tiver carregada*/
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}