/**
 * Created by yuanmiaoyan on 2016/6/13.
 */
(function(){
    //登录
    var loginTxt = document.getElementById("loginTxt");
    var loginPsw = document.getElementById("loginPsw");
    loginTxt.onfocus = function () {
        this.parentNode.className = "item item1 focus"
    };
    loginPsw.onfocus = function () {
        this.parentNode.className = "item item2 focus"
    }
    loginTxt.onblur = function () {
        this.parentNode.className = "item item1"
    };
    loginPsw.onblur = function () {
        this.parentNode.className = "item item2"
    }
})();