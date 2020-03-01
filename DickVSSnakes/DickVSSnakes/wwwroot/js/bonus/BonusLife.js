function BonusLife(x, y) {
    Shape.call(this, 'img/bonus/bonusLife.png', 'img/bonus/bonusLife.png', x, y, 50, 50);

    BonusLife.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof BonusLife) {
                shape.draw();
            }
        }
    };

    BonusLife.updateCount = function () {
        if (initialTime > 0) {
            $('#stat #countBonusLife span').text('x ' + countBonusLife.toString());
        } else {
            $('#stat #countBonusLife span').text('x ' + countBonusLife.toString());
        }
    };

    BonusLife.animCount = function () {
        if (initialTime > 0) {
            var counter = 0;
            clearInterval(intervalAnimCountBonusLife);
            intervalAnimCountBonusLife = self.setInterval(function () {
                counter += 1;
                if ($('#stat #countBonusLife img').attr('src') === 'img/menubar/bonusLifeNormal.png') {
                    $('#stat #countBonusLife img').attr('src', 'img/menubar/bonusLifeActive.png');
                } else {
                    $('#stat #countBonusLife img').attr('src', 'img/menubar/bonusLifeNormal.png');
                }
                if (counter === 2) {
                    clearInterval(intervalAnimCountBonusLife);
                }
            }, 500);
        } else {
            $('#stat #countBonusLife img').attr('src', 'img/menubar/bonusLifeNormal.png');
        }
    };
}

////BonusLife.prototype = Shape.prototype;