'use strict';

function Star(x, y) {
    Shape.call(this, 'img/bonus/bonusStar.png', 'img/bonus/bonusStar.png', x, y, 50, 50);
}

Star.prototype = Object.create(Shape.prototype);
