function MalusSnakeGreen(x, y) {
    Shape.call(this, 'img/malus/malusSnakeGreenLeft.png', 'img/malus/malusSnakeGreenRight.png', x, y, 50, 50);

    MalusSnakeGreen.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof MalusSnakeGreen) {
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

    MalusSnakeGreen.updateCount = function () {
        if (initialTime > 0) {
            $('#stat #countMalusSnakeGreen span').text('x ' + countMalusSnakeGreen.toString());
        } else {
            $('#stat #countMalusSnakeGreen span').text('x 0');
        }
    };

    MalusSnakeGreen.animCount = function () {
        if (initialTime > 0) {
            var counter = 0;
            clearInterval(intervalAnimCountMalusSnakeGreen);
            intervalAnimCountMalusSnakeGreen = self.setInterval(function () {
                counter += 1;
                if ($('#stat #countMalusSnakeGreen img').attr('src') === 'img/menubar/malusSnakeGreenNormal.png') {
                    $('#stat #countMalusSnakeGreen img').attr('src', 'img/menubar/malusSnakeGreenActive.png');
                } else {
                    $('#stat #countMalusSnakeGreen img').attr('src', 'img/menubar/malusSnakeGreenNormal.png');
                }
                if (counter === 2) {
                    clearInterval(intervalAnimCountMalusSnakeGreen);
                }
            }, 500);
        } else {
            $('#stat #countMalusSnakeGreen img').attr('src', 'img/menubar/malusSnakeGreenNormal.png');
        }
    };
}

////MalusSnakeGreen.prototype = Shape.prototype;