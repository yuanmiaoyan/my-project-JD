
function AutoBanner(curEle,aJaxUrl,interval){
    this.oBox=document.getElementById(curEle);
    this.oImgWrap=this.oBox.getElementsByTagName('div')[0];
    this.oSlideArr=this.oBox.getElementsByTagName('div')[1];
    this.aDiv=this.oImgWrap.getElementsByTagName('div');
    this.aImg=this.oImgWrap.getElementsByTagName('img');
    this.oUl=this.oBox.getElementsByTagName('ul')[0];
    this.aLi=this.oUl.getElementsByTagName('li');
    this.oBtnLeft=this.oSlideArr.getElementsByTagName('a')[0];
    this.oBtnRight=this.oSlideArr.getElementsByTagName('a')[1];
    this.data=null;
    this.step=0;
    this.autoTimer=null;
    this.interval=interval||2000;
    this.ajaxUrl=aJaxUrl;

    return this.init();
}

AutoBanner.prototype={
    constructor:AutoBanner,
    init:function(){
        var _this=this;
        //1.ajax获取和解析数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载
        this.lazyImg();
        //4.自动轮播
        clearInterval(_this.autoTimer);
        this.autoTimer=setInterval(function(){
            _this.autoMove();
        },_this.interval);
        this.setBanner();
        //6.鼠标移入停止，移出继续
        this.stopStart();
        //7.点击焦点手动切换
        this.handleChange();
        //8.左右按钮切换
        this.leftRight();

        return this;
    },
    getData:function getData(){
        var _this=this;
        var xml=new XMLHttpRequest();
        xml.open('get',this.ajaxUrl+'?_='+Math.random(),false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    },
    bind:function bind(){
        var str='';
        var str2='';
        for(var i=0; i<this.data.length; i++){
            var curData=this.data[i];
            str+='<div><a href="#"><img src="" realImg="'+curData.imgSrc+'" alt=""/></a></div>';
            str2+=i==0?'<li class="bg">1</li>':'<li>'+(i+1)+'</li>';
        }
        this.oImgWrap.innerHTML+=str;
        this.oUl.innerHTML+=str2;
    },
    lazyImg:function lazyImg(){
        var _this=this;
        for(var i=0; i<_this.aImg.length; i++){
            (function(index){
                var curImg=_this.aImg[index];
                var oImg=new Image;
                oImg.src=curImg.getAttribute('realImg');
                oImg.onload=function(){
                    curImg.src=this.src;
                    oImg=null;
                    //默认先让第一张图片显示
                    utils.css(_this.aDiv[0],'zIndex',1);
                    animate(_this.aDiv[0],{opacity:1},600)
                }
            })(i);
        }
    },
    autoMove:function autoMove(){
        if(this.step>=this.aDiv.length-1){
            this.step=-1;
        }
        this.step++;
        this.setBanner();
    },
    setBanner:function setBanner(){
        var _this=this;
        for(var i=0; i<_this.aDiv.length; i++){
            var curDiv=_this.aDiv[i];
            if(i===_this.step){
                utils.css(curDiv,'zIndex',1);
                animate(curDiv,{'opacity':1},600,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        utils.css(siblings[i],'opacity',0);
                    }
                });
                continue;
            }
            utils.css(curDiv,'zIndex',0)
        }
        _this.bannerTip();
    },
    bannerTip:function bannerTip(){
        for(var i=0; i<this.aLi.length; i++){
            var curLi=this.aLi[i];
            i===this.step?utils.addClass(curLi,'bg'):utils.removeClass(curLi,'bg');
        }
    },
    stopStart:function stopStart(){
        var _this=this;
        _this.oBox.onmouseover=function(){
            clearInterval(_this.autoTimer);
            utils.css(_this.oBtnLeft,'display','block');
            utils.css(_this.oBtnRight,'display','block');
        };
        _this.oBox.onmouseout=function(){
            _this.autoTimer=setInterval(function(){
                _this.autoMove();
            },_this.interval);
            utils.css(_this.oBtnLeft,'display','none');
            utils.css(_this.oBtnRight,'display','none');
        };
    },
    handleChange:function handleChange(){
        var _this=this;
        for(var i=0; i<_this.aLi.length; i++){
            var curLi=_this.aLi[i];
            curLi.index=i;
            curLi.onclick=function(){
                _this.step=this.index;
                _this.setBanner();
            }
        }
    },
    leftRight:function(){
        var _this=this;
        _this.oBtnRight.onclick=function(){
            _this.autoMove();
        };
        _this.oBtnLeft.onclick=function(){
            if(_this.step<=0){
                _this.step=_this.aDiv.length;
            }
            _this.step--;
            _this.setBanner();
        }
    }


};








