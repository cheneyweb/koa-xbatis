var log = require('tracer').colorConsole()
/**
 * [ModelController 实体控制器，接收路由入参JSON，自定义mapper进行SQL操作]
 * @type {Object}
 */
var QueryController = {
    /**
     * [query 通过JSON入参JSON进行自定义查询]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    query: function (nodebatis, ctx) {
        return new Promise((resolve, reject) =>
            nodebatis.execute(ctx.mapperName, ctx.request.body)
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    log.error(err.message)
                    reject(err.message)
                })
        )
    }
};

module.exports = QueryController
