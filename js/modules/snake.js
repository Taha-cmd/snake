"use strict";

import { offset, round } from '/js/modules/utilities.js';
import { updateScore } from '/js/modules/dom.js';

export class Snake {
    head                = null;
    currentDirection    = null;
    intervalObject      = null;
    field               = null;
    tail                = null;
    food                = null;

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
        this.animate('die');
        setTimeout(() => {
            window.dispatchEvent(new Event('endGame'));
        }, 1000)
    }

    control(){
        if(!this.isInside(this.field.clientWidth, this.field.clientHeight) || this.onTail())
            this.stopMoving();

        if(this.onFood()) 
            this.eat();
    }

    onFood(){
        return parseInt(this.head.style.left) === parseInt(this.food.food.style.left)
            && parseInt(this.head.style.top) === parseInt(this.food.food.style.top);
    }

    eat(){
        updateScore();
        this.animate('eat');
        this.grow();
        this.food.spawn();
    }

    grow(){
        const chunk = this.makeTailChunk();
        this.tail.push(chunk);

        const properties  = this.tail.length === 1 ?
            window.getComputedStyle(this.head) : 
            window.getComputedStyle(this.tail[this.tail.length - 2]);

        const top = parseInt(properties.top, 10);
        const left = parseInt(properties.left, 10);

        let offsetTop = 0;
        let offsetLeft = 0;

        switch(this.currentDirection)
        {
            case 'left':    offsetLeft = 10;    break;
            case 'right':   offsetLeft = -10;   break;
            case 'up':      offsetTop = 10;     break;
            case 'down':    offsetTop = -10;    break;
        }

        chunk.style.top = `${top + offsetTop}px`;
        chunk.style.left = `${left + offsetLeft}px`;

        this.field.appendChild(chunk);
    }

    onTail(){
        const properties = window.getComputedStyle(this.head);
        const top = parseInt(properties.top, 10);
        const left = parseInt(properties.left, 10);

        return this.tail.some((chunk) => {
            return top === parseInt(chunk.style.top) && left === parseInt(chunk.style.left);
        });
    }

    move(direction)
    {
        const properties = window.getComputedStyle(this.head);
        const currentTop = parseInt(properties.top, 10);
        const currentLeft = parseInt(properties.left, 10);
        
        switch(direction)
        {
            case 'left':   this.head.style.left = `${currentLeft - 10}px`;  break;
            case 'right':  this.head.style.left = `${currentLeft + 10}px`;  break;
            case 'up':     this.head.style.top  = `${currentTop - 10}px`;   break;
            case 'down':   this.head.style.top  = `${currentTop + 10}px`;   break;
        }
        // move head from currentTop and currentLeft offsets

        let newTop  = null;
        let newLeft = null;
        let oldTop  = null;
        let oldLeft = null;

        this.tail.forEach((chunk, index) => {
            const chunkProperties = window.getComputedStyle(chunk);

            newTop = index === 0 ? currentTop : oldTop;
            newLeft = index === 0 ? currentLeft : oldLeft;
            oldTop = parseInt(chunkProperties.top, 10); // for next itr
            oldLeft = parseInt(chunkProperties.left, 10); // for next itr

            chunk.style.top = `${newTop}px`;
            chunk.style.left = `${newLeft}px`;


        });

            // if it is the first element (index === 0), follow the head
            // => change position to the old head's position
            // => else follow the position of the old element
            // the position of the current element will be saved
            // but used in the next iteration (so it is the old element)
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

    animate(type){
        switch(type)
        {
            case 'eat': this.head.style.animation = 'animateOnEat 1s';      break;
            case 'die': this.head.style.animation = 'animateOnDeath 1s';    break;
        }
    
        setTimeout(() => {
            this.head.style.animation = '';
        }, 1000);
    }

    makeTailChunk(){
        let tailChunk = document.createElement('div');
        tailChunk.setAttribute('class', 'tail');
    
        return tailChunk;
    }
}
