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
        this.field      = field;
        this.food       = food;
        this.head       = document.createElement('div');
        this.head.id    = 'snake';
        this.tail       = [];
    }

    placeRandomly(){
        this.field.appendChild(this.head);
        const css = getCSS(this.field);

        //place in the middle with random offset -+100 in x and y direction
        this.head.style.left = `${round( (css.width / 2) + offset(100) ) }px`;
        this.head.style.top = `${round( (css.height / 2) + offset(100) ) }px`;  
    }

    startMoving = () => {
        this.currentDirection = this.currentDirection == null ? directions.random() : this.currentDirection;
        setTimeout(() => {
            this.intervalObject = setInterval(() => { 
                this.move(this.currentDirection);
                const css = getCSS(this.field);
                if(!this.isInside(css.width, css.height) || this.onTail()) 
                    this.stopMoving();

                if(this.onFood())
                    this.eat();

            }, currentLevel.interval);
        }, 1000);
    }

    stopMoving(){
        clearInterval(this.intervalObject);
        this.animate('die');
        setTimeout(() => {
            window.dispatchEvent(new Event('endGame'));
        }, 1000)
    }

    onFood(){
        const head = getCSS(this.head);
        const food = getCSS(this.food.food);

        return head.left === food.left && head.top  === food.top;
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

        const css  = this.tail.length === 1 ?
            getCSS(this.head) : getCSS(this.tail[this.tail.length - 2]);

        let offsetTop = 0;
        let offsetLeft = 0;

        switch(this.currentDirection)
        {
            case 'left':    offsetLeft = 10;    break;
            case 'right':   offsetLeft = -10;   break;
            case 'up':      offsetTop = 10;     break;
            case 'down':    offsetTop = -10;    break;
        }

        chunk.style.top = `${css.top + offsetTop}px`;
        chunk.style.left = `${css.left + offsetLeft}px`;

        this.field.appendChild(chunk);
    }

    onTail(){
        const head = getCSS(this.head);

        return this.tail.some((chunk) => {
            return head.top  === parseInt(chunk.style.top)
                && head.left === parseInt(chunk.style.left);
        }); 
    }

    move(direction)
    {
        const css = getCSS(this.head);      
        switch(direction)
        {
            case 'left':   this.head.style.left = `${css.left - 10}px`;  break;
            case 'right':  this.head.style.left = `${css.left + 10}px`;  break;
            case 'up':     this.head.style.top  = `${css.top - 10}px`;   break;
            case 'down':   this.head.style.top  = `${css.top + 10}px`;   break;
        }
        // move head from currentTop and currentLeft offsets

        let newTop  = null;
        let newLeft = null;
        let oldTop  = null;
        let oldLeft = null;

        this.tail.forEach((chunk, index) => {
            const chunkCSS = getCSS(chunk);

            newTop = index === 0 ? css.top : oldTop;
            newLeft = index === 0 ? css.left : oldLeft;
            oldTop = chunkCSS.top; // for next itr
            oldLeft = chunkCSS.left; // for next itr

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
