'use strict';

function ChronoHelper(x, y) {
}
ChronoHelper.updateCount = function () {
    if (initialTime > 0) {
        $('#stat #chrono span').text((new Number(new Date().getTime()) - new Number(initialTime)) / 1000);
    } else {
        $('#stat #chrono span').text('0.000');
    }
};

ChronoHelper.animCount = function () {
    if (initialTime > 0) {
        if ($('#stat #chrono img').attr('src') === 'img/topbar/chronoNormal.png') {
            $('#stat #chrono img').attr('src', 'img/topbar/chronoActive.png');
        } else {
            $('#stat #chrono img').attr('src', 'img/topbar/chronoNormal.png');
        }
    } else {
        $('#stat #chrono img').attr('src', 'img/topbar/chronoNormal.png');
    }
};
