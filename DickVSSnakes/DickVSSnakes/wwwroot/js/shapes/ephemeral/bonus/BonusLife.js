'use strict';

function BonusLife(x, y) {
    Bonus.call(this, 'img/shapes/bonus/bonusLife.png', 'img/shapes/bonus/bonusLife.png', x, y, 50, 50);
}

BonusLife.prototype = Object.create(Bonus.prototype);

BonusLife.prototype.getLifeImpactAmount = function () {
    return 1;
};
