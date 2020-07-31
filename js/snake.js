"use strict";
class Snake {
    head = null;
    currentDirection = null;
    intervalObject = null;
    field = null;
    tail = null;
    food = null;

    constructor(field, food){
        this.field = field;
        this.food = food;
        this.head = document.createElement('div');
        this.head.id = 'snake';
        this.tail = [];
    }

    placeRandomly(){
        this.field.appendChild(this.head);

        //place in the middle with random offset -+100 in x and y direction
        console.log(this.field.clientHeight);
        this.head.style.left = `${round( (this.field.clientWidth / 2) + offset(100) ) }px`;
        this.head.style.top = `${round( (this.field.clientHeight / 2) + offset(100) ) }px`;  
    }

    startMoving = () => {
        this.currentDirection = this.currentDirection == null ? directions.random() : this.currentDirection;
        setTimeout(() => {
            this.intervalObject = setInterval(() => { 
                this.move(this.currentDirection);
                this.control();
            }, currentLevel.interval);
        }, 1000)
    }

    stopMoving(){
        clearInterval(this.intervalObject);
        endGame();
    }

    control(){
        if(!this.isInside(this.field.clientWidth, this.field.clientHeight)) this.stopMoving();
        if(this.atFood()) this.eat();
    }

    atFood(){
        return parseInt(this.head.style.left) === parseInt(this.food.food.style.left)
            && parseInt(this.head.style.top) === parseInt(this.food.food.style.top);
    }

    eat(){
        updateScore();
        this.animate();
        this.food.spawn();
    }

    move(direction){
        const properties = window.getComputedStyle(this.head);
        const top = parseInt(properties.top, 10);
        const left = parseInt(properties.left, 10);

        switch(direction)
        {
            case 'left':   this.head.style.left = `${left-10}px`;  break;
            case 'right':  this.head.style.left = `${left+10}px`;  break;
            case 'up':     this.head.style.top  = `${top-10}px`;   break;
            case 'down':   this.head.style.top  = `${top+10}px`;   break;
        }
    }

    isInside(right, bottom){
        // snake size is 10 x 10, so if outer end hits the border
        if(this.head.offsetLeft + 10 >= right) return false; 
        if(this.head.offsetTop + 10 >= bottom) return false;

        //quick fix, if inner end goes out of border, set it back one step
        if(this.head.offsetLeft < 0) { this.move('right'); return false; }           
        if(this.head.offsetTop < 0 ) { this.move('down'); return false; } 
            
        return true;
    }

    animate(){
        this.head.style.animation = 'animate 1s';
        setTimeout(() => {
            this.head.style.animation = '';
        }, 1000);
    }
}
