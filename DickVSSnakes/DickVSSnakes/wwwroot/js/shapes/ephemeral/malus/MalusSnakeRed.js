'use strict';

function MalusSnakeRed(x, y) {
    MalusSnake.call(this, 'img/malus/malusSnakeRedLeft.png', 'img/malus/malusSnakeRedRight.png', x, y);
}

MalusSnakeRed.prototype = Object.create(MalusSnake.prototype);

MalusSnakeRed.prototype.getLifeImpactAmount = function () {
    return -2;
};
