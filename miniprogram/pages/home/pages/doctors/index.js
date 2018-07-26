const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');

var app = getApp()
Page({
  data: {
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    doctorsList: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    windowHeight: wx.getSystemInfoSync().windowHeight,
    pageSize: 8,
    loadMoreData: '加载更多……',
    server: config.server,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    });
    this.getData();
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
     
    }else{             
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
    util.AJAX("/office/getDoctor", function (res1) {      
      if (pageIndex == 1) { // 下拉刷新
        self.setData({
          allPages: Math.ceil((res1.data.data.count * 1.0) / self.data.pageSize),
          doctorsList: res1.data.data.list,
          hideHeader: true,
        })
      } else { // 加载更多
        var docrs = self.data.doctorsList;
        docrs = docrs.concat(res1.data.data.list);
        self.setData({
          allPages: Math.ceil((res1.data.data.count * 1.0) / self.data.pageSize),
          doctorsList: docrs,
          hideBottom: true,
        })
      }
     
    }, { "hospitalid": app.globalData.hospitalid, "pageSize": this.data.pageSize, "pageNo": pageIndex });    
  }
  
})