(function(){
    var count= 1;
    this.jsonp=function(url,data,jsonpcallback,callback){
        var cbName='cb'+count++,
            jsonpcbName='window.jsonp.'+cbName;
            var src=tools.padStringToURL(url,data)
        src=tools.padStringToURL(src,jsonpcallback+'='+jsonpcbName);
        var script=document.createElement('script');
            script.src=src;
            script.async='async';
            script.type='text/javascript';
            script.charset='utf-8';
        document.documentElement.appendChild(script);

        window.jsonp[cbName]=function(data){
            try{
                callback(data);
            }finally {
                delete window.jsonp[cbName];
                script.parentNode.removeChild(script);
            }
        }

    };

    var tools={
        encodeToURIString:function(data){
            if(!data){
                return '';
            }
            if(typeof(data)=='string'){
                return data;
            }
            var arr=[];
            for(var n in data){
                if(!data.hasOwnProperty(n))continue;
                arr.push(encodeURIComponent(n)+'='+encodeURIComponent(data[n]));
            }
            return arr.join('&');
        },


        padStringToURL:function(url,param){
            param=tools.encodeToURIString(param);
            if(!param){
                return url;
            }
            return url+(/\?/i.test(url)?'&':'?')+param;
        }
        //padStringToURL: function (url, param) {
        //    param = this.encodeToURIString(param);
        //    if (!param) {
        //        return url;
        //    }
        //    return url + (/\?/.test(url) ? '&' : '?') + param;
        //},
    }
})()