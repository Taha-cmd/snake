"use strict";

import {round, randomBetween} from '/js/modules/utilities.js';

export class Food {
    field = null;
    food = null;

    constructor(field){
        this.field = field;
        this.food = document.createElement('div');
        this.food.setAttribute('id', 'food');
        this.field.appendChild(this.food);
    }

    spawn(){
        this.food.style.top = `${round( randomBetween(0, this.field.clientHeight - 10) )}px`;
        this.food.style.left = `${round( randomBetween(0, this.field.clientWidth - 10) )}px`;
    }
}