function stepBanner(id, ajaxUrl, interval,w) {
    this.oBox = document.getElementById(id);
    this.oFloor = this.oBox.parentNode.parentNode.parentNode;
    this.oImgWrap = this.oBox.getElementsByTagName('div')[0];
    this.oSlideArr = this.oBox.getElementsByTagName('div')[1];
    this.aDiv = this.oImgWrap.getElementsByTagName('div');
    this.aImg = this.oImgWrap.getElementsByTagName('img');
    this.oUl = this.oBox.getElementsByTagName('ul')[0];
    this.aLi = this.oUl.getElementsByTagName('li');
    this.oBtnLeft = this.oSlideArr.getElementsByTagName('a')[0];
    this.oBtnRight = this.oSlideArr.getElementsByTagName('a')[1];
    this.autoTimer = null;
    this.step = 0;
    this.data = null;
    this.setTimer = null;
    this.ajaxUrl = ajaxUrl;
    this.interval = interval || 3000;
    this.w=w;
    return this.init();
}
stepBanner.prototype = {
    constructor: stepBanner,
    init: function () {
        var _this = this;
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bind();
        //设置oImgWrap的宽度；
        this.oImgWrap.style.width = this.aDiv.length * this.w + 'px';
        //3.延迟加载数据：
        this.setTimer = setTimeout(function () {
            _this.lazyImg();
        }, 500);
        //4.图片自动轮播
        clearInterval(_this.autoTimer);
        this.autoTimer = setInterval(function () {
            _this.autoMove();
        }, _this.interval);
        //5.焦点自动轮播
        this.bannerTip();
        //6.鼠标移入停止，移出继续
        this.stopStart();
        //7.点击焦点手动切换图片
        this.handleChange();
        //8.左右按钮切换
        this.leftRight();

        return this;
    },
    getData: function getData() {
        var _this = this;
        var xml = new XMLHttpRequest();
        xml.open('get', this.ajaxUrl + '?_=' + Math.random(), false);
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                _this.data = utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    },
    bind: function bind() {
        var str = '';
        var str2 = '';
        for (var i = 0; i < this.data.length; i++) {
            str += '<div><a href="javascript:;"><img src="" realImg="' + this.data[i].imgSrc + '" alt=""/></a></div>';
            str2 += i === 0 ? '<li class="bg"></li>' : '<li></li>';
        }
        str += '<div><img src="" realImg="' + this.data[0].imgSrc + '" alt=""/></div>'
        this.oImgWrap.innerHTML = str;
        this.oUl.innerHTML = str2;
    },
    lazyImg: function lazyImg() {
        var _this=this;
        for(var i=0; i<_this.aImg.length; i++){
            (function(index){
                var curImg=_this.aImg[index];
                var oImg=new Image;
                oImg.src=curImg.getAttribute('realImg');
                oImg.onload=function(){
                    curImg.src=this.src;
                    oImg=null;
                }
            })(i);
        }
    },

    autoMove: function autoMove() {
        if (this.step >= this.aDiv.length - 1) {
            this.step = 0;
            utils.css(this.oImgWrap, 'left', 0);//当step到达最大值时，让他等于0；同时快速拉回图片到0的位置，此时一定不能用运动
        }
        this.step++;

        animate(this.oImgWrap, {'left': -this.step * this.w}, 500);
        this.bannerTip();
        ;
    },
    bannerTip: function bannerTip() {
        var tempStep = this.step >= this.aLi.length ? 0 : this.step;
        for (var i = 0; i < this.aLi.length; i++) {
            var curLi = this.aLi[i];
            i === tempStep ? utils.addClass(curLi, 'bg') : utils.removeClass(curLi, 'bg');
        }
    },
    stopStart: function stopStart() {
        var _this = this;
        _this.oBox.onmouseover = function () {
            clearInterval(_this.autoTimer);
            utils.css(_this.oBtnLeft, 'display', 'block');
            utils.css(_this.oBtnRight, 'display', 'block');
        };
        _this.oBox.onmouseout = function () {
            _this.autoTimer = setInterval(function () {
                _this.autoMove();
            }, _this.interval);
            utils.css(_this.oBtnLeft, 'display', 'none');
            utils.css(_this.oBtnRight, 'display', 'none');
        };
    },
    handleChange: function handleChange() {
        var _this = this;
        for (var i = 0; i < _this.aLi.length; i++) {
            var curLi = _this.aLi[i];
            curLi.index = i;
            curLi.onclick = function () {
                _this.step = this.index;
                animate(_this.oImgWrap, {'left': -_this.step * this.w}, 500, 1);
                _this.bannerTip();
            }
        }
    },
    leftRight: function leftRight() {
        var _this = this;
        _this.oBtnRight.onclick = function () {
            _this.autoMove();
        };
        _this.oBtnLeft.onclick = function () {
            if (_this.step <= 0) {
                _this.step = _this.aDiv.length - 1;
                utils.css(_this.oImgWrap, 'left', -_this.step * this.w)
            }
            _this.step--;
            animate(_this.oImgWrap, {'left': -_this.step * this.w}, 500);
            _this.bannerTip();
        };
    }


}