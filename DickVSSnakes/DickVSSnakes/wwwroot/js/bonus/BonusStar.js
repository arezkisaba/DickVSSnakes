'use strict';

function BonusStar(x, y) {
    Shape.call(this, 'img/bonus/bonusStar.png', 'img/bonus/bonusStar.png', x, y, 50, 50);
}

BonusStar.prototype = Object.create(Shape.prototype);
