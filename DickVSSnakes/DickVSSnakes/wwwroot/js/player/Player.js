'use strict';

function Player(i, y, name) {
    Shape.call(this, 'img/player/playerLeft.png', 'img/player/playerRight.png', i, y, 60, 50);

    this.name = name;
    this.frameRunning = 0;
    this.spriteRunning = new Array(9);
    for (let i = 0; i < this.spriteRunning.length; i++) {
        this.spriteRunning[i] = i * 60;
    }
}

Player.prototype = Object.create(Shape.prototype);

Player.draw = function () {
    if (this.isMovingRight === true) {
        context.drawImage(this.imgRight, this.spriteRunning[this.frameRunning], 0, 60, 50, this.x, this.y, 60, 50);
        this.frameRunning++;
        if (this.frameRunning === this.spriteRunning.length) {
            this.frameRunning = 0;
        }
    } else if (this.isMovingLeft === true) {
        context.drawImage(this.imgLeft, this.spriteRunning[this.frameRunning], 0, 60, 50, this.x, this.y, 60, 50);
        this.frameRunning++;
        if (this.frameRunning === this.spriteRunning.length) {
            this.frameRunning = 0;
        }
    } else {
        this.frameRunning = 0;
        if (this.isFacingLeft === true) {
            context.drawImage(this.imgLeft, this.spriteRunning[this.frameRunning], 0, 60, 50, this.x, this.y, 60, 50);
        }
        if (this.isFacingRight === true) {
            context.drawImage(this.imgRight, this.spriteRunning[this.frameRunning], 0, 60, 50, this.x, this.y, 60, 50);
        }
    }
};

Player.update = function () {
    for (var i = 0; i < arrayMain.length; i++) {
        var player = arrayMain[i];
        if (player instanceof Player) {
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
                var collideSide = player.getCollideSide(shape);
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
                            if (player.isMovingLeft === true) {
                                player.isMovingLeft = false;
                            }
                        }
                        if (collideSide & Direction.RIGHT) {
                            if (player.isMovingRight === true) {
                                player.isMovingRight = false;
                            }
                        }
                        if (collideSide & Direction.TOP) {
                            if (player.isMovingUp === true && player.isMovingDown === false) {
                                player.setY(shape.y + shape.height);
                                player.jumpStep = -1;
                                player.setJumping();
                            }
                        }
                        if (collideSide & Direction.BOTTOM) {
                            if (player.isMovingUp === false && player.isMovingDown === true) {
                                player.setY(shape.y - player.height);
                                player.setWalking();
                            }
                        }

                        if (player.isWalking === true) {
                            var match = player.getCollideSide(shape);
                            if (match & Direction.BOTTOM) {
                                canFall = false;
                            }
                        }
                    }
                }
            }

            var coef = 10;
            ////if (player.isMovingUp || player.isMovingDown) {
            ////    coef = 5;
            ////}

            // MOVING
            if (player.isMovingRight === true && player.corner2.x < 1000) {
                player.setX(player.x + coef);
            }
            if (player.isMovingLeft === true && player.corner1.x > 0) {
                player.setX(player.x - coef);
            }
            if (player.isMovingUp === true || player.isMovingDown === true) {
                if (player.jumpStep < 0) {
                    player.isMovingUp = false;
                    player.isMovingDown = true;
                } else {
                    player.isMovingUp = true;
                    player.isMovingDown = false;
                }
                player.setY(player.y - player.jumpStep);
                player.jumpStep -= gravity;
            }
            if (player.isWalking === true && canFall === true) {
                player.jumpStep = -1;
                player.setJumping();
            }
            // DRAWING
            player.draw();
        }
    }
};