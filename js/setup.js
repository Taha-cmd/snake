const field = document.getElementById('field');

const interval = 75;
const directions = ['left', 'right', 'up', 'down'];

Array.prototype.random = function(){
    return this[Math.floor(Math.random()*this.length)];
}

