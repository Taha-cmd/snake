"use strict";

function updateScore(){
    score += currentLevel.points;
    scoreDisplay.innerHTML = score;
}

function openModal(){
    modal.style.display = 'block';
    reachedScore.innerHTML = score;
}

function closeModal(){
    modal.style.display = 'none';
    score = 0;
    scoreDisplay.innerHTML = '0';
    reachedScore.innerHTML = '0';
}

function makeTailChunk(){
    let tailChunk = document.createElement('div');
    tailChunk.setAttribute('class', 'tail');

    return tailChunk;
}