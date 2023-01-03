const content = document.querySelector('.content');

let markUp = '';
for (let i = 1; i <= 9; i += 1) {
  markUp += `<div class=item></div>`;
}

content.insertAdjacentHTML('beforeend', markUp);
content.addEventListener('click'.onClick);

function onClick(event) {}
