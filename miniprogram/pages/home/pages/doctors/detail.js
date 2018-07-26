const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');
var WxParse = require('../../../../vendor/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '#6EBBE7',    
    name:'',
    title:'',
    remarks: '',
    photo:'',
    server:config.server,
    deptName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    util.AJAX("/office/docInfo", function (res) {
      //console.log(res);
      WxParse.wxParse('article', 'html', res.data.data.remarks, that, 5);
      //console.log(res);
      // 重新写入数据
      wx.setNavigationBarTitle({
        title: res.data.data.name,
      });
      that.setData({
        title: util.formatStr(res.data.data.title),
        name: util.formatStr(res.data.data.name),       
       
        photo: res.data.data.photo,
        deptName: res.data.data.company.name,        
      });
    }, { "id": id });
 
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})