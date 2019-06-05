'use strict';

let AWS = require('aws-sdk');

let s3 = new AWS.S3({
    region: 'eu-west-1'
})


class BusinessValidatorDao {

    async readStream(bucket, file) {
        try {
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