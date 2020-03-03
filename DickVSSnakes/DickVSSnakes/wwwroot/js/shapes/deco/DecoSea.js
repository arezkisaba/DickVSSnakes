'use strict';

function DecoSea(x, y) {
    Shape.call(this, 'img/shapes/deco/decoSea.png', 'img/shapes/deco/decoSea.png', x, y, 50, 50);
}

DecoSea.prototype = Object.create(Shape.prototype);
