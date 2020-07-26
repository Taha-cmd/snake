class Field{
    constructor(field){
        this.field = field;
    }

    place(snake){
        this.field.appendChild(snake.getHead());
    }
}