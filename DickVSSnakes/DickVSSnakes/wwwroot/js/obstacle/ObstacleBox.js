'use strict';

function ObstacleBox(x, y) {
    Shape.call(this, 'img/obstacle/obstacleBox.png', 'img/obstacle/obstacleBox.png', x, y, 50, 50);
}

ObstacleBox.prototype = Object.create(Shape.prototype);
