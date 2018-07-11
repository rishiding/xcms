/**
 * 小程序配置文件
 */
var host = "wx.scdelifu.com"

var config = {
    // 下面的地址配合云端 Server 工作
    host,
    server: `https://${host}`,
    hospitalid:`1`,
    // API 接口
    appApiUrl: `https://${host}/f/api`
}; 

module.exports = config