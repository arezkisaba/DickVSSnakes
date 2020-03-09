'use strict';

function Player(i, y) {
    Shape.call(this, 'img/shapes/player/playerLeft.png', 'img/shapes/player/playerRight.png', i, y, 60, 50, true);

    this.currentSpriteFrameIndex = 0;
    this.sprites = new Array(9);
    for (let i = 0; i < this.sprites.length; i++) {
        this.sprites[i] = i * 60;
    }
}

Player.prototype = Object.create(Shape.prototype);

Player.prototype.update = function () {
    var canFall = true;
    if (countBonusLife <= 0) {
        countBonusLife = 0;
        $('body').trigger('youLoseEvent');
        loop = false;
    }
    ////if (countStar === Star.findAll().length) {
    ////    $('body').trigger('youWonEvent');
    ////    loop = false;
    ////}

    var start = 0;
    var length = arrayMain.length;
    for (var i = start; i < length; i++) {
        var shape = arrayMain[i];
        var collideSide = this.getCollideSide(shape);
        if (collideSide !== Direction.NONE) {
            if (shape instanceof DecoSea) {
                countBonusLife = 0;
                TopbarHelper.updateCountBonusLife();
                TopbarHelper.animCountBonusLife();
            } else if (shape instanceof Star) {
                shape.unDraw();
                countStar += 1;
            } else if (shape instanceof BonusMalus) {
                shape.unDraw();

                if (shape instanceof Malus && collideSide & Direction.BOTTOM) {
                    this.jumpStep = 14;
                    this.setJumping();
                } else {
                    countBonusLife += shape.getLifeImpactAmount();
                    TopbarHelper.updateCountBonusLife();
                    TopbarHelper.animCountBonusLife();
                }
            } else if (shape instanceof ObstacleGround || shape instanceof ObstacleBox) {
                if (collideSide & Direction.LEFT && this.direction === Direction.LEFT) {
                    this.direction = Direction.NONE;
                }

                if (collideSide & Direction.RIGHT && this.direction === Direction.RIGHT) {
                    this.direction = Direction.NONE;
                }

                if (collideSide & Direction.TOP && this.isMovingUp && !this.isMovingDown) {
                    this.setY(shape.y + shape.height);
                    this.jumpStep = -1;
                    this.setJumping();
                }

                if (collideSide & Direction.BOTTOM && !this.isMovingUp && this.isMovingDown) {
                    this.setY(shape.y - this.height);
                    this.setWalking();
                }

                if (this.isWalking) {
                    var match = this.getCollideSide(shape);
                    if (match & Direction.BOTTOM) {
                        canFall = false;
                    }
                }
            }
        }
    }

    console.log(this.direction);

    var coef = 10;
    if (this.direction === Direction.RIGHT && this.corner2.x < 1000) {
        this.setX(this.x + coef);
        this.lastDirection = Direction.RIGHT;
        this.direction = this.lastDirection;
    } else if (this.direction === Direction.LEFT && this.corner1.x > 0) {
        this.setX(this.x - coef);
        this.lastDirection = Direction.LEFT;
        this.direction = this.lastDirection;
    } else {
        this.direction = Direction.NONE;
    }

    if (this.isMovingUp || this.isMovingDown) {
        if (this.jumpStep < 0) {
            this.isMovingUp = false;
            this.isMovingDown = true;
        } else {
            this.isMovingUp = true;
            this.isMovingDown = false;
        }

        this.setY(this.y - this.jumpStep);
        this.jumpStep -= gravity;
    }

    if (this.isWalking && canFall) {
        this.jumpStep = -1;
        this.setJumping();
    }

    this.drawImage();
};
