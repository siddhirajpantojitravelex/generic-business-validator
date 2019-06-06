'use strict';

let AWS = require('aws-sdk');

let s3 = new AWS.S3({
    region: 'eu-west-1'
})
const logger = require('winston-wrapper').getLogger('business-validator-dao')

class BusinessValidatorDao {

    async readStream(bucket, file) {
        try {
            logger.info("Inside Business Validator DAO ")
            let params = { Bucket: bucket, Key: file }
            return new Promise((resolve, reject) => {
                s3.getObject(params)
                    .createReadStream()
                    .on('data', data => {
                        resolve(data);
                    })
                    .on('error', error => {
                        reject(error)
                    });
            })
        } catch (e) {
            console.log('$$$$$$$$$$$', e)
        }
    }
}

module.exports = new BusinessValidatorDao();