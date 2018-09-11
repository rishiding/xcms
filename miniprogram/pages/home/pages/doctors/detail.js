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
    id:'',
    server:config.server,
    deptName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    if (options.hospid != null && options.hospid != undefined && options.hospid != "") {
      util.setHospital(options.hospid);
    }
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
        id: options.id,
        photo: res.data.data.photo,
        deptName: res.data.data.company.name,        
      });
    }, { "id": id });
 
  },

  //分享
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: that.data.name,
      path: '/pages/home/pages/doctors/detail?id=' + that.data.id + "&hospid=" + app.globalData.hospitalid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

  

 
})