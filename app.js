// 系统设置
const config = require('config')
const port = config.get('server').port
const controllerRoot = config.get('server').controllerRoot
// 应用服务
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount')
const xbatis = require(__dirname + '/xbatis_modules/koa-xbatis/index.js')
// 日志服务
const log = require('tracer').colorConsole({ level: config.get('log').level })

// 初始化应用服务器
const app = new Koa()
// 入参JSON解析
app.use(bodyParser())

// 使用路由统一控制(目前支持以下RESTful请求)
/**
 * [POST]http://host:port/xbatis/MODEL_NAME/METHOD_NAME
 */
// 引入koa-xbatis中间件
app.use(mount(controllerRoot, xbatis.routes()))

// 开始服务监听
app.listen(port)

log.info(`XBatis服务已启动,执行环境:${process.env.NODE_ENV},端口:${port}...`)
log.info(`[POST]http://host:${port}/xbatis/MODEL_NAME/METHOD_NAME`)
