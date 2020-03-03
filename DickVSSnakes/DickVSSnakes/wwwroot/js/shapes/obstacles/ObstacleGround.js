'use strict';

function ObstacleGround(x, y) {
    Shape.call(this, 'img/obstacle/obstacleGround.png', 'img/obstacle/obstacleGround.png', x, y, 50, 50);
}

ObstacleGround.prototype = Object.create(Shape.prototype);
