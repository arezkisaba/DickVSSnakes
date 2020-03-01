function Chrono(x, y) {
}
Chrono.updateCount = function () {
    if (initialTime > 0) {
        $('#stat #chrono span').text((new Number(new Date().getTime()) - new Number(initialTime)) / 1000);
    } else {
        $('#stat #chrono span').text('0.000');
    }
};

Chrono.animCount = function () {
    if (initialTime > 0) {
        if ($('#stat #chrono img').attr('src') === 'img/menubar/chronoNormal.png') {
            $('#stat #chrono img').attr('src', 'img/menubar/chronoActive.png');
        } else {
            $('#stat #chrono img').attr('src', 'img/menubar/chronoNormal.png');
        }
    } else {
        $('#stat #chrono img').attr('src', 'img/menubar/chronoNormal.png');
    }
};
