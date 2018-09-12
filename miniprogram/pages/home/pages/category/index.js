const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');

var app = getApp()
Page({
  data: {
    currentTab: 0,
    lanmuList:[],
    newsList:[],
    hideHeader: true,
    hideBottom: true,
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……',
    windowWidth: wx.getSystemInfoSync().windowWidth, // 宽度,
    windowHeight: wx.getSystemInfoSync().windowHeight, // 高度,    
    pageSize: 8,
    server: config.server,
  },
  //分享
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: app.hospitalData.name,
      path: '/pages/home/pages/index/index?scene=' + app.globalData.hospitalid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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
     that.getData();
    }, { "hospitalid": app.globalData.hospitalid });
  },


  // 上拉加载更多
  loadMore: function () {
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '没有更多内容了',
        hideBottom: false
      });

    } else {
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false
      });
      self.getData();
    }
  },
  // 下拉刷新
  refresh: function (e) {
    var self = this;
    var date = new Date();
    self.setData({
      currentPage: 1,
      refreshTime: date.toLocaleTimeString(),
      hideHeader: false
    })
    self.getData();

  },
  // 获取数据  pageIndex：页码参数
  getData: function () {
    var self = this;
    var pageIndex = self.data.currentPage;
    util.AJAX("/category/articleList", function (res1) {
      var newsList = res1.data.data.list;
      for (var i = 0; i < newsList.length; i++) {
        newsList[i]['title'] = util.formatStr(newsList[i]['title']);
        newsList[i]['description'] = util.formatStr(newsList[i]['description']);
      }
      if (pageIndex == 1) { // 下拉刷新
        self.setData({
          allPages: Math.ceil((res1.data.data.count * 1.0) / self.data.pageSize),
          newsList: newsList,
          hideHeader: true,
        })
      } else { // 加载更多
        var docrs = self.data.doctorsList;
        docrs = docrs.concat(newsList);
        self.setData({
          allPages: Math.ceil((res1.data.data.count * 1.0) / self.data.pageSize),
          newsList: docrs,
          hideBottom: true,
        });
      }
    }, { "categoryId": this.data.currentTab, "pageSize": this.data.pageSize, "pageNo": pageIndex });
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
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        currentPage:1,
      });
     that.getData();      
    }
  }
})