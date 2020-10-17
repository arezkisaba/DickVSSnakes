'use strict';

var $gameCanvas = undefined;
var $gameContext = undefined;
var intervalMain = undefined;
var intervalChrono = undefined;
var popupState = undefined;
var countBonusLife = undefined;
var countStar = undefined;
var currentLevel = 1;
var initialTime = 0;
var gravity = undefined;
var fps = 30;
var loop = undefined;
var arrayMain = undefined;

$(document).ready(function () {
    $gameCanvas = $('#gameCanvas');
    $gameContext = $gameCanvas[0].getContext('2d');
    loadLevel(currentLevel);
});

$('body').on('keydown', function (e) {
    var canStart = false;
    var keyCode = e.keyCode;
    var player = getCurrentPlayer();

    if (keyCode === 13) {
        if (popupState === PopupState.YOULOSE) {
            $.colorbox.close();
            currentLevel = 1;
            countBonusLife = 10;
            loadLevel(currentLevel);
        }
        if (popupState === PopupState.YOUWON) {
            $.colorbox.close();
            currentLevel += 1;
            loadLevel(currentLevel);
        }
        if (popupState === PopupState.ENDOFGAME) {
            $.colorbox.close();
        }
    } else if (keyCode === 37 || keyCode === 81) {
        player.direction = Direction.LEFT;
        canStart = true;
    } else if (keyCode === 39 || keyCode === 68) {
        player.direction = Direction.RIGHT;
        canStart = true;
    } else if (keyCode === 32 && !player.isMovingUp && !player.isMovingDown) {
        player.jumpStep = 14;
        player.setJumping();
        canStart = true;
    }

    if (initialTime === 0 && canStart) {
        initialTime = new Date().getTime();
        intervalChrono = self.setInterval('intervalChronoProc()', 100);
    }
});

$('body').on('keyup', function (e) {
    var player = getCurrentPlayer();
    var keyCode = e.keyCode;
    if (keyCode === 37 || keyCode === 81) {
        player.direction = Direction.NONE;
    } else if (keyCode === 39 || keyCode === 68) {
        player.direction = Direction.NONE;
    }
});

$('body').on('youLoseEvent', function () {
    popupState = PopupState.YOULOSE;
    $("#youLoseModal").modal({
        backdrop: 'static',
        keyboard: false
    });
});

$('body').on('youWonEvent', function () {
    popupState = PopupState.YOUWON;
    $("#youWinModal").modal({
        backdrop: 'static',
        keyboard: false
    });
});

$('body').on('endOfGameEvent', function () {
    popupState = PopupState.ENDOFGAME;
    $("#gameFinishedModal").modal({
        backdrop: 'static',
        keyboard: false
    });
});

$('#youLoseModal .btn-primary, #gameFinishedModal .btn-primary').on('click', function () {
    currentLevel = 1;
    countBonusLife = 10;
    loadLevel(currentLevel);
});

$('#youWinModal .btn-primary').on('click', function () {
    currentLevel += 1;
    loadLevel(currentLevel);
});

function getCurrentPlayer() {
    var start = 0;
    var length = arrayMain.length;
    for (var i = start; i < length; i++) {
        var player = arrayMain[i];
        if (player instanceof Player) {
            return player;
        }
    }

    return undefined;
}

function loadLevel(level) {
    $.ajax({
        url: 'gamelevelcount'
    }).done(function (data) {
        if (level > parseInt(data)) {
            $('body').trigger('endOfGameEvent');
        } else {
            countBonusLife = 10;
            countStar = 0;
            initialTime = 0;
            gravity = 1;
            loop = true;
            arrayMain = new Array();
            $.ajax({
                url: 'level/level-' + level + '.txt'
            }).done(function (data) {
                var rows = data.split('\r\n');
                for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                    var row = rows[rowIndex];
                    var columns = row.split(' ');
                    for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                        var column = columns[columnIndex];
                        switch (column) {
                            case 'CCT': arrayMain.push(new Player(50 * columnIndex, 50 * rowIndex)); break;
                            case 'BST': arrayMain.push(new Star(50 * columnIndex, 50 * rowIndex)); break;
                            case 'BLI': arrayMain.push(new BonusLife(50 * columnIndex, 50 * rowIndex)); break;
                            case 'DSE': arrayMain.push(new DecoSea(50 * columnIndex, 50 * rowIndex)); break;
                            case 'MSB': arrayMain.push(new MalusSnakeBlack(50 * columnIndex, 50 * rowIndex)); break;
                            case 'MSR': arrayMain.push(new MalusSnakeRed(50 * columnIndex, 50 * rowIndex)); break;
                            case 'MSG': arrayMain.push(new MalusSnakeGreen(50 * columnIndex, 50 * rowIndex)); break;
                            case 'OBO': arrayMain.push(new ObstacleBox(50 * columnIndex, 50 * rowIndex)); break;
                            case 'OGR': arrayMain.push(new ObstacleGround(50 * columnIndex, 50 * rowIndex)); break;
                            default: break;
                        }
                    }
                }

                clearInterval(intervalMain);
                intervalMain = self.setInterval('intervalMainProc()', fps);
            });
        }
    });
}

function intervalMainProc() {
    if (!loop) {
        clearInterval(intervalMain);
    }

    $gameContext.clearRect(0, 0, 1000, 600);

    var start = 0;
    var length = arrayMain.length;
    for (var i = start; i < length; i++) {
        var shape = arrayMain[i];
        if (shape instanceof Shape) {
            shape.update();
        }
    }
}

function intervalChronoProc() {
    if (!loop) {
        clearInterval(intervalChrono);
    }

    ChronoHelper.updateCount();
}
