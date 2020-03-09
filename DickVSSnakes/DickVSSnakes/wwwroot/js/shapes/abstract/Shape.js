'use strict';

function Shape(imgPathLeft, imgPathRight, x, y, width, height, isMovable) {
    this.imgLeft = new Image();
    this.imgLeft.src = imgPathLeft;
    this.imgRight = new Image();
    this.imgRight.src = imgPathRight;
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isMovable = isMovable;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isWalking = true;
    this.jumpStep = 15;
    this.lastDirection = Direction.NONE;
    this.direction = Direction.NONE;
    this.currentSpriteIndex = 0;
    this.sprites = new Array(1);
    this.hasDrawnAtLeastOneTime = false;

    for (let i = 0; i < this.sprites.length; i++) {
        this.sprites[i] = i * 50;
    }

    this.unDraw = function () {
        this.imgLeft.src = '';
        this.imgRight.src = '';
        this.x = -100;
        this.y = -100;
        this.updateCoordinates();
    };

    this.setJumping = function () {
        this.isMovingUp = true;
        this.isMovingDown = false;
        this.isWalking = false;
    };

    this.setWalking = function () {
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.isWalking = true;
    };

    this.setX = function (x) {
        if (this.x < x) {
            this.Direction = Direction.RIGHT;
        } else {
            this.Direction = Direction.LEFT;
        }

        this.x = x;
        this.updateCoordinates();
    };

    this.setY = function (y) {
        this.y = y;
        this.updateCoordinates();
    };

    this.getCollideSide = function (shape) {
        if (this.corner2.x < shape.corner1.x || this.corner1.x > shape.corner2.x || this.corner3.y < shape.corner1.y || this.corner1.y > shape.corner3.y) {
            return Direction.NONE;
        } else {
            var flags;
            if (this.corner1.x <= shape.corner2.x && this.corner2.x > shape.corner2.x) {
                for (let i = this.corner1.y; i < this.corner3.y; i++) {
                    for (let j = shape.corner1.y; j < shape.corner3.y; j++) {
                        if (i === j) {
                            flags |= Direction.LEFT;
                        }
                    }
                }
            } else if (this.corner2.x >= shape.corner1.x && this.corner1.x < shape.corner1.x) {
                for (let i = this.corner1.y; i < this.corner3.y; i++) {
                    for (let j = shape.corner1.y; j < shape.corner3.y; j++) {
                        if (i === j) {
                            flags |= Direction.RIGHT;
                        }
                    }
                }
            }

            if (this.corner1.y <= shape.corner3.y && this.corner3.y > shape.corner3.y) {
                for (let i = this.corner1.x; i < this.corner2.x; i++) {
                    for (let j = shape.corner1.x; j < shape.corner2.x; j++) {
                        if (i === j) {
                            flags |= Direction.TOP;
                        }
                    }
                }
            } else if (this.corner3.y >= shape.corner1.y && this.corner1.y < shape.corner1.y) {
                for (let i = this.corner1.x; i < this.corner2.x; i++) {
                    for (let j = shape.corner1.x; j < shape.corner2.x; j++) {
                        if (i === j) {
                            flags |= Direction.BOTTOM;
                        }
                    }
                }
            }

            return flags;
        }
    };

    this.updateCoordinates = function () {
        this.corner1 = new Point(this.x, this.y);
        this.corner2 = new Point(this.x + this.width, this.y);
        this.corner3 = new Point(this.x, this.y + this.height);
        this.corner4 = new Point(this.x + this.width, this.y + this.height);
    };

    this.updateCoordinates();
}

Shape.prototype.drawImage = function () {

    if (this.direction === Direction.NONE) {
        var img = this.imgRight;
        if (this.lastDirection === Direction.LEFT) {
            img = this.imgLeft;
        }

        $gameContext.drawImage(img, this.sprites[0], 0, 60, 50, this.x, this.y, 60, 50);
    } else if (this.direction === Direction.RIGHT) {
        $gameContext.drawImage(this.imgRight, this.sprites[this.currentSpriteIndex], 0, 60, 50, this.x, this.y, 60, 50);
        this.currentSpriteIndex++;
        if (this.currentSpriteIndex === this.sprites.length) {
            this.currentSpriteIndex = 0;
        }
    } else if (this.direction === Direction.LEFT) {
        $gameContext.drawImage(this.imgLeft, this.sprites[this.currentSpriteIndex], 0, 60, 50, this.x, this.y, 60, 50);
        this.currentSpriteIndex++;
        if (this.currentSpriteIndex === this.sprites.length) {
            this.currentSpriteIndex = 0;
        }
    }

    this.hasDrawnAtLeastOneTime = true;
};

Shape.prototype.update = function () {
    this.drawImage();
};
