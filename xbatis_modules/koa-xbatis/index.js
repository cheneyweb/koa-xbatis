// 路由相关
const Router = require('koa-router')
const mount = require('koa-mount')
// 初始化路由
const router = new Router()
// 控制器加载
const fs = require('fs')
// 日志
const log = require('tracer').colorConsole()

/**
 * 初始化数据库连接，加载所有中间件路由
 */
router.init = function (app, nodebatis, options) {
    router.nodebatis = nodebatis
    const middlewareDir = `${process.cwd()}${options.middlewareDir || '/src/middleware/'}`
    const controllerRoot = options.xbatisRoot || '/xbatis'
    fs.readdirSync(middlewareDir).forEach(function (filename) {
        if (filename.startsWith('pre')) {
            let router = require(`${middlewareDir}/${filename}`)
            app.use(mount(controllerRoot, router.routes()))
        }
    })
    log.info('xbatis所有前置路由已加载')
    app.use(mount(controllerRoot, router.routes()))
    log.info('xbatis所有执行路由已加载')
    fs.readdirSync(middlewareDir).forEach(function (filename) {
        if (filename.startsWith('after')) {
            let router = require(`${middlewareDir}/${filename}`)
            app.use(mount(controllerRoot, router.routes()))
        }
    })
    log.info('xbatis所有后置路由已加载')
}

/**
 * 配置路由与Controller,Dao方法的绑定
 */
router.post('/:model_name/:method_name', async function (ctx, next) {
    try {
        // 从请求路径中获取Controller名称，Dao和其方法名称
        let mapperName = ctx.params.model_name + '.' + transJavaStyle(ctx.params.method_name) // example：user.findAll
        // 执行mapper操作
        let result = await router.nodebatis.execute(mapperName, ctx.request.body)
        ctx.body = okRes(result)
        return next()
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
