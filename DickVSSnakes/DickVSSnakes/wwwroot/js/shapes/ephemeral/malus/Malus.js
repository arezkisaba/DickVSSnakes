'use strict';

function Malus(imgPathLeft, imgPathRight, x, y) {
    BonusMalus.call(this, imgPathLeft, imgPathRight, x, y, 50, 50);
}

Malus.prototype = Object.create(BonusMalus.prototype);

Malus.prototype.getLifeImpactAmount = function () {
    return 0;
};
