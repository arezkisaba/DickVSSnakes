'use strict';

function MalusSnakeGreen(x, y) {
    MalusSnake.call(this, 'img/malus/malusSnakeGreenLeft.png', 'img/malus/malusSnakeGreenRight.png', x, y);
}

MalusSnakeGreen.prototype = Object.create(MalusSnake.prototype);
