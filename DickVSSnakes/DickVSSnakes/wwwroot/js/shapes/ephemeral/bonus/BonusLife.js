'use strict';

function BonusLife(x, y) {
    Bonus.call(this, 'img/bonus/bonusLife.png', 'img/bonus/bonusLife.png', x, y, 50, 50);
}

BonusLife.prototype = Object.create(Bonus.prototype);

BonusLife.prototype.getLifeImpactAmount = function () {
    return 1;
};
