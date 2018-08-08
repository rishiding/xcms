const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');
const QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
//获取应用实例
var app = getApp()

Page({
    data: {
        // 幻灯片数据
        slideList: [],
        // 最新动态列表
        newsList: [],  
        img: '',
        title: '',
        intro: '',
        contact: '',
        mobile: "",
        name:'',
        email: "",
        address: "",
        windowWidth: wx.getSystemInfoSync().windowWidth, // 宽度,
        windowHeight: wx.getSystemInfoSync().windowHeight, // 高度,
        server: config.server,
    },
    onLoad: function (options) {
      var that = this;     
        if (options.scene == "" || options.scene == undefined || options.scene == null){
          if (app.globalData.hospitalid == "") {
          wx.navigateTo({
            url: '../hospital/index',
          });
          return;
          } else {
            wx.setNavigationBarTitle({
              title: app.hospitalData.name,
            });
            // 重新写入数据
            that.setData({
              name: app.hospitalData.name,
              img: app.hospitalData.logo,
              address: app.hospitalData.address,
              contact: app.hospitalData.master,
              mobile: app.hospitalData.phone,
              slideList: app.hospitalData.banner
            });
          }    


        }else{
          app.globalData.hospitalid = options.scene;
          // 初始化全局医院数据
          util.AJAX("/office/getHospital", function (res1) {
            qqmapsdk = new QQMapWX({
              key: 'ELVBZ-YMF6P-7RPDQ-L2SLM-MIYAJ-5NFW2'
            });
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res1.data.data.lat,
                longitude: res1.data.data.lot
              },
              coord_type: 3,//baidu经纬度  转换
              success: function (res) {               
                var location = res.result.location;
                app.hospitalData.lat = location.lat;
                app.hospitalData.lot = location.lng;
              }
            });

            app.hospitalData.name = res1.data.data.name;
            app.hospitalData.id = res1.data.data.id;
            app.hospitalData.address = res1.data.data.address;
            app.hospitalData.master = res1.data.data.master;
            app.hospitalData.phone = res1.data.data.phone;
            app.hospitalData.fax = res1.data.data.fax;
            app.hospitalData.email = res1.data.data.email;
            app.hospitalData.logo = res1.data.data.logo;            
           
            app.hospitalData.gradeName = res1.data.data.gradeName;
            var side = res1.data.data.banner.split('|');
            var side1 = new Array();
            for (var i = 0; i < side.length; i++) {
              if(side[i]!=""){
                side1.push(side[i]);
              }
            }
            app.hospitalData.banner = side1;
            wx.setNavigationBarTitle({
              title: app.hospitalData.name,
            });
            // 重新写入数据
            that.setData({
              name: app.hospitalData.name,
              img: app.hospitalData.logo,
              address: app.hospitalData.address,
              contact: app.hospitalData.master,
              mobile: app.hospitalData.phone,
              slideList: app.hospitalData.banner
            });   
          }, { "hospitalid": options.scene });
        }
      
       
        // 新闻列表       
        util.AJAX("/category/news", function (res) {
            var newsList = res.data.data.list;
            for (var i = 0; i < newsList.length; i++) {
              
              newsList[i]['title'] = util.formatStr(newsList[i]['title']) ;
              newsList[i]['description'] = util.formatStr(newsList[i]['description']);
            }
            // 重新写入数据
            that.setData({
                newsList: newsList
            });
            
        }, { "hospitalid": app.globalData.hospitalid ,pageSize:8}); 
        
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