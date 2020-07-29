const field = document.getElementById('field');
const buttons = Array.from(document.querySelectorAll('.arrow'));

const interval = 75;
const directions = ['left', 'right', 'up', 'down'];

Array.prototype.random = function(){
    return this[Math.floor(Math.random()*this.length)];
}

