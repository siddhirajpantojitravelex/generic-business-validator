const apiProcessor = require('business-validator').BusinessValidatorApi;
const winston = require('winston-wrapper');
const logger = winston.getLogger('business-validator-handler');

module.exports.handle = function (event, context, callback) {
    winston.serverlessFunction(event, context, () => {
        logger.info("Hello World ")
        // console.log("Entered handler with request " + JSON.stringify(event));
        console.log('Event Received', JSON.stringify(event));
        apiProcessor.process(event).then((body) => {
            console.log("Exiting with response ", body);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(body)
            })
        }).catch(error => {
            // console.log("Exception caught ", error)
            callback(null, {
                statusCode: error.httpStatusCode,
                body: JSON.stringify({
                    errorCode: error.code,
                    errorMessage: error.description
                })
            })
        })
    });
};
