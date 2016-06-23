var utils = (function () {
    function getCss(ele, attr) {
        var val = null, reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == "opacity") {
                //filter :alpha(opacity = 50.5);
                val = ele.currentStyle["filter"];
                reg = /alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? RegExp.$1 / 100 : 1;
            }else{
                val = ele.currentStyle[attr];
            }

        }
        reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(ele,attr,value){
        if(attr =="opacity"){
            ele.style["opacity"] = value;
            ele.style["filter"] = "alpha(opacity = "+value*100+")";
        }else if(attr =="float"){
            ele.style["cssFloat"] = value;//标准浏览器
            ele.style["styleFloat"] = value;//ie浏览器
        }else{
            var reg = /(width|height|top|right|bottom|left|(margin|padding)(Top|Right|Bottom|Left)?)/;
            if(reg.test(attr)){
                if(!isNaN(value)){
                    ele.style[attr] = value+"px";
                }
            }else{
                ele.style[attr] = value;
            }
        }
    }


     return {
         getCss : getCss,
         setCss : setCss
     }
})()
