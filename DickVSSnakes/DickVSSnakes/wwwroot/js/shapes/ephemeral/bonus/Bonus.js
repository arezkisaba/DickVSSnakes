'use strict';

function Bonus(imgPathLeft, imgPathRight, x, y) {
    BonusMalus.call(this, imgPathLeft, imgPathRight, x, y, 50, 50);
}

Bonus.prototype = Object.create(BonusMalus.prototype);

Bonus.prototype.getLifeImpactAmount = function () {
    return 0;
};
