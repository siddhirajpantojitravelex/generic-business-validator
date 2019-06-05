// log-config.js
var logTypes = require('winston-wrapper/log-type')
module.exports = {
    pattern: " ext [${label}] ${timestamp} [Co-relation-id : ${traceID}] [${level}]: ${message} ",
    appenders: [
        {
            // Console 
            type: logTypes.Console,
            options: {
                level: 'debug',
                handleExceptions: true
            }
        },
        {
            // File - Rolling File appender  
            type: logTypes.File,
            options: {
                level: 'info',
                filename: 'app.log',
                handleExceptions: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,

            }
        },
        {
            // Only File based on error Level 
            type: logTypes.File,
            options: {
                level: 'error',
                filename: 'error.log',
                handleExceptions: true,
                json: true,
                colorize: false,
            }
        }
    ]
}