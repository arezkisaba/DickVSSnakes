'use strict';

function BonusStar(x, y) {
    Shape.call(this, 'img/bonus/bonusStar.png', 'img/bonus/bonusStar.png', x, y, 50, 50);
}

BonusStar.prototype = Object.create(Shape.prototype);

BonusStar.update = function () {
    for (var i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        if (shape instanceof BonusStar) {
            shape.draw();
        }
    }
};
