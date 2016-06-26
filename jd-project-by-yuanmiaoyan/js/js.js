//floor01
var oFloor01 = document.getElementById("floor01");
var oFloor01Children = oFloor01.children;
var aImgs = oFloor01.getElementsByTagName("img");
var elevator = document.getElementById("elevator");
var elevatorLis = elevator.getElementsByTagName("li");
//topBanner 消失
(function () {
    var oCloseBtn = document.getElementById("topBannerCloseBtn");
    var topBanner = document.getElementById("topBanner");
    oCloseBtn.onclick = function () {
        animate(topBanner, {"opacity": 0}, 300, function () {
            this.style.display = "none";
        })
    }
})();
////搜索框
(function () {
    var searchTxt = document.getElementById("searchTxt")
    new InputValue(searchTxt, "平板电视");
    //电话号码
    var phoneNumber = document.getElementById("phoneNumber")
    new InputValue(phoneNumber, "移动、联通、电信");
})();
//大焦点图的懒加载及渐隐渐现效果
new AutoBanner("bigBanner", 'json/banner.json', 2000);
(function () {
    //floor #楼层懒加载及焦点图切换
    var oTop = oFloor01.offsetTop;
    var oElevator = document.getElementById("elevator")
    var winBottom=utils.win('scrollTop') + utils.win('clientHeight');
    window.onscroll = function () {
        winBottom = utils.win('scrollTop') + utils.win('clientHeight');
        for (var i = 0; i < aImgs.length; i++){
            var cur=aImgs[i];
            lazy(cur,winBottom);
        }
        var winBottom1 = utils.win('scrollTop');
        if (winBottom1 >= oTop) {
            oElevator.style.display = "block";
        } else {
            oElevator.style.display = "none";
        }
        computedDisplay();
    };
    /*function lazy(winBottom) {
     var curT = utils.offset(oFloor01).top + oFloor01.offsetHeight / 2;
     if (curT <= winBottom) {
     for (var i = 0; i < aImgs.length; i++) {
     (function (index) {
     var curImg = aImgs[index];
     var oImg = new Image;
     oImg.src = curImg.getAttribute('realImg');
     oImg.onload = function () {
     for (var j = 0; j < oFloor01Children.length; j++) {
     oFloor01Children[j].style.display = "block";
     }
     curImg.src = this.src;
     oImg = null;
     }
     })(i);
     }
     }
     }*/
    for (var i = 0; i < aImgs.length; i++){
        var cur=aImgs[i];
        lazy(cur,winBottom);
    }
    function lazy(curImg,winBottom) {
        var curT = utils.offset(oFloor01).top + oFloor01.offsetHeight / 4;
        /*if (curT <= winBottom) {*/
        if(winBottom>=curT){
           /* for (var i = 0; i < aImgs.length; i++) {*/
                /*(function (index) {*/
                    //var curImg = aImgs[index];
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute('realImg');
                    oImg.onload = function () {
                        for (var j = 0; j < oFloor01Children.length; j++) {
                            oFloor01Children[j].style.display = "block";
                        }
                        curImg.setAttribute('src',this.src);
                        //curImg.src = this.src;
                        oImg = null;
                    }
                /*})(i);*/
           /* }*/
        }
    }

    for (var i = 1; i < 10; i++) {
        new StepBanner("floor01Banner0" + i, 'json/stepBanner.json', 3000 - 100 * i, 439);
    }
    /*new stepBanner("floor01Banner01", 'json/stepBanner.json', 2000);
     new stepBanner("floor01Banner02", 'json/stepBanner.json', 1500);
     new stepBanner("floor01Banner03", 'json/stepBanner.json', 2500);
     new stepBanner("floor01Banner04", 'json/stepBanner.json', 1100);
     new stepBanner("floor01Banner05", 'json/stepBanner.json', 4000);
     new stepBanner("floor01Banner06", 'json/stepBanner.json', 3000);
     new stepBanner("floor01Banner07", 'json/stepBanner.json', 1500);
     new stepBanner("floor01Banner08", 'json/stepBanner.json', 1000);
     new stepBanner("floor01Banner09", 'json/stepBanner.json', 1300);*/
})();
//热门晒单轮播
(function () {

    var shareConInner = document.getElementById("shareConInner");
    var step = 0;
    var first = utils.children(shareConInner)[0].cloneNode(true);
    var second = utils.children(shareConInner)[1].cloneNode(true);
    var len = utils.children(shareConInner).length;
    shareConInner.appendChild(first);
    shareConInner.appendChild(second);
    shareConInner.height = first.offsetHeight * len + "px";
    function autoTop() {
        step--;
        if (step < 0) {
            step = len - 1;
            utils.css(shareConInner, "top", -first.offsetHeight * len)
        }
        animate(shareConInner, {"top": -120 * step}, 600)
    }

    timer = window.setInterval(autoTop, 5000)
})();
//lifeTabs//生活服务
(function () {
    var hoverShowWrap = document.getElementById("hoverShowWrap");
    var behinds = utils.children(hoverShowWrap);
    var lifeTabs = document.getElementById("lifeTabs");
    var lifeTabsI = lifeTabs.getElementsByTagName("i");
    var behindTabs = document.getElementById("behindTabs");
    var oLis = behindTabs.getElementsByTagName("li");
    var child = utils.children(lifeTabs);
    var aSpans = lifeTabs.getElementsByTagName("span");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].onmouseover = function () {
            for (var i = 0; i < oLis.length; i++) {
                oLis[i].className = '';
            }
            this.className = "selected"
        }

    }
    for (var i = 0; i < 4; i++) {
        child[i].index = i;
        utils.removeClass(child[i], "current");

        child[i].onclick = function () {
            utils.addClass(this, "current");
            for (var j = 0; j < utils.siblings(this).length; j++) {
                utils.removeClass(utils.siblings(this)[j], "current")
            }
            var z = 0;
            behinds[0].style.zIndex = 0
            behinds[1].style.zIndex = 0
            behinds[2].style.zIndex = 0
            behinds[3].style.zIndex = 0
            for (var c = 0; c < 4; c++) {
                animate(behinds[c], {"bottom": 0, "zIndex": 0}, 200, function () {
                    lifeTabsI[0].style.height = 0;
                    lifeTabsI[0].parentNode.style.paddingTop = 0;
                    lifeTabsI[1].style.height = 0;
                    lifeTabsI[1].parentNode.style.paddingTop = 0;
                    lifeTabsI[2].style.height = 0;
                    lifeTabsI[2].parentNode.style.paddingTop = 0;
                    lifeTabsI[3].style.height = 0;
                    lifeTabsI[3].parentNode.style.paddingTop = 0;
                    for (var a = 0; a < aSpans.length; a++) {
                        aSpans[a].style.borderBottom = "1px solid #ccc";
                    }
                })
            }
            animate(behinds[this.index], {"bottom": 0, "zIndex": 1}, 200)
        }
    }
    hoverShowWrap.onclick = function (e) {
        e = e || window.event;
        var tar = e.target;
        if (tar.className == "close") {
            for (var a = 0; a < aSpans.length; a++) {
                aSpans[a].style.borderBottom = 0;
            }
            for (var key in behinds) {
                utils.removeClass(child[key], "current")
                animate(behinds[key], {"bottom": -188}, 200, function () {
                    lifeTabsI[0].style.height = 25 + "px";
                    lifeTabsI[0].parentNode.style.paddingTop = 13 + "px";
                    lifeTabsI[1].style.height = 25 + "px";
                    lifeTabsI[1].parentNode.style.paddingTop = 13 + "px";
                    lifeTabsI[2].style.height = 25 + "px";
                    lifeTabsI[2].parentNode.style.paddingTop = 13 + "px";
                    lifeTabsI[3].style.height = 25 + "px";
                    lifeTabsI[3].parentNode.style.paddingTop = 13 + "px";
                })
            }
        }
    }

})();
//楼层选项卡
(function(){
new Tab("floor01");
new Tab("floor02");
new Tab("floor03");
new Tab("floor04");
function Tab(tabId) {
    var oFloor = document.getElementById(tabId);
    //普通法
    /*var oTab = document.getElementById("tab");
     var oLis = oTab.getElementsByTagName("li");
     var oFloor01 = document.getElementById("floor01");
     var oFloorCon = utils.children(oFloor01)[1];
     var child = utils.children(oFloorCon)
     for (var i = 0; i < oLis.length; i++) {
     oLis[i].index = i;
     oLis[i].onmouseover = function () {
     for (var j = 0; j < oLis.length; j++) {
     utils.removeClass(oLis[j], "tabItemSelected")
     utils.removeClass(child[j], "show")
     }
     utils.addClass(this, "tabItemSelected");
     utils.addClass(child[this.index], "show");
     }
     }*/
    //事件委托
    oFloor.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement, tarTag = tar.parentNode, tagName = tarTag.tagName.toUpperCase();
        var child = utils.getByClass(oFloor, "floorConInner");
        if (tagName == "LI") {
            var oLis = utils.children(tarTag.parentNode);
            for (var j = 0; j < oLis.length; j++) {
                utils.removeClass(oLis[j], "tabItemSelected")
                utils.removeClass(child[j], "show")
            }
            var index = utils.index(tarTag);
            utils.addClass(oLis[index], "tabItemSelected");
            utils.addClass(child[index], "show");
        }
    }
}
})();
//右侧的回到顶部
(function () {
    var oBtn = document.getElementById('scrollT');
    var toolBarWrap = document.getElementById('toolBarWrap');
// window.onscroll=computedDisplay;
    function computedDisplay() {
        if (utils.win('scrollTop') >= utils.win('clientHeight')) {
            toolBarWrap.style.display = 'block';
        } else {
            toolBarWrap.style.display = 'none';
        }
    }
    window.computedDisplay=computedDisplay;
    oBtn.onclick = function () {
        //this.style.display='none';
        window.onscroll = null;
        var duration = 500;
        var interval = 10;
        var target = utils.win('scrollTop');
        var step = (target / duration) * interval;
        var timer = setInterval(function () {
            var curT = utils.win('scrollTop');
            if (curT <= 0) {
                clearInterval(timer);
                window.onscroll = computedDisplay;
                return;
            }
            curT -= step;
            utils.win('scrollTop', curT);
        }, interval)
    }
})();







