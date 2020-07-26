const field = new Field(document.getElementById('field'));
const snake = new Snake();

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

field.place(snake);

function start(){
    
    snake.startMoving();
}


