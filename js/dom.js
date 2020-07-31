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