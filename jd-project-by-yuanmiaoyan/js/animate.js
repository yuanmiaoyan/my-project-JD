/**
 * Created by yuanmiaoyan on 2016/6/6.
 */

function linear(t, b, c, d) {
    return t / d * c + b;
}
function animate(curEle, obj, duration, callback) {
    duration = duration || 600;
    window.clearInterval(curEle.autoTimer);
    var flag = 0;
    var times = 0;
    var interval = 15;
    var oBegin = {};
    var oChange = {};
    for (var attr in obj) {
        var begin = utils.getCss(curEle, attr);
        var change = obj[attr] - begin;
        if (change) {
            flag++;
            oBegin[attr] = begin;
            oChange[attr] = change;
        }

    }
    if (flag == 0) {
        return;
    }
    function step() {

        times += interval;
        if (times < duration) {
            for (var attr in oBegin) {
                var begin = oBegin[attr];
                var change = oChange[attr];
                var value = linear(times, begin, change, duration);
                utils.setCss(curEle, attr, value);
            }
        } else {
            for (var attr in obj) {
                utils.setCss(curEle, attr, obj[attr]);
            }
            window.clearInterval(curEle.autoTimer);
            if (typeof callback == "function") {
                callback.call(curEle);
            }
        }

    }

    curEle.autoTimer = window.setInterval(step, interval);
}
