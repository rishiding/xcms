
//获取应用实例
var app = getApp()
Page({
  data: { 
    latitude: 30.657420, 
    longitude: 104.065840,
    markers: [{
      latitude: 30.657420,
        longitude: 104.065840,
        title: ''
    }],
    circles: [{
      latitude: 30.657420,
      longitude: 104.065840,
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 3000,
      strokeWidth: 1
    }],
    contact: '',
    mobile: '',
    email: "delifu@qq.com",
    address: "",
    },
  onLoad: function () {
    var that = this;     
      wx.setNavigationBarTitle({
        title: app.hospitalData.name,
      });   
          
      
      // 重新写入数据
      that.setData({
        name: app.hospitalData.name,
        img: app.hospitalData.logo,
        address: app.hospitalData.address,
        contact: app.hospitalData.master,
        latitude: app.hospitalData.lat,
        longitude: app.hospitalData.lot,
        markers: [{
          latitude: app.hospitalData.lat,
          longitude: app.hospitalData.lot,
          title: app.hospitalData.name
        }],

        mobile: app.hospitalData.phone
      });
   
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
    //打电话
    makePhoneCall: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.mobile,
            success: function () {
                console.log("成功拨打电话")
            }
        })
    },
  makenav:function() {
    wx.openLocation({
      latitude: app.hospitalData.lat,
      longitude: app.hospitalData.lot,
      scale: 18,
      name: app.hospitalData.name,
      address: app.hospitalData.address
    });
  }
})
