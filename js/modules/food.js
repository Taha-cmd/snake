"use strict";

import {round, randomBetween, getCSS} from '/js/modules/utilities.js';

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
        const css = getCSS(this.field);

        this.food.style.top = `${round( randomBetween(0, css.height - 10) )}px`;
        this.food.style.left = `${round( randomBetween(0, css.width - 10) )}px`;
    }
}