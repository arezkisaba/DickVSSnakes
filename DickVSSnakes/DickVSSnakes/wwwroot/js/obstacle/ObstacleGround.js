function ObstacleGround(x, y) {
    Shape.call(this, 'img/obstacle/obstacleGround.png', 'img/obstacle/obstacleGround.png', x, y, 50, 50);

    ObstacleGround.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof ObstacleGround) {
                shape.draw();
            }
        }
    };
}

////ObstacleGround.prototype = Shape.prototype;