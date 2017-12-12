var log = require('tracer').colorConsole()
var nodebatis = require(__dirname + '/../../../src/nodebatis/nodebatis.js')

var QueryDao = {
    execsql: async function execsql(mapper, param) {
        try {
            let result = await nodebatis.execute(mapper, param)
            return result
        } catch (e) {
            log.error(e)
        }
    }
}

module.exports = QueryDao
