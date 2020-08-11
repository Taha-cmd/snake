"use strict";

export function round(num){
    return Math.round(num / 10) * 10;
}

// random number between -range and range
export function offset(range) {
    return Math.floor( Math.random() * (  range  - ( (range) * -1) ) ) + ( (range) * -1 );
}

export function randomBetween(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

export function getCSS(el){
    const properties = window.getComputedStyle(el);
    
    return  {    
                top: parseInt(properties.top, 10),
                left: parseInt(properties.left, 10),
                width: el.clientWidth,
                height: el.clientHeight
            };
}



