'use strict';

var levelUrl = undefined;
var levelCount = undefined;
var canvas = undefined;
var context = undefined;
var intervalMain = undefined;
var intervalChrono = undefined;
var popupState = undefined;
var countBonusLife = 10;
var countBonusStar = undefined;
var countMalusSnakeBlack = undefined;
var countMalusSnakeRed = undefined;
var countMalusSnakeGreen = undefined;
var currentLevel = 1;
var initialTime = undefined;
var gravity = undefined;
var fps = undefined;
var loop = undefined;
var background = undefined;
var arrayMain = undefined;

$(document).ready(function () {
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
            if (player.name === $("#playerList").val()) {
                return player;
            }
        }
    }

    return undefined;
}

function loadLevel(level) {
    $.ajax({
        url: 'gamelevelcount'
    }).done(function (data) {
        levelCount = parseInt(data);
    });

    if (level > levelCount) {
        $('body').trigger('endOfGameEvent');
    } else {
        levelUrl = 'level/level-' + level + '.txt';
        canvas = document.getElementById('canvasGame');
        context = canvas.getContext('2d');
        //countBonusLife = 10;
        countBonusStar = 0;
        countMalusSnakeBlack = 0;
        countMalusSnakeRed = 0;
        countMalusSnakeGreen = 0;
        initialTime = 0;
        gravity = 1;
        fps = 30;
        loop = true;
        background = new Image();
        background.src = 'img/background/background-01.png';
        arrayMain = new Array();
        $.ajax({
            url: levelUrl
        }).done(function (data) {
            var rows = data.split('\r\n');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var cols = row.split(' ');
                for (var j = 0; j < cols.length; j++) {
                    var col = cols[j];
                    switch (col) {
                        case 'CCT': arrayMain.push(new Player(50 * j, 50 * i, 'player' + j)); break;
                        case 'BLI': arrayMain.push(new BonusLife(50 * j, 50 * i)); break;
                        case 'BST': arrayMain.push(new BonusStar(50 * j, 50 * i)); break;
                        case 'DSE': arrayMain.push(new DecoSea(50 * j, 50 * i)); break;
                        case 'MSB': arrayMain.push(new MalusSnakeBlack(50 * j, 50 * i)); break;
                        case 'MSR': arrayMain.push(new MalusSnakeRed(50 * j, 50 * i)); break;
                        case 'MSG': arrayMain.push(new MalusSnakeGreen(50 * j, 50 * i)); break;
                        case 'OBO': arrayMain.push(new ObstacleBox(50 * j, 50 * i)); break;
                        case 'OGR': arrayMain.push(new ObstacleGround(50 * j, 50 * i)); break;
                        default: break;
                    }
                }
            }

            Chrono.updateCount();
            clearInterval(intervalMain);
            intervalMain = self.setInterval('intervalMainProc()', fps);

            $('#playerList').empty();
            for (var k = 0; k < arrayMain.length; k++) {
                var player = arrayMain[k];
                if (player instanceof Player) {
                    $('#playerList').append('<option value="' + player.name + '">' + player.name + '</option>');
                }
            }
        });
    }
}

function intervalMainProc() {
    if (!loop) {
        clearInterval(intervalMain);
    }

    context.drawImage(background, 0, 0, 1000, 600);

    TopbarHelper.updateCountBonusLife();
    TopbarHelper.updateCountBonusStar();
    TopbarHelper.updateCountMalusSnakeBlack();
    TopbarHelper.updateCountMalusSnakeRed();
    TopbarHelper.updateCountMalusSnakeGreen();

    for (let i = 0; i < arrayMain.length; i++) {
        var shape = arrayMain[i];
        shape.update();
    }
}

function intervalChronoProc() {
    if (!loop) {
        clearInterval(intervalChrono);
    }

    Chrono.updateCount();
    Chrono.animCount();
}
