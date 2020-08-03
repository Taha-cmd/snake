"use strict";

const food = new Food(field);
const snake = new Snake(field, food);

window.addEventListener('keyup', (e) => {
    const direction = e.key;
    
    if( (direction == 'w' || direction == 'ArrowUp') && snake.currentDirection != 'down')
        snake.currentDirection = 'up';
    else if( (direction == 's' || direction == 'ArrowDown') && snake.currentDirection != 'up')
        snake.currentDirection = 'down';
    else if( (direction == 'd' || direction == 'ArrowRight') && snake.currentDirection != 'left')
        snake.currentDirection = 'right';
    else if( (direction == 'a' || direction == 'ArrowLeft') && snake.currentDirection != 'right')
        snake.currentDirection = 'left';
})

buttons.forEach((button) => button.addEventListener('click', (e) => { 
    const keyup = new Event('keyup');
    keyup.key = e.target.getAttribute('value');
    window.dispatchEvent(keyup);
}));

levelSelectors.forEach((selector) => selector.addEventListener('click', (e) => {
    const index = parseInt(e.target.getAttribute('index'));
    currentLevel = levels[index];
    startGame();
}));

restartButton.addEventListener('click', (e) => {
    closeModal();
});

function startGame(){
    game.style.display = 'block';
    menu.style.display = 'none';

    food.spawn();
    snake.placeRandomly();
    snake.startMoving();
}

function endGame(){
    game.style.display = 'none';
    menu.style.display = 'block';

     //remove tail divs from dom
    snake.tail.forEach((tailChunk) => tailChunk.remove());
    snake.tail = [];
    
    openModal();
}



