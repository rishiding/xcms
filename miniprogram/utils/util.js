// 加载配置文件
const config = require('../config.js');

function formatTime(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
    console.log(n);
    n = n.toString();
    return n[1] ? n : '0' + n;
}

// 格式化时间戳
function getTime(timestamp) {
    var time = arguments[0] || 0;
    var t, y, m, d, h, i, s;
    t = time ? new Date(time * 1000) : new Date();
    y = t.getFullYear();    // 年
    m = t.getMonth() + 1;   // 月
    d = t.getDate();        // 日
    h = t.getHours();       // 时
    i = t.getMinutes();     // 分
    s = t.getSeconds();     // 秒

    // 定义时间格式
    var res = new Array();
    
    res['Y'] = y;
    res['m'] = (m < 10 ? '0' + m : m);
    res['d'] = (d < 10 ? '0' + d : d);
    res['H'] = (h < 10 ? '0' + h : h);
    res['i'] = (i < 10 ? '0' + i : i);
    res['s'] = (s < 10 ? '0' + s : s);
    
    return res;
    /* return y
        + '-'
        + (m < 10 ? '0' + m : m)
        + '-'
        + (d < 10 ? '0' + d : d)
        + ' '
        + (h < 10 ? '0' + h : h)
        + ':'
        + (i < 10 ? '0' + i : i)
        + ':'
        + (s < 10 ? '0' + s : s); */
}

module.exports = {

    formatTime: formatTime,
    getTime: getTime,

    AJAX: function (url = '', fn, data = {}, method = "GET", header = {}) {
        wx.request({
            url: config.appApiUrl + url,
            method: method ? method : 'GET',
            data: data,
            header: header ? header : { "Content-Type": "application/json" },
            success: function (res) {
                fn(res);
            }
        });
    },
    /** 转义字符 */
    formatStr: function (str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, "\"");
      s = s.replace(/&ldquo;/g,"“");
      s = s.replace(/&rdquo;/g, "”");
      s = s.replace(/&mdash;/g, "—");
     
      return s;
    },

    /**
     * 获取格式化日期
     * 20161002
     */
    getFormatDate: function (str) {

        // 拆分日期为年 月 日
        var YEAR = str.substring(0, 4),
            MONTH = str.substring(4, 6),
            DATE = str.slice(-2);

        // 拼接为 2016/10/02 可用于请求日期格式
        var dateDay = YEAR + "/" + MONTH + "/" + DATE;

        // 获取星期几
        var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            day = new Date(dateDay).getDay();

      

        return {
            "dateDay": MONTH + "月" + DATE + "日 " + week[day]
        }

    },
}