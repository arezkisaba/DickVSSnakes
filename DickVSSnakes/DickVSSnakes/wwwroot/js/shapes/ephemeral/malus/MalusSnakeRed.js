'use strict';

function MalusSnakeRed(x, y) {
    MalusSnake.call(this, 'img/shapes/malus/malusSnakeRedLeft.png', 'img/shapes/malus/malusSnakeRedRight.png', x, y);
}

MalusSnakeRed.prototype = Object.create(MalusSnake.prototype);

MalusSnakeRed.prototype.getLifeImpactAmount = function () {
    return -2;
};
