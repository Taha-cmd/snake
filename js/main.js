const snake = new Snake(field);

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

snake.startMoving();



function start(){
    
    snake.startMoving();
} 



