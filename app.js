// 系统设置
const config = require('config')
const port = config.server.port
// 应用服务
const Koa = require('koa')
const bodyBody = require('koa-body')
const nodebatis = require(__dirname + '/src/nodebatis/nodebatis.js')
const xbatis = require(__dirname + '/xbatis_modules/koa-xbatis/index.js')
// 日志服务
const log = require('tracer').colorConsole({ level: config.log.level })

// 初始化应用服务器
const app = new Koa()
// 入参JSON解析
app.use(bodyBody())

// 加载koa-xbatis中间件
xbatis.init(app, nodebatis, config.server)   // 初始化mysql连接

// 开始服务监听
app.listen(port)
log.info(`XBatis服务启动【执行环境:${process.env.NODE_ENV},端口:${port}】`)
log.info(`[POST]http://localhost:${port}/xbatis/MODEL_NAME/METHOD_NAME`)
