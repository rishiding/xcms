/**
 * 小程序配置文件
 */
var host = "localhost:9090"

var config = {
    // 下面的地址配合云端 Server 工作
    host,
    server: `http://${host}`,
    hospitalid:`7`,
    // API 接口
    appApiUrl: `http://${host}/f/api`
}; 

module.exports = config