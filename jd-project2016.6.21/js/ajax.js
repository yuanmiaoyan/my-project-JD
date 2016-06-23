function ajax(options) {
    //->参数初始化:我们本方法需要传递的参数比较的多,那么我们就传递一个对象,但是并不是所有的参数都需要传递,我们配置一个默认的值,把我们传递进来的值替换默认值
    var _default = {
        type: "get",
        url: "",
        async: true,
        data: null,
        success: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }

    //->写具体的业务逻辑
    var xhr = new XMLHttpRequest;
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var data = "JSON" in window ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")");
            if (typeof _default.success === "function") {
                _default.success(data);
            }
        }
    };
    xhr.send(_default.data);
}