'use strict';

function MalusSnakeRed(x, y) {
    Shape.call(this, 'img/malus/malusSnakeRedLeft.png', 'img/malus/malusSnakeRedRight.png', x, y, 50, 50);
}

MalusSnakeRed.prototype = Object.create(Shape.prototype);

MalusSnakeRed.update = function () {
    for (var i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        if (shape instanceof MalusSnakeRed) {
            if (shape.initialX - shape.x === 0) {
                shape.direction = Direction.LEFT;
            } else if (shape.initialX - shape.x === 25) {
                shape.direction = Direction.RIGHT;
            }

            if (shape.direction === Direction.RIGHT) {
                shape.setX(shape.x + 1);
            } else if (shape.direction === Direction.LEFT) {
                shape.setX(shape.x - 1);
            }
            shape.draw();
        }
    }
};
