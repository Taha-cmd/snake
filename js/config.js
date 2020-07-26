Array.prototype.random = function(){
    return this[Math.floor(Math.random()*this.length)];
}

const interval = 100;
const directions = ['left', 'right', 'up', 'down'];