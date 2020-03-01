function Shape(imgPathLeft, imgPathRight, x, y, width, height) {
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
    this.corner1 = new Point(this.x, this.y);
    this.corner2 = new Point(this.x + this.width, this.y);
    this.corner3 = new Point(this.x, this.y + this.height);
    this.corner4 = new Point(this.x + this.width, this.y + this.height);
    this.isFacingLeft = false;
    this.isFacingRight = true;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isWalking = true;
    this.jumpStep = 15;
    this.direction = 0;

    this.frameRunning = 0;
    this.spriteRunning = new Array(1);
    for (let i = 0; i < this.spriteRunning.length; i++) {
        this.spriteRunning[i] = i * 50;
    }

    this.draw = function () {
        if (this.isMovingRight === true) {
            context.drawImage(this.imgRight, this.spriteRunning[this.frameRunning], 0, 50, 50, this.x, this.y, 50, 50);
            this.frameRunning++;
            if (this.frameRunning === this.spriteRunning.length) {
                this.frameRunning = 0;
            }
        } else if (this.isMovingLeft === true) {
            context.drawImage(this.imgLeft, this.spriteRunning[this.frameRunning], 0, 50, 50, this.x, this.y, 50, 50);
            this.frameRunning++;
            if (this.frameRunning === this.spriteRunning.length) {
                this.frameRunning = 0;
            }
        } else {
            this.frameRunning = 0;
            if (this.isFacingLeft === true) {
                context.drawImage(this.imgLeft, this.spriteRunning[this.frameRunning], 0, 50, 50, this.x, this.y, 50, 50);
            }
            if (this.isFacingRight === true) {
                context.drawImage(this.imgRight, this.spriteRunning[this.frameRunning], 0, 50, 50, this.x, this.y, 50, 50);
            }
        }
    };

    this.update = function () {
        this.corner1 = new Point(this.x, this.y);
        this.corner2 = new Point(this.x + this.width, this.y);
        this.corner3 = new Point(this.x, this.y + this.height);
        this.corner4 = new Point(this.x + this.width, this.y + this.height);
    };

    this.unDraw = function () {
        this.imgLeft.src = '';
        this.imgRight.src = '';
        this.x = -100;
        this.y = -100;
        this.update();
    };

    this.setJumping = function () {
        this.isWalking = false;
        this.isMovingUp = true;
        this.isMovingDown = false;
    };

    this.setWalking = function () {
        this.isWalking = true;
        this.isMovingUp = false;
        this.isMovingDown = false;
    };

    this.setX = function (x) {
        if (this.x < x) {
            this.isFacingLeft = false;
            this.isFacingRight = true;
        } else {
            this.isFacingLeft = true;
            this.isFacingRight = false;
        }
        this.x = x;
        this.update();
    };

    this.setY = function (y) {
        this.y = y;
        this.update();
    };

    this.getCollideSide = function (shape) {
        var matchX = false;
        var matchY = false;

        if ((this.corner2.x < shape.corner1.x)
            || (this.corner1.x > shape.corner2.x)
            || (this.corner3.y < shape.corner1.y)
            || (this.corner1.y > shape.corner3.y)) {
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
            }
            if (this.corner2.x >= shape.corner1.x && this.corner1.x < shape.corner1.x) {
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
            }
            if (this.corner3.y >= shape.corner1.y && this.corner1.y < shape.corner1.y) {
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
}
