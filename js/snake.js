class Snake{
    head = null;
    currentDirection = null;

    constructor(){
        this.head = document.createElement('div');
        this.head.id = 'snake';
        this.currentDirection = directions.random();
        this.tail = [];
    }

    startMoving = () => {
        setInterval(() => { this.move(this.currentDirection); }, interval);
    }

    move(direction) {
        const properties = window.getComputedStyle(this.head);
        const top = parseInt(properties.top, 10);
        const left = parseInt(properties.left, 10);

        switch(direction)
        {
            case 'left':   this.head.style.left = `${left-10}px`;  break;
            case 'right':  this.head.style.left = `${left+10}px`;  break;
            case 'up':    this.head.style.top  = `${top-10}px`;   break;
            case 'down': this.head.style.top  = `${top+10}px`;   break;
        }

        console.log(this.head.clientX);
    }

    getHead(){
        return this.head;
    }

}
