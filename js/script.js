'use strict';

const d = document;
const levels = d.querySelector('.levels');
let levelTable = d.querySelectorAll('.level');
let tableNumber = 0;
levelTable = [].slice.call(levelTable);

levels.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('level')) {
    tableNumber = levelTable.indexOf(event.target);
    levelTable[tableNumber].classList.add('selected-level');
    
    levelTable.forEach((item, i) => {
      if (i != tableNumber) {
        item.classList.remove('selected-level');
      }
    });
  }
});

const start = d.querySelector('.play');
start.addEventListener('click', render);

function render() {  
  let cardsTotal;
  let content = `
  <div class="flip-card">
    <div class="card-inner">
      <div class="front-side"><img class="result" src="/img/game-over.png" alt="лицевая сторона карты"></div>
      <div class="back-side"><img class="card" src="/img/back-side.png" alt="обратная сторона карты"></div>
    </div>
  </div>`;
  const parent = d.querySelector('.game');
  let activeTable = d.createElement('div');
  
  activeTable.classList.add('table', `table-${tableNumber}`);

  if (tableNumber === 0) {
    cardsTotal = 3;
  } else if (tableNumber === 1) {
    cardsTotal = 6;
  } else {
    cardsTotal = 9;
  } 
  
  (() => {
    for (let i = 0; i < cardsTotal; i++) {
      activeTable.innerHTML += content;
      parent.append(activeTable);
    }
    d.querySelector('.menu').classList.add('hide');
  })
  ();

  const cards = d.querySelectorAll('.card-inner');
  const cardWin = Math.floor(Math.random() * cards.length);
   
  cards.forEach((item, i) => {
    if (i == cardWin) {
      const bug = d.querySelectorAll('.front-side')[i];
      bug.innerHTML='<img src="/img/winner.png" class="result" alt="Ты нашел баг!">';
    }
  });
  
  let isCardFlip = false;
  
  activeTable.addEventListener('click', (e) => {      
    if(e.target && e.target.classList.contains('card')
    || e.target && e.target.classList.contains('result')) {
      if( !isCardFlip) {
        const parent = e.target.parentNode.parentNode;
        parent.classList.toggle('flip');
        isCardFlip = true;
      } else {        
        location.reload();
      }
    }
  }); 
}