const util = require('../../../../utils/util.js');
var WxParse = require('../../../../vendor/wxParse/wxParse.js');

//获取应用实例
var app = getApp()

Page({
    data: {
        title:"",
        createDate:"",
        hits:0,
        id:"",
        post: {}
    },
    onLoad: function (options) {
        var that = this;
        var id = options.id;    
    
        util.AJAX("/category/getArticle", function (res) {
          WxParse.wxParse('article', 'html', res.data.data.articleData.content, that, 5);
            
            //console.log(res);
            // 重新写入数据
            that.setData({
              title: util.formatStr(res.data.data.title),
              createDate: res.data.data.createDate,
              hits: res.data.data.hits,
              id: options.id,
              post: res.data.data
            });
        },{"id": id});
    },

  //分享
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: that.data.title,
      path: '/pages/home/pages/index/index?scene=' + app.globalData.hospitalid,     
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})