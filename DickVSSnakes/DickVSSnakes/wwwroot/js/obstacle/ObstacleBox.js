function ObstacleBox(x, y) {
    Shape.call(this, 'img/obstacle/obstacleBox.png', 'img/obstacle/obstacleBox.png', x, y, 50, 50);

    ObstacleBox.update = function () {
        for (var i = 0; i < arrayMain.length; i++) {
            var shape = arrayMain[i];
            if (shape instanceof ObstacleBox) {
                shape.draw();
            }
        }
    };
}

////ObstacleBox.prototype = Shape.prototype;