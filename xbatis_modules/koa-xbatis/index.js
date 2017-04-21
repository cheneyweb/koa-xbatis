// 路由相关
const Router = require('koa-router')
// 初始化路由
const router = new Router()
var QueryController = require(__dirname + '/controller/QueryController.js')
var log = require('tracer').colorConsole()

// 配置路由与Controller,Dao方法的绑定
// 查询数据
router.post('/:model_name/:method_name', async function(ctx, next) {
    // 从请求路径中获取Controller名称，Dao和其方法名称
    ctx.mapperName = ctx.params.model_name + '.' + transJavaStyle(ctx.params.method_name); // user.findAll
    // 动态加载对应名称的方法
    let result = await QueryController.query(ctx)
    ctx.body = result
});

function transJavaStyle(str) {
    var re = /_(\w)/g;
    return str.replace(re, function($0, $1) {
        return $1.toUpperCase()
    });
}

module.exports = router
