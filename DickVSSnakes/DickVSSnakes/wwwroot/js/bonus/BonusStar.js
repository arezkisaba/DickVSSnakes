function BonusStar(x, y) {
    Shape.call(this, 'img/bonus/bonusStar.png', 'img/bonus/bonusStar.png', x, y, 50, 50);

    BonusStar.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof BonusStar) {
                shape.draw();
            }
        }
    };

    BonusStar.updateCount = function () {
        if (initialTime > 0) {
            $('#stat #countBonusStar span').text('x ' + countBonusStar.toString());
        } else {
            $('#stat #countBonusStar span').text('x 0');
        }
    };

    BonusStar.animCount = function () {
        if (initialTime > 0) {
            var counter = 0;
            clearInterval(intervalAnimCountBonusStar);
            intervalAnimCountBonusStar = self.setInterval(function () {
                counter += 1;
                if ($('#stat #countBonusStar img').attr('src') === 'img/menubar/bonusStarNormal.png') {
                    $('#stat #countBonusStar img').attr('src', 'img/menubar/bonusStarActive.png');
                } else {
                    $('#stat #countBonusStar img').attr('src', 'img/menubar/bonusStarNormal.png');
                }
                if (counter === 2) {
                    clearInterval(intervalAnimCountBonusStar);
                }
            }, 500);
        } else {
            $('#stat #countBonusStar img').attr('src', 'img/menubar/bonusStarNormal.png');
        }
    };
}

////BonusStar.prototype = Shape.prototype;