"use strict";

const game              =    document.getElementById('game');
const menu              =    document.getElementById('menu');
const field             =    document.getElementById('field');
const scoreDisplay      =    document.getElementById('score');
const reachedScore      =    document.getElementById('reachedScore');
const modalButton       =    document.getElementById('modalButton');
const modal             =    document.getElementById('modal');
const restartButton     =    document.getElementById('restart');
const buttons           =    Array.from(document.querySelectorAll('.arrow'));
const levelSelectors    =    Array.from(document.querySelectorAll('.level-selector'));

const directions = ['left', 'right', 'up', 'down'];
let score = 0;
let currentLevel = null;

const levels = 
[
    {interval: 150, points: 1},
    {interval: 125, points: 2},
    {interval: 100, points: 3},
    {interval: 75,  points: 4},
    {interval: 50,  points: 5}

];

Array.prototype.random = function(){
    return this[Math.floor(Math.random()*this.length)];
}

