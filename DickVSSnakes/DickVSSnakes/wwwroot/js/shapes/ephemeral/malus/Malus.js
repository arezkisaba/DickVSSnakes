'use strict';

function Malus(imgPathLeft, imgPathRight, x, y, isMovable) {
    BonusMalus.call(this, imgPathLeft, imgPathRight, x, y, 50, 50, isMovable);
}

Malus.prototype = Object.create(BonusMalus.prototype);

Malus.prototype.getLifeImpactAmount = function () {
    return 0;
};
