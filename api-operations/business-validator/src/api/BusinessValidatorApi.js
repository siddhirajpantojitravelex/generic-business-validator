'use strict';

const GenericException = require('generic-exception').GenericException;

const ExceptionType = require('../model/ExceptionType');
const BusinessValidatorDto = require('../model/BusinessValidatorDto');
const businessValidatorService = require('../service/BusinessValidatorService');
const businessValidatorTransformer = require('../transformer/BusinessValidatorTransformer');


class BusinessValidatorApi {

    async process(event, context) {
        try {
            let fileRow, dataProcessors, objectLocaltion;
            if (event.body) {
                fileRow = JSON.parse(event.body).fileRow;
                dataProcessors = JSON.parse(event.body).dataProcessors;
                objectLocaltion = JSON.parse(event.body).objectLocaltion;
            } else {
                fileRow = event.fileRow;
                dataProcessors = event.dataProcessors;
                objectLocaltion = event.objectLocaltion;
            }
            let businessValidatorDto = new BusinessValidatorDto(fileRow, dataProcessors, objectLocaltion);
            let businessValidatorBo = await businessValidatorTransformer.transformToBo(businessValidatorDto);
            return await businessValidatorService.validate(businessValidatorBo);

        } catch (exception) {
            if (!(exception instanceof GenericException)) {
                let err = new GenericException.Builder(ExceptionType.MISSING_FILE_ROW_DATA)
                    .withWrappedException(exception)
                    .withMessage('Error occured!')
                    .build();
                throw err;
            } else {
                throw exception;
            }
        }
    }
}
module.exports = new BusinessValidatorApi();

// let obj = new ValidateApiProcessor();

// obj.process(JSON.stringify({
//     fileRow: {
//         currency: 'AUD',
//         rate: 100.90
//     },
//     dataProcessors: {
//         businessValidators: {
//             type: 'simple',
//             simple: {
//                 rules: [
//                     { file: 'BusinessRuleValidator.js' },
//                     { file: 'BusinessRuleValidator2.js' }
//                 ]
//             },
//             complex: {
//                 rules: [
//                     { arn: 'Complex validation lampda Function 1' },
//                     { arn: 'Complex validation lampda Function 2' }
//                 ]
//             }
//         },
//         transformers: {
//             type: "simple",
//             simple: {
//                 rules: ["transformer1.js", "transformer2.js"]
//             },
//             complex: ["arn1", "arn2"]
//         },
//         writer: "arn",
//         eventHandler: "arn"
//     },
//     objectLocaltion: 'tvx-middleware-dev',
//     domain: 'domain',
//     interfaceName: 'interfaceName1',
//     uniqueJobName: 'uniqueJobName1'
// }));

