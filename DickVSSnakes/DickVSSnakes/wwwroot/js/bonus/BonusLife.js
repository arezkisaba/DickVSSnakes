'use strict';

function BonusLife(x, y) {
    Shape.call(this, 'img/bonus/bonusLife.png', 'img/bonus/bonusLife.png', x, y, 50, 50);
}

BonusLife.prototype = Object.create(Shape.prototype);
