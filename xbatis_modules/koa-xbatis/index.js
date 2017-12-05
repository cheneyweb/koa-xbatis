// 路由相关
const Router = require('koa-router')
// 初始化路由
const router = new Router()
const log = require('tracer').colorConsole()
const QueryController = require(__dirname + '/controller/QueryController.js')

/**
 * 初始化连接数据库
 */
router.initConnect = function (nodebatis) {
    router.nodebatis = nodebatis
}

// 配置路由与Controller,Dao方法的绑定
router.post('/:model_name/:method_name', async function (ctx, next) {
    try {
        // 从请求路径中获取Controller名称，Dao和其方法名称
        ctx.mapperName = ctx.params.model_name + '.' + transJavaStyle(ctx.params.method_name) // user.findAll
        // 动态加载对应名称的方法
        const result = await QueryController.query(router.nodebatis, ctx)
        ctx.body = okRes(result)
    } catch (error) {
        log.error(error)
        ctx.body = errRes('路由服务异常')
    }
})

function okRes(res) {
    return { err: false, res: res }
}
function errRes(res) {
    return { err: true, res: res }
}

function transJavaStyle(str) {
    var re = /_(\w)/g;
    return str.replace(re, function ($0, $1) {
        return $1.toUpperCase()
    });
}

module.exports = router
