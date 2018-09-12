const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');

var app = getApp();
Page({
  data: {
    hospitalList: [],
    windowWidth: wx.getSystemInfoSync().windowWidth, // 宽度,
    windowHeight: wx.getSystemInfoSync().windowHeight, // 高度,    
    server: config.server,
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '众医康',
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth + "px",
          windowHeight: res.windowHeight + "px",
        });
      }
    });
   
      util.AJAX("/office/hospital", function (res) {
        var hospitalList = res.data;        
        that.setData({
          hospitalList: hospitalList
        });
      });    


  }
  
  
})