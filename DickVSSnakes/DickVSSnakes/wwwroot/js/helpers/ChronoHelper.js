'use strict';

function ChronoHelper() {
}

ChronoHelper.updateCount = function () {
    $('#stat #chrono span').text(((new Date().getTime() - initialTime) / 1000).toFixed(2));
};
