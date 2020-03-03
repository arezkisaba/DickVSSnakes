'use strict';

function MalusSnake(imgPathLeft, imgPathRight, x, y) {
    Shape.call(this, imgPathLeft, imgPathRight, x, y, 50, 50);
}

MalusSnake.prototype = Object.create(Shape.prototype);

MalusSnake.prototype.update = function () {

    if (this.initialX - this.x === 0) {
        this.direction = Direction.LEFT;
    } else if (this.initialX - this.x === 25) {
        this.direction = Direction.RIGHT;
    }

    if (this.direction === Direction.RIGHT) {
        this.setX(this.x + 1);
    } else if (this.direction === Direction.LEFT) {
        this.setX(this.x - 1);
    }

    this.draw();
};
