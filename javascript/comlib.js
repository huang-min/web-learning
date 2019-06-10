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
        MobileSafari:   /Apple.*Mobile/.test(ua), /*Safari移动浏览器*/

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
