"use strict";

export function updateScore(){
    score += currentLevel.points;
    scoreDisplay.innerHTML = score;
}

export function openModal(){
    modal.style.display = 'block';
    reachedScore.innerHTML = score;
}

export function closeModal(){
    modal.style.display = 'none';
    score = 0;
    scoreDisplay.innerHTML = '0';
    reachedScore.innerHTML = '0';
}
