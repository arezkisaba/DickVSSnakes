'use strict';

function ObstacleGround(x, y) {
    Shape.call(this, 'img/shapes/obstacle/obstacleGround.png', 'img/shapes/obstacle/obstacleGround.png', x, y, 50, 50);
}

ObstacleGround.prototype = Object.create(Shape.prototype);
