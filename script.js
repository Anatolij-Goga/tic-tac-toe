const content = document.querySelector('.content');

const KEY_X = 'keyX';
const KEY_O = 'keyO';
const KEY_PLAYER = 'player';
const KEY_COUNTER = 'counter';
const endGame = 9;
let counter = JSON.parse(localStorage.getItem(KEY_COUNTER)) || 0;
let player = localStorage.getItem(KEY_PLAYER) || 'X';

const moveX = JSON.parse(localStorage.getItem(KEY_X)) || [];
const moveO = JSON.parse(localStorage.getItem(KEY_O)) || [];

function autoComplite() {
  [...content.children].forEach(item => {
    const id = Number(item.dataset.id);
    if (moveX.includes(id)) {
      item.textContent = 'X';
    } else if (moveO.includes(id)) {
      item.textContent = 'O';
    }
  });
}

function creatMarkUp() {
  let markUp = '';

  for (let i = 1; i <= 9; i += 1) {
    markUp += `<div class="item" data-id=${i}></div>`;
  }

  content.innerHTML = markUp;
}

creatMarkUp();
autoComplite();

content.addEventListener('click', onClick);

function onClick(event) {
  if (!event.target.classList.contains('item')) {
    return;
  }
  if (event.target.textContent) {
    return;
  }

  const currentId = Number(event.target.dataset.id);

  let result = false;

  counter += 1;

  if (player === 'X') {
    moveX.push(currentId);
    localStorage.setItem(KEY_X, JSON.stringify(moveX));
    result = isVictorious(moveX);
  } else {
    moveO.push(currentId);
    localStorage.setItem(KEY_O, JSON.stringify(moveO));
    result = isVictorious(moveO);
  }

  event.target.textContent = player;

  if (result) {
    winner(player);
    return;
  }

  if (counter === endGame) {
    winner('RESTART GAME!!!');
    return;
  }

  player = player === 'X' ? 'O' : 'X';
  localStorage.setItem(KEY_PLAYER, player);
  localStorage.setItem(KEY_COUNTER, JSON.stringify(counter));
}

function winner(player) {
  setTimeout(() => {
    alert(player);
    creatMarkUp();
    localStorage.clear();
  }, 500);
}

const victories = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function isVictorious(array) {
  return victories.some(item => item.every(id => array.includes(id)));
}
