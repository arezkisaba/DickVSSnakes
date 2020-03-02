'use strict';

var intervalAnimCountBonusLife = undefined;
var intervalAnimCountBonusStar = undefined;
var intervalAnimCountMalusSnakeBlack = undefined;
var intervalAnimCountMalusSnakeRed = undefined;
var intervalAnimCountMalusSnakeGreen = undefined;

function TopbarHelper() {
    Shape.call(this, 'img/bonus/bonusLife.png', 'img/bonus/bonusLife.png', x, y, 50, 50);
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

TopbarHelper.updateCountBonusStar = function () {
    $('#stat #countBonusStar span').text('x ' + countBonusStar.toString());
};

TopbarHelper.animCountBonusStar = function () {
    var counter = 0;
    clearInterval(intervalAnimCountBonusStar);
    intervalAnimCountBonusStar = self.setInterval(function () {
        counter += 1;
        if ($('#stat #countBonusStar img').attr('src') === 'img/menubar/bonusStarNormal.png') {
            $('#stat #countBonusStar img').attr('src', 'img/menubar/bonusStarActive.png');
        } else {
            $('#stat #countBonusStar img').attr('src', 'img/menubar/bonusStarNormal.png');
        }

        if (counter === 4) {
            clearInterval(intervalAnimCountBonusStar);
        }
    }, 500);
};

TopbarHelper.updateCountMalusSnakeGreen = function () {
    $('#stat #countMalusSnakeGreen span').text('x ' + countMalusSnakeGreen.toString());
};

TopbarHelper.animCountMalusSnakeGreen = function () {
    var counter = 0;
    clearInterval(intervalAnimCountMalusSnakeGreen);
    intervalAnimCountMalusSnakeGreen = self.setInterval(function () {
        counter += 1;
        if ($('#stat #countMalusSnakeGreen img').attr('src') === 'img/menubar/malusSnakeGreenNormal.png') {
            $('#stat #countMalusSnakeGreen img').attr('src', 'img/menubar/malusSnakeGreenActive.png');
        } else {
            $('#stat #countMalusSnakeGreen img').attr('src', 'img/menubar/malusSnakeGreenNormal.png');
        }
        if (counter === 4) {
            clearInterval(intervalAnimCountMalusSnakeGreen);
        }
    }, 500);
};

TopbarHelper.updateCountMalusSnakeRed = function () {
    $('#stat #countMalusSnakeRed span').text('x ' + countMalusSnakeRed.toString());
};

TopbarHelper.animCountMalusSnakeRed = function () {
    var counter = 0;
    clearInterval(intervalAnimCountMalusSnakeRed);
    intervalAnimCountMalusSnakeRed = self.setInterval(function () {
        counter += 1;
        if ($('#stat #countMalusSnakeRed img').attr('src') === 'img/menubar/malusSnakeRedNormal.png') {
            $('#stat #countMalusSnakeRed img').attr('src', 'img/menubar/malusSnakeRedActive.png');
        } else {
            $('#stat #countMalusSnakeRed img').attr('src', 'img/menubar/malusSnakeRedNormal.png');
        }
        if (counter === 4) {
            clearInterval(intervalAnimCountMalusSnakeRed);
        }
    }, 500);
};

TopbarHelper.updateCountMalusSnakeBlack = function () {
    $('#stat #countMalusSnakeBlack span').text('x ' + countMalusSnakeBlack.toString());
};

TopbarHelper.animCountMalusSnakeBlack = function () {
    var counter = 0;
    clearInterval(intervalAnimCountMalusSnakeBlack);
    intervalAnimCountMalusSnakeBlack = self.setInterval(function () {
        counter += 1;
        if ($('#stat #countMalusSnakeBlack img').attr('src') === 'img/menubar/malusSnakeBlackNormal.png') {
            $('#stat #countMalusSnakeBlack img').attr('src', 'img/menubar/malusSnakeBlackActive.png');
        } else {
            $('#stat #countMalusSnakeBlack img').attr('src', 'img/menubar/malusSnakeBlackNormal.png');
        }
        if (counter === 4) {
            clearInterval(intervalAnimCountMalusSnakeBlack);
        }
    }, 500);
};
