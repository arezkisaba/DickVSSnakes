'use strict';

function BonusMalus(imgPathLeft, imgPathRight, x, y, isMovable) {
    Shape.call(this, imgPathLeft, imgPathRight, x, y, 50, 50, isMovable);
}

BonusMalus.prototype = Object.create(Shape.prototype);

BonusMalus.prototype.getLifeImpactAmount = function () {
    return 0;
};
