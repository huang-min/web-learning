!function () {
    window.df = {
        // {
        //     href: 'http://localhost:8888/bb?name=bigbear&memo=helloworld'
        //     protocol: 'http:',
        //     host: 'localhost:8888',
        //     hostname: 'localhost',
        //     port: '8888',
        //     path: '/bb?name=bigbear&memo=helloworld',
        //     pathname: '/bb',
        //     search: '?name=bigbear&memo=helloworld',
        //     query: 'name=bigbear&memo=helloworld',
        // }
        /**
         * 获取查询参数字符串
         * @returns {string}
         */
        getQueryString:function () {
            return window.location.search.substr(1);
        },
        /**
         * 从指定链接${querystr}中获取 key为${name}的value
         * @param querystr 可选,默认当前URL的queryStr.查询参数字符串
         * @param name 必填,参数的键
         * @returns {null} 参数的值
         */
        getQueryData: function(querystr, name) {
            if(typeof name === "undefined"){
                name = querystr
                querystr = window.location.search.substr(1)
            }
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = querystr.match(reg);
            if (r != null) return (r[2]); return null;
        },
        /**
         * 获取当前链接或指定链接${querystr}中 QueryString中全部参数key-value对象值
         * @param querystr 可选,默认当前URL的queryStr. 参数字符串
         * @returns {{}} 全部参数JSON对象
         */
        getQueryParams: function (querystr){
            var reg = new RegExp("([^&?]+=[^&]*)", "gi")
            var str = typeof querystr ==="undefined"?window.location.search.substr(1):querystr;
            var r = str.match(reg);
            var params = {}
            if(r)
                for(var i=0;i< r.length;i++){
                    var kvarr = r[i].toString().split('=')
                    var key = kvarr[0]
                    var value = kvarr[1]
                    params[key] = value;
                }
            return params;
        },
        /**
         * 对指定URL添加一对参数
         * @param url 选填。URL链接，默认为当前URL
         * @param name 参数的键
         * @param value 参数的值
         * @returns {string} 添加参数后的URL
         */
        addQueryData: function(url, name,value) {
            if(typeof value === "undefined"){
                value=name;name=url;url = (window.location.href||window.location).toString();
            }
            return this.mergeParams(url,{name:value})
        },
        /**
         * 对指定URL添加参数对象
         * @param url 选填。URL链接，默认为当前URL
         * @param params 必填,所有添加的JSON对象
         * @returns {string} 添加参数后的URL
         */
        addQueryParams:function (url,params){
            if(typeof params === "undefined"){
                params = url;url = (window.location.href||window.location).toString();
            }
            return this.mergeParams(url,params)
        },
        /**
         * 合并参数,并默认添加_d=datetime的时间戳
         * @param url 必填,URL链接
         * @param params 必填,JSON对象参数
         * @returns {string} 合并参数后的URL
         */
        mergeParams:function (url,params){
            //会默认加一个时间戳
            if(!this.getQueryData(url,"_d")){
                params._d =(new Date()).getTime();
            }
            for(var p in params){
                if(params[p]) {
                    url += url.indexOf('?') > 0 ? '&' : '?';
                    url += p + "=" + params[p];
                }
            }
            return url;
        },
        delCookie:function(name, path, domain) {
            if (df.getCookie(name)) {
                document.cookie = name + '=' +
                    ((path) ? ';path=' + path : '') +
                    ((domain) ? ';domain=' + domain : '') +
                    ';expires=Thu,01-Jan-1970 00:00:01 GMT';
            }
            return;
        },
        getCookie:function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if (arr)
                return unescape(arr[2]);
            else
                return null;
        },
        setCookie:function(c_name, value, expiredays, path) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + value +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=" + path);
            return;
        },

    }
}();

window.browser = (function(){
    var u = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
        Trident:        u.indexOf('Trident') > -1, /*IE内核*/
        Presto:         u.indexOf('Presto') > -1, /*opera内核*/
        WebKit:         u.indexOf('AppleWebKit') > -1, /*苹果、谷歌内核*/
        Gecko:          u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,/*火狐内核*/

        IE:             !!window.attachEvent && !isOpera, /*IE浏览器*/
        Opera:          isOpera, /*Opera浏览器*/
        Firefox:        u.indexOf("Firefox") > -1, /*Firefox浏览器*/
        Chrome:         u.indexOf("Chrome") > -1, /*Chrome浏览器*/
        Safari:         u.indexOf("Safari") > -1, /*Safari浏览器*/
        MobileSafari:   /Apple.*Mobile/.test(u), /*Safari移动浏览器*/

        IOS:            !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/
        Android:        u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/
        iPhone:         u.indexOf('iPhone') > -1 , /*是否为iPhone或者QQHD浏览器*/
        iPad:           u.indexOf('iPad') > -1, /*是否iPad*/
        WeiXin:         u.toLowerCase().indexOf('micromessenger') > -1,/*是否是微信*/
        QQ:             u.toLowerCase().indexOf('qq') > -1,/*是否为QQ*/
        AliPay:         u.indexOf("Alipayclient") > -1, /*是否为支付宝*/
    }
})()

/**
 *
 * 使用实例
 * new Date().format("yyyy-MM-dd hh")
 * //prints 2016-06-23 14
 * new Date().format("yyyy-MM-dd hh:mm:ss.S")
 * //prints 2016-06-23 14:32:08.632
 *
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
Date.prototype.DateDiff = function(strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型
    {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's' :return parseInt((dtEnd - dtStart) / 1000);
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}
Date.prototype.compare = function(date,format){
    var a = parseInt(this.format(format))
    var b = parseInt(date.format(format))
    return a<b?-1:(a>b?1:0);
}
