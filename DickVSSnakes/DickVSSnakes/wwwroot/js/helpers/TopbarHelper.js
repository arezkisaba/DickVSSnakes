'use strict';

var intervalAnimCountBonusLife = undefined;

function TopbarHelper() {
}

TopbarHelper.updateCountBonusLife = function () {
    $('#stat #countBonusLife span').text('x ' + countBonusLife.toString());
};

TopbarHelper.animCountBonusLife = function () {
    var counter = 0;
    clearInterval(intervalAnimCountBonusLife);
    intervalAnimCountBonusLife = self.setInterval(function () {
        counter += 1;
        if ($('#stat #countBonusLife img').attr('src') === 'img/menubar/bonusLifeNormal.png') {
            $('#stat #countBonusLife img').attr('src', 'img/menubar/bonusLifeActive.png');
        } else {
            $('#stat #countBonusLife img').attr('src', 'img/menubar/bonusLifeNormal.png');
        }

        if (counter === 4) {
            clearInterval(intervalAnimCountBonusLife);
        }
    }, 500);
};
