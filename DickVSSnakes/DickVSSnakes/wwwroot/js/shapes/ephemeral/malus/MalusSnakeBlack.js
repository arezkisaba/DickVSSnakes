'use strict';

function MalusSnakeBlack(x, y) {
    MalusSnake.call(this, 'img/shapes/malus/malusSnakeBlackLeft.png', 'img/shapes/malus/malusSnakeBlackRight.png', x, y);
}

MalusSnakeBlack.prototype = Object.create(MalusSnake.prototype);

MalusSnakeBlack.prototype.getLifeImpactAmount = function () {
    return -3;
};
