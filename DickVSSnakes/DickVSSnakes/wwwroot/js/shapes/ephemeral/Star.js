'use strict';

function Star(x, y) {
    Shape.call(this, 'img/shapes/star.png', 'img/shapes/star.png', x, y, 50, 50, false);
}

Star.prototype = Object.create(Shape.prototype);
