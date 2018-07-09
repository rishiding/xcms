const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');

var app = getApp()
Page({
  data: {
    doctorsList: [],
    windowWidth: wx.getSystemInfoSync().windowWidth, // 宽度,
    windowHeight: wx.getSystemInfoSync().windowHeight, // 高度,
    loading: true,
    hasMore: false,
    pageSize: 8,
    pageNo: 1,
    server: config.server,
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth + "px",
          windowHeight: res.windowHeight + "px",
        });
      }
    });
   
      util.AJAX("/office/getDoctor", function (res1) {
        var doctorsList = res1.data.data.list;
        
        that.setData({
          doctorsList: doctorsList
        });
      }, { "hospitalid": config.hospitalid, "pageSize": this.data.pageSize, "pageNo": this.data.pageNo});    


  },

  // 上拉加载更多
  loadMore: function (e) {
    var that = this;
    this.setData({ pageNo: this.data.pageNo + 1, loading: false, hasMore: true });

    util.AJAX("/office/getDoctor", function (res) {
      if (res.data.data.count > 0) {
        var doctorsList = res.data.data.list;
       
        that.setData({
          doctorsList: doctorsList
        });
      }
    }, { "hospitalid": config.hospitalid,"pageSize": this.data.pageSize, "pageNo": this.data.pageNo });
  },
  // 下拉刷新
  refresh: function (e) {
    var that = this;
    this.setData({ pageNo: 1, pageSize: 8, loading: true, hasMore: false });

    util.AJAX("/office/getDoctor", function (res) {
      var doctorsList = res.data.data.list;
     
      that.setData({
        doctorsList: doctorsList
      });
    }, { "hospitalid": config.hospitalid, "pageSize": this.data.pageSize, "pageNo": this.data.pageNo });;
  }
  
  
})