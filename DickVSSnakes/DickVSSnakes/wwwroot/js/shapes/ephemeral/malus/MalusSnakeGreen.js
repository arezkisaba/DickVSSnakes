'use strict';

function MalusSnakeGreen(x, y) {
    MalusSnake.call(this, 'img/shapes/malus/malusSnakeGreenLeft.png', 'img/shapes/malus/malusSnakeGreenRight.png', x, y);
}

MalusSnakeGreen.prototype = Object.create(MalusSnake.prototype);

MalusSnakeGreen.prototype.getLifeImpactAmount = function () {
    return -1;
};
