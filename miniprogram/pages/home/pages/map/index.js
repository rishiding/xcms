const QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
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
    email: "77219569@qq.com",
    address: "",
    },
  onLoad: function () {
    var that = this; 
    
      wx.setNavigationBarTitle({
        title: app.hospitalData.name,
      })  
      qqmapsdk = new QQMapWX({
        key: 'ELVBZ-YMF6P-7RPDQ-L2SLM-MIYAJ-5NFW2'
      });
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: app.hospitalData.lat,
          longitude: app.hospitalData.lot
        },
        coord_type: 3,//baidu经纬度
        success: function (res) {
          console.info(res);
          var location = res.result.location;
          console.log(location)
          // 重新写入数据
          that.setData({
            name: app.hospitalData.name,
            img: app.hospitalData.logo,
            address: app.hospitalData.address,
            contact: app.hospitalData.master,
            latitude: location.lat,
            longitude: location.lng,
            markers: [{
              latitude: location.lat,
              longitude: location.lng,
              title: app.hospitalData.name
            }],

            mobile: app.hospitalData.phone
          });
        }
      });
      
      
   
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
