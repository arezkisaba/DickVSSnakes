function MalusSnakeBlack(x, y) {
    Shape.call(this, 'img/malus/malusSnakeBlackLeft.png', 'img/malus/malusSnakeBlackRight.png', x, y, 50, 50);

    MalusSnakeBlack.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof MalusSnakeBlack) {
                if (shape.initialX - shape.x === 0) {
                    shape.direction = Direction.LEFT;
                }
                if (shape.initialX - shape.x === 25) {
                    shape.direction = Direction.RIGHT;
                }
                if (shape.direction === Direction.RIGHT) {
                    shape.setX(shape.x + 1);
                }
                if (shape.direction === Direction.LEFT) {
                    shape.setX(shape.x - 1);
                }
                shape.draw();
            }
        }
    };

    MalusSnakeBlack.updateCount = function () {
        if (initialTime > 0) {
            $('#stat #countMalusSnakeBlack span').text('x ' + countMalusSnakeBlack.toString());
        } else {
            $('#stat #countMalusSnakeBlack span').text('x 0');
        }
    };

    MalusSnakeBlack.animCount = function () {
        if (initialTime > 0) {
            var counter = 0;
            clearInterval(intervalAnimCountMalusSnakeBlack);
            intervalAnimCountMalusSnakeBlack = self.setInterval(function () {
                counter += 1;
                if ($('#stat #countMalusSnakeBlack img').attr('src') === 'img/menubar/malusSnakeBlackNormal.png') {
                    $('#stat #countMalusSnakeBlack img').attr('src', 'img/menubar/malusSnakeBlackActive.png');
                } else {
                    $('#stat #countMalusSnakeBlack img').attr('src', 'img/menubar/malusSnakeBlackNormal.png');
                }
                if (counter === 2) {
                    clearInterval(intervalAnimCountMalusSnakeBlack);
                }
            }, 500);
        } else {
            $('#stat #countMalusSnakeBlack img').attr('src', 'img/menubar/malusSnakeBlackNormal.png');
        }
    };
}

////MalusSnakeBlack.prototype = Shape.prototype;