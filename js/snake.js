class Snake {
    head = null;
    currentDirection = null;
    intervalObject = null;
    field = null;
    tail = null;

    constructor(field){
        this.field = field;
        this.head = document.createElement('div');
        this.head.id = 'snake';
        this.tail = [];

        this.placeRandomly();
    }

    placeRandomly(){
        this.field.appendChild(this.head);

        //place in the middle with random offset -+100 in x and y direction
        this.head.style.left = `${round( (this.field.clientWidth / 2) + offset(100) ) }px`;
        this.head.style.top = `${round( (this.field.clientHeight / 2) + offset(100) ) }px`;  
    }

    startMoving = () => {
        this.currentDirection = this.currentDirection == null ? directions.random() : this.currentDirection;
        setTimeout(() => {
            this.intervalObject = setInterval(() => { 
                this.move(this.currentDirection);
                this.control();
            }, interval);
        }, 1000)
    }

    stopMoving(){
        clearInterval(this.intervalObject);
    }

    control(){
        if(!this.isInside(this.field.clientWidth, this.field.clientHeight)) this.stopMoving();

    }

    move(direction){
        const properties = window.getComputedStyle(this.head);
        const top = parseInt(properties.top, 10);
        const left = parseInt(properties.left, 10);

        switch(direction)
        {
            case 'left':   this.head.style.left = `${left-10}px`;  break;
            case 'right':  this.head.style.left = `${left+10}px`;  break;
            case 'up':     this.head.style.top  = `${top-10}px`;   break;
            case 'down':   this.head.style.top  = `${top+10}px`;   break;
        }
    }

    isInside(right, bottom){
        // snake size is 10 x 10, so if outer end hits the border
        if(this.head.offsetLeft + 10 >= right) return false; 
        if(this.head.offsetTop + 10 >= bottom) return false;

        //quick fix, if inner end goes out of border, set it back one step
        if(this.head.offsetLeft < 0) { this.move('right'); return false; }           
        if(this.head.offsetTop < 0 ) { this.move('down'); return false; } 
            
        return true;
    }
}
