var logTypes = require('winston-wrapper/log-type')
module.exports = {
    pattern : " ext [${label}] ${timestamp} [Co-relation-id : ${correlationid}] [${level}]: ${message} ",
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