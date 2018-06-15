Page({
  data: {
    latitude: 30.657420, 
    longitude: 104.065840,
    markers: [{
      latitude: 30.657420,
        longitude: 104.065840,
        title: '××××××××××××二期48号'
    }],
    contact: '丁先生',
    mobile: "1588****451",
    email: "77219569@qq.com",
    address: "××××××××××××二期48号",
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
