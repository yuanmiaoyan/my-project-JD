var data = null;
function getData() {
    var xml = new XMLHttpRequest();
    xml.open('get', 'json/subNav.json', false);
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
            data = utils.jsonParse(xml.responseText);
        }
    };
    xml.send(null);
};
getData();

var subNavInner = document.getElementById("subNavInner");
var inner = document.getElementById("inner");
var oItem = inner.getElementsByTagName("div");
var itemSub = document.getElementsByClassName("itemSub");
bind();
function bind() {
    var str = '';
    var str2 = '';
    for (var i = 0, len = data.length; i < len; i++) {
        var curData = data[i];
        var list = curData.list;
        var erleiData = null;
        var sanleiData = null;
        var oPic = null;
        var oBigPic = null;
        for (var k = 0; k < list.length; k++) {
            var curList = list[k];
            str2 += '<div class="item">'
                + '<h2><a href="javascript:;">' + list[k].first + '</a></h2>'
                + '<i>></i>'
                + '<s></s>'
                + '</div>';
            erleiData = curList.erlei;
            sanleiData = curList.sanlei;
            oPic = curList.pic;
            oBigPic = curList.bigPic;
            str += '<div class="itemSub">'
                + '<div class="itemBrands">'
                + '<div class="brands-inner">'
            for (var p = 0; p < oPic.length; p++) {
                str += '<a href="#" target="_blank"><img src="' + oPic[p] + '"></a>'
            }
            str += '</div>'
                + '</div>'
            str += '<div class="itemChannels"><div class="channels">'
            for (var j = 0; j < erleiData.length; j++) {
                str += '<a href="javacript:;" target="_blank">' + erleiData[j] + '<i>&gt;</i></a>'
            }
            str += '</div></div>'
                + '<div class="subItems">'
            for (var m = 0; m < sanleiData.length; m++) {
                var curCategory = sanleiData[m].category;
                var xiaolei = sanleiData[m].xiaolei;
                str += '<dl class="fore1">'
                    + '<dt><a href="javascript:;" target="_blank">' + curCategory + '<i>&gt;</i></a></dt><dd>';
                for (var n = 0; n < xiaolei.length; n++) {
                    str += '<a href="javascript:;" target="_blank">' + xiaolei[n] + '</a>'
                }
                str += '</dd></dl>';
            }
            str += '</div>'
                + '<div class="itemPromotions">';
            for (var b = 0; b < oBigPic.length; b++) {
                str += '<a href="#" target="_blank">'
                    + '<img src="' + oBigPic[b] + '">'
                    + '</a>';
            }

            str += '</div>'
                + '</div>'

        }
        inner.innerHTML = str2;
        subNavInner.innerHTML = str;

    }

}

//hover
hover();
var oDd = document.getElementById("dd");
var as = inner.getElementsByTagName("a");
function hover() {
 for (var i = 0; i < oItem.length; i++) {
     oItem[i].index = i;
     oItem[i].onmouseover = function () {
         subNavInner.style.display="block";
         for (var j = 0; j < itemSub.length; j++) {
             itemSub[j].style.display = "none";
         }
         itemSub[this.index].style.display = "block";
     };
     oItem[i].onmouseout = function () {
         subNavInner.style.display="none";
         itemSub[this.index].style.display = "none";
     };
     itemSub[i].onmouseover = function () {
         subNavInner.style.display="block";
         var n=utils.index(this)
         this.style.display = "block";
         oItem[n].className="item hover";
     }
     itemSub[i].onmouseout = function () {
         subNavInner.style.display="none";
         var m=utils.index(this)
         this.style.display = "none";
         oItem[m].className="item";
     }

     //oDd.onmouseout=function(){
     //    for(var j=0;j<itemSub.length;j++){
     //        itemSub[j].style.display = "none";
     //    }
     //}
 }
/*for (var i=0;i<itemSub.length;i++){
 itemSub[i].style.display="none";
 }*/

}