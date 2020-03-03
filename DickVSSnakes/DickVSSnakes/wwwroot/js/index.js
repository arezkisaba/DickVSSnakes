'use strict';

var $canvas = undefined;
var $context = undefined;
var intervalMain = undefined;
var intervalChrono = undefined;
var popupState = undefined;
var countBonusLife = undefined;
var countStar = undefined;
var currentLevel = 1;
var initialTime = undefined;
var gravity = undefined;
var fps = 30;
var loop = undefined;
var background = undefined;
var arrayMain = undefined;

$(document).ready(function () {
    background = new Image();
    background.src = 'img/background/background-01.png';
    $canvas = $('#canvasGame');
    $context = $canvas[0].getContext('2d');
    loadLevel(currentLevel);
});

$('body').live('keydown', function (e) {
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
    } else if ((keyCode === 37 || keyCode === 81) && !player.isMovingRight && !player.isMovingLeft) {
        player.isMovingLeft = true;
        canStart = true;
    } else if ((keyCode === 39 || keyCode === 68) && !player.isMovingLeft && !player.isMovingRight) {
        player.isMovingRight = true;
        canStart = true;
    } else if (keyCode === 32 && !player.isMovingUp && !player.isMovingDown) {
        player.jumpStep = 14;
        player.setJumping();
        canStart = true;
    } else if (initialTime === 0 && canStart) {
        initialTime = new Number(new Date().getTime());
        intervalChrono = self.setInterval('intervalChronoProc()', 500);
    }
});

$('body').live('keyup', function (e) {
    var player = getCurrentPlayer();
    var keyCode = e.keyCode;
    if (keyCode === 37 || keyCode === 81) {
        player.isMovingLeft = false;
    } else if (keyCode === 39 || keyCode === 68) {
        player.isMovingRight = false;
    }
});

$('body').live('youLoseEvent', function () {
    popupState = PopupState.YOULOSE;
    self.setTimeout(function () {
        $.colorbox({
            href: 'popups/popupYouLose.html',
            close: '',
            onComplete: function () {
                $('#popupYouLose').focus();
            }
        });
    }, 500);
});

$('body').live('youWonEvent', function () {
    popupState = PopupState.YOUWON;
    self.setTimeout(function () {
        $.colorbox({
            href: 'popups/popupYouWon.html',
            close: '',
            onComplete: function () {
                $('#popupYouWon').focus();
            }
        });
    }, 500);
});

$('body').live('endOfGameEvent', function () {
    popupState = PopupState.ENDOFGAME;
    self.setTimeout(function () {
        $.colorbox({
            href: 'popups/popupEndOfGame.html',
            close: '',
            onComplete: function () {
                $('#popupEndOfGame').focus();
            },
            onClosed: function () {
                document.location.reload();
            }
        });
    }, 500);
});

function getCurrentPlayer() {
    for (var i = 0; i < arrayMain.length; i++) {
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
                            case 'CCT':
                                arrayMain.push(new Player(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'BST':
                                arrayMain.push(new Star(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'BLI':
                                arrayMain.push(new BonusLife(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'DSE':
                                arrayMain.push(new DecoSea(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'MSB':
                                arrayMain.push(new MalusSnakeBlack(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'MSR':
                                arrayMain.push(new MalusSnakeRed(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'MSG':
                                arrayMain.push(new MalusSnakeGreen(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'OBO':
                                arrayMain.push(new ObstacleBox(50 * columnIndex, 50 * rowIndex));
                                break;
                            case 'OGR':
                                arrayMain.push(new ObstacleGround(50 * columnIndex, 50 * rowIndex));
                                break;
                            default:
                                break;
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

    $context.drawImage(background, 0, 0, 1000, 600);
    for (let i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        shape.update();
    }
}

function intervalChronoProc() {
    if (!loop) {
        clearInterval(intervalChrono);
    }

    ChronoHelper.updateCount();
    ChronoHelper.animCount();
}
