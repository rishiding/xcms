const util = require('../../../../utils/util.js');
const config = require('../../../../config.js');
//获取应用实例
var app = getApp()

Page({
    data: {
        // 幻灯片数据
        slideList: [],
        // 最新动态列表
        newsList: [],
        // 产品列表
        goodsList: [],
        goodsList:[],

        img: '../../images/logo.png',
        title: '繁橙工作室',
        intro: '医院介绍',
        contact: '丁',
        mobile: "15882454451",
        email: "77219569@qq.com",
        address: "成都市二环路",
        windowWidth: wx.getSystemInfoSync().windowWidth, // 宽度,
        windowHeight: wx.getSystemInfoSync().windowHeight, // 高度,
        server: config.server,
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight + "px",
                    windowWidth: res.windowWidth + "px",
                });
            }
        }); 
        // 幻灯片列表
        util.AJAX("/office/getHospital", function (res) {
        //  console.log(res); 
          wx.setNavigationBarTitle({
            title: res.data.data.name,
          })
          // 重新写入数据
          that.setData({
            name: res.data.data.name,
            img: res.data.data.logo,
            address: res.data.data.address,
            contact: res.data.data.master,
            mobile: res.data.data.phone
          
          });
        }, { "hospitalid": config.hospitalid });
        // 幻灯片列表
        util.AJAX("/office/getBanners", function (res) {
        
          // 重新写入数据
          that.setData({
          
            slideList: res.data.data
          });
        }, { "hospitalid": config.hospitalid });

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
            
        },  { "hospitalid": config.hospitalid ,pageSize:5});
 
        // 产品列
        /**
        util.AJAX("/goods/index", function (res) {
            var goodsList = res.data.data.list;
            if (goodsList) {
                for (var i = 0; i < goodsList.length; i++) {
                    var time = util.getTime(goodsList[i]['pubdate']);
                    goodsList[i]['pubdate'] = time['Y'] + '-' + time['m'] + '-' + time['d'];
                }
            }

            // 重新写入数据
            that.setData({
                goodsList: goodsList
            });
        }, { "limit": 8 });
          */
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