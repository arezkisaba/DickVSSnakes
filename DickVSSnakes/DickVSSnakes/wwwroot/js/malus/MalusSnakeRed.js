function MalusSnakeRed(x, y) {
    Shape.call(this, 'img/malus/malusSnakeRedLeft.png', 'img/malus/malusSnakeRedRight.png', x, y, 50, 50);

    MalusSnakeRed.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof MalusSnakeRed) {
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

    MalusSnakeRed.updateCount = function () {
        if (initialTime > 0) {
            $('#stat #countMalusSnakeRed span').text('x ' + countMalusSnakeRed.toString());
        } else {
            $('#stat #countMalusSnakeRed span').text('x 0');
        }
    };

    MalusSnakeRed.animCount = function () {
        if (initialTime > 0) {
            var counter = 0;
            clearInterval(intervalAnimCountMalusSnakeRed);
            intervalAnimCountMalusSnakeRed = self.setInterval(function () {
                counter += 1;
                if ($('#stat #countMalusSnakeRed img').attr('src') === 'img/menubar/malusSnakeRedNormal.png') {
                    $('#stat #countMalusSnakeRed img').attr('src', 'img/menubar/malusSnakeRedActive.png');
                } else {
                    $('#stat #countMalusSnakeRed img').attr('src', 'img/menubar/malusSnakeRedNormal.png');
                }
                if (counter === 2) {
                    clearInterval(intervalAnimCountMalusSnakeRed);
                }
            }, 500);
        } else {
            $('#stat #countMalusSnakeRed img').attr('src', 'img/menubar/malusSnakeRedNormal.png');
        }
    };
}

////MalusSnakeRed.prototype = Shape.prototype;