const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');
//获取应用实例
var app = getApp()
Page({
  data: { 
    latitude: 30.657420, 
    longitude: 104.065840,
    markers: [{
      latitude: 30.657420,
        longitude: 104.065840,
        title: '××××××××××××二期48号'
    }],
    circles: [{
      latitude: 30.657420,
      longitude: 104.065840,
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 3000,
      strokeWidth: 1
    }],
    contact: '丁先生',
    mobile: "1588****451",
    email: "77219569@qq.com",
    address: "××××××××××××二期48号",
    },
  onLoad: function () {
    var that = this; 
    // 幻灯片列表
    util.AJAX("/office/getHospital", function (res) {   
      wx.setNavigationBarTitle({
        title: res.data.data.name,
      })  
      //console.info(res.data.data.remarks);
      //var article = res.data.data.remarks;
      //res.data.data.remarks
      
      // 重新写入数据
      that.setData({
        name: res.data.data.name,
        img: res.data.data.logo,
        address: res.data.data.address,
        contact: res.data.data.master,
        latitude: res.data.data.lat,
        longitude: res.data.data.lot,
        markers: [{
          latitude: res.data.data.lat,
          longitude: res.data.data.lot,
          title: res.data.data.address
        }],
       
        mobile: res.data.data.phone
      });
    }, { "hospitalid": config.hospitalid });
  },
    //打电话
    makePhoneCall: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.mobile,
            success: function () {
                console.log("成功拨打电话")
            }
        })
    }
})
