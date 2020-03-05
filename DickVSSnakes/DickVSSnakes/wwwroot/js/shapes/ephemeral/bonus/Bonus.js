'use strict';

function Bonus(imgPathLeft, imgPathRight, x, y, isMovable) {
    BonusMalus.call(this, imgPathLeft, imgPathRight, x, y, isMovable);
}

Bonus.prototype = Object.create(BonusMalus.prototype);

Bonus.prototype.getLifeImpactAmount = function () {
    return 0;
};
