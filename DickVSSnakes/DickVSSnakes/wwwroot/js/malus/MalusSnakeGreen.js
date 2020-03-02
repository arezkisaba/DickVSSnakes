'use strict';

function MalusSnakeGreen(x, y) {
    Shape.call(this, 'img/malus/malusSnakeGreenLeft.png', 'img/malus/malusSnakeGreenRight.png', x, y, 50, 50);
}

MalusSnakeGreen.prototype = Object.create(Shape.prototype);

MalusSnakeGreen.update = function () {
    for (var i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        if (shape instanceof MalusSnakeGreen) {
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
