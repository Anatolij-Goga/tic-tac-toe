const content = document.querySelector('.content');
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
const moveX = [];
const moveO = [];

let player = 'X';

function creatMarkUp() {
  let markUp = '';

  for (let i = 1; i <= 9; i += 1) {
    markUp += `<div class="item" data-id=${i}></div>`;
  }

  content.innerHTML = markUp;
}

creatMarkUp();

content.addEventListener('click', onClick);

function onClick(event) {
  if (!event.target.classList.contains('item')) {
    return;
  }
  if (event.target.textContent) {
    return;
  }
  // if (event.target === event.currentTarget) {
  //   return;
  // }

  const currentId = Number(event.target.dataset.id);

  let result = false;

  if (player === 'X') {
    moveX.push(currentId);
    result = isVictorious(moveX);
  } else {
    moveO.push(currentId);
    result = isVictorious(moveO);
  }

  event.target.textContent = player;

  if (result) {
    winner(player);
    return;
  }

  player = player === 'X' ? 'O' : 'X';
}

function winner(player) {
  setTimeout(() => {
    alert(player);
    creatMarkUp();
  }, 500);
}

function isVictorious(array) {
  return victories.some(item => item.every(id => array.includes(id)));
}
