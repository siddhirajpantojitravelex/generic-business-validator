'use strict';
const ExceptionType = require('../model/ExceptionType');
const ExceptionCategory = require('../model/ExceptionCategory');
const businessValidatorDao = require('../dal/BusinessValidatorDao');
const GenericException = require('generic-exception').GenericException;
const logger = require('winston-wrapper').getLogger('business-validator-service')
//let businessValidator = require('../transformer/BusinessRuleValidator');


class BusinessValidatorService {

    /**
     * Read the validator files from s3 and applyy validation logic
     * @param {*} businessValidatorBo 
     * @description Read the validator files from s3 and applyy validation logic
     */
    async validate(businessValidatorBo) {
        return new Promise(async (resolve, reject) => {
            logger.info("Inside Service ")
            if (businessValidatorBo && businessValidatorBo.businessRules) {
                try {
                    // businessValidatorBo.businessRules.forEach(async rule => {
                    //     //let readStream = await businessValidatorDao.readStream(businessValidatorBo.objectLocation, rule.key);
                    //     // let businessValidator = eval(readStream.toString());
                    //     let _validationResult = await businessValidator.validate(businessValidatorBo);
                    //     console.log('###########', _validationResult)
                    //     resolve(_validationResult);
                    // });
                    for (let i = 0; i < businessValidatorBo.businessRules.length; i++) {
                        let readStream = await businessValidatorDao.readStream(businessValidatorBo.objectLocation, businessValidatorBo.businessRules[i].key);
                        let businessValidator = eval(readStream.toString());
                        resolve(await businessValidator.validate(businessValidatorBo));
                    };
                } catch (ex) {
                    if (!(ex instanceof GenericException)) {
                        let error = new GenericException
                            .Builder(ExceptionType.MISSING_FILE_ROW_DATA)
                            .withInspectionFields(', File row must be provided')
                            .withExceptionCategory(ExceptionCategory.DATABASE_ERROR)
                            .withWrappedException(ex)
                            .build();
                        reject(error);
                    } else {
                        reject(ex);
                    }
                }
            } else {
                return {
                    message: "Validation Rules not defined"
                }
            }
        })
    }
}

module.exports = new BusinessValidatorService();