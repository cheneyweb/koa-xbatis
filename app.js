// 系统设置
const config = require('config')
const port = config.server.port
const controllerRoot = config.server.controllerRoot
// 应用服务
const Koa = require('koa')
const bodyBody = require('koa-body')
const mount = require('koa-mount')
const nodebatis = require(__dirname + '/src/nodebatis/nodebatis.js')
const xbatis = require(__dirname + '/xbatis_modules/koa-xbatis/index.js')
// 日志服务
const log = require('tracer').colorConsole({ level: config.log.level })

// 初始化应用服务器
const app = new Koa()
// 入参JSON解析
app.use(bodyBody())

// 使用路由统一控制
// 引入koa-xbatis中间件
xbatis.initConnect(nodebatis)   // 初始化mysql连接
app.use(mount(controllerRoot, xbatis.routes()))

// 开始服务监听
app.listen(port)
log.info(`XBatis服务启动【执行环境:${process.env.NODE_ENV},端口:${port}】`)
log.info(`[POST]http://localhost:${port}/xbatis/MODEL_NAME/METHOD_NAME`)
