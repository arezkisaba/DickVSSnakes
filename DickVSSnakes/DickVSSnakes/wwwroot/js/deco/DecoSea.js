'use strict';

function DecoSea(x, y) {
    Shape.call(this, 'img/deco/decoSea.png', 'img/deco/decoSea.png', x, y, 50, 50);
}

DecoSea.prototype = Object.create(Shape.prototype);

DecoSea.update = function () {
    for (var i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        if (shape instanceof DecoSea) {
            shape.draw();
        }
    }
};
