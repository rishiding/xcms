const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');

var app = getApp()
Page({
  data: {
    currentTab: 0,
    lanmuList:[],
    newsList:[],
    
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
    util.AJAX("/category/categoryList", function (res) {     
     // console.log(res);
      // 重新写入数据
      that.setData({
        currentTab: res.data.data[0]['id'],
        lanmuList: res.data.data
      });
      util.AJAX("/category/articleList", function (res1) {
        var newsList = res1.data.data.list;
        for (var i = 0; i < newsList.length; i++) {

          newsList[i]['title'] = util.formatStr(newsList[i]['title']);
          newsList[i]['description'] = util.formatStr(newsList[i]['description']);
        }
        that.setData({
          newsList: newsList
        });
      }, { "categoryId": res.data.data[0]['id'], "pageSize": 8, "pageNo": 1 });
    },  { "hospitalid": config.hospitalid });
   

  },

  // 上拉加载更多
  loadMore: function (e) {
    var that = this;
    this.setData({ pageNo: this.data.pageNo + 1, loading: false, hasMore: true });

    util.AJAX("/category/categoryList", function (res) {
      if (res.data.data.count > 0) {
      var newsList = res.data.data.list;
        for (var i = 0; i < newsList.length; i++) {
          newsList[i]['title'] = util.formatStr(newsList[i]['title']);
          newsList[i]['description'] = util.formatStr(newsList[i]['description']);
        }
        that.setData({
          newsList: newsList
        });
      }
    }, { "categoryId": this.data.currentTab,"pageSize": this.data.pageSize, "pageNo": this.data.pageNo });
  },
  // 下拉刷新
  refresh: function (e) {
    var that = this;
    this.setData({ pageNo: 1, pageSize: 8, loading: true, hasMore: false });

    util.AJAX("/category/categoryList", function (res) {
      var newsList = res.data.data.list;
      for (var i = 0; i < newsList.length; i++) {
        newsList[i]['title'] = util.formatStr(newsList[i]['title']);
        newsList[i]['description'] = util.formatStr(newsList[i]['description']);
      }
      that.setData({
        newsList: newsList
      });
    }, { "categoryId": this.data.currentTab, "pageSize": this.data.pageSize, "pageNo": this.data.pageNo });;
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
   
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      util.AJAX("/category/articleList", function (res1) {
        // console.log(res);
        // 重新写入数据
        var newsList = res1.data.data.list;
        for (var i = 0; i < newsList.length; i++) {

          newsList[i]['title'] = util.formatStr(newsList[i]['title']);
          newsList[i]['description'] = util.formatStr(newsList[i]['description']);
        }
        that.setData({
          newsList: newsList,
          currentTab: e.target.dataset.current
        });
      }, { "categoryId": e.target.dataset.current, "pageSize": 8, "pageNo": 1 });
      
    }
  }
})