'use strict';

function Player(i, y, name) {
    Shape.call(this, 'img/player/playerLeft.png', 'img/player/playerRight.png', i, y, 60, 50);

    this.name = name;
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
    ////if (countBonusStar === BonusStar.findAll().length) {
    ////    $('body').trigger('youWonEvent');
    ////    loop = false;
    ////}
    for (var j = 0; j < arrayMain.length; j++) {
        var shape = arrayMain[j];
        var collideSide = this.getCollideSide(shape);
        if (collideSide !== Direction.NONE) {
            if (shape instanceof BonusLife) {
                shape.unDraw();
                countBonusLife += 1;
                TopbarHelper.animCountBonusLife();
            } else if (shape instanceof BonusStar) {
                shape.unDraw();
                countBonusStar += 1;
                TopbarHelper.animCountBonusStar();
            } else if (shape instanceof MalusSnakeBlack) {
                shape.unDraw();
                countBonusLife -= 4;
                countMalusSnakeBlack += 1;
                TopbarHelper.animCountBonusLife();
                TopbarHelper.animCountMalusSnakeBlack();
            } else if (shape instanceof MalusSnakeRed) {
                shape.unDraw();
                countBonusLife -= 3;
                countMalusSnakeRed += 1;
                TopbarHelper.animCountBonusLife();
                TopbarHelper.animCountMalusSnakeRed();
            } else if (shape instanceof MalusSnakeGreen) {
                shape.unDraw();
                countBonusLife -= 2;
                countMalusSnakeGreen += 1;
                TopbarHelper.animCountBonusLife();
                TopbarHelper.animCountMalusSnakeGreen();
            } else if (shape instanceof DecoSea) {
                countBonusLife = 0;
                TopbarHelper.animCountBonusLife();
            } else if (shape instanceof ObstacleGround || shape instanceof ObstacleBox) {
                if (collideSide & Direction.LEFT) {
                    if (this.isMovingLeft) {
                        this.isMovingLeft = false;
                    }
                }
                if (collideSide & Direction.RIGHT) {
                    if (this.isMovingRight) {
                        this.isMovingRight = false;
                    }
                }
                if (collideSide & Direction.TOP) {
                    if (this.isMovingUp && !this.isMovingDown) {
                        this.setY(shape.y + shape.height);
                        this.jumpStep = -1;
                        this.setJumping();
                    }
                }
                if (collideSide & Direction.BOTTOM) {
                    if (!this.isMovingUp && this.isMovingDown) {
                        this.setY(shape.y - this.height);
                        this.setWalking();
                    }
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

    var coef = 10;
    ////if (this.isMovingUp || this.isMovingDown) {
    ////    coef = 5;
    ////}

    // MOVING
    if (this.isMovingRight && this.corner2.x < 1000) {
        this.setX(this.x + coef);
    }
    if (this.isMovingLeft && this.corner1.x > 0) {
        this.setX(this.x - coef);
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
    // DRAWING
    this.draw();
};