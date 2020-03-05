'use strict';

function ObstacleBox(x, y) {
    Shape.call(this, 'img/shapes/obstacle/obstacleBox.png', 'img/shapes/obstacle/obstacleBox.png', x, y, 50, 50, false);
}

ObstacleBox.prototype = Object.create(Shape.prototype);
