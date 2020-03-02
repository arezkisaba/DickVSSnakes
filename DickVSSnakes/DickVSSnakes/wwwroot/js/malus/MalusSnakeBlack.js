'use strict';

function MalusSnakeBlack(x, y) {
    Shape.call(this, 'img/malus/malusSnakeBlackLeft.png', 'img/malus/malusSnakeBlackRight.png', x, y, 50, 50);
}

MalusSnakeBlack.prototype = Object.create(Shape.prototype);

MalusSnakeBlack.update = function () {
    for (var i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        if (shape instanceof MalusSnakeBlack) {
            if (shape.initialX - shape.x === 0) {
                shape.direction = Direction.LEFT;
            }
            if (shape.initialX - shape.x === 25) {
                shape.direction = Direction.RIGHT;
            }
            if (shape.direction === Direction.RIGHT) {
                shape.setX(shape.x + 1);
            }
            if (shape.direction === Direction.LEFT) {
                shape.setX(shape.x - 1);
            }
            shape.draw();
        }
    }
};
