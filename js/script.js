'use strict';

const levels = document.querySelector('.levels');
let levelTable = document.querySelectorAll('.level');
let tableNumber = 0;
levelTable = [].slice.call(levelTable);

levels.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('level')) {
    tableNumber = levelTable.indexOf(event.target);
    levelTable[tableNumber].classList.add('selected-level', 'lvl-active');
    
    levelTable.forEach((item, i) => {
      if (i !== tableNumber) {
        item.classList.remove('selected-level', 'lvl-active');
      }
    });
  }
});

const start = document.querySelector('.play');
start.addEventListener('click', render);

function render() {  
  let cardsTotal;
  let content = `
  <div class="card-wrapper">
    <div class="card-inner">
      <div class="front-side"></div>
      <div class="back-side"></div>
    </div>
  </div>`;
  const parent = document.querySelector('.game');
  let activeTable = document.createElement('div');

  activeTable.classList.add('table', `table-${tableNumber}`);

  if (tableNumber === 0) {
    cardsTotal = 3;
  } else if (tableNumber === 1) {
    cardsTotal = 6;
  } else {
    cardsTotal = 10;
  } 
  
  (() => {
    for (let i = 0; i < cardsTotal; i++) {
      activeTable.innerHTML += content;
      parent.append(activeTable);
    }
    document.querySelector('.menu').classList.add('hide');
  }) ();

  const cards = document.querySelectorAll('.card-inner');
  const cardWin = Math.floor(Math.random() * cards.length);
  cards.forEach((item, i) => {
    if (i === cardWin) {
      const bug = document.querySelectorAll('.front-side')[i];
      bug.classList.add('front-side--win');
    }
  });

  let isCardFlip = false;
  
  activeTable.addEventListener('click', (e) => {      
    if(e.target && e.target.classList.contains('front-side')
    || e.target && e.target.classList.contains('back-side')) {
      if( !isCardFlip) {
        const parent = e.target.parentNode;
        parent.classList.toggle('flip');
        isCardFlip = true;
      } else {        
        location.reload();
      }
    }
  }); 
}