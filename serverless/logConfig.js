var logTypes = require('winston-wrapper/logType')
module.exports = {
    pattern : " ext [${label}] ${timestamp} [Co-relation-id : ${traceID}] [${level}]: ${message} ",
    datetimePattern : "YYYY-MM-DD HH:mm:ss",
    appenders : [
      {
        type:logTypes.Console,
        options : {
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
        }
      }
    ]
  }