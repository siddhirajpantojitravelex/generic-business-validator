var assert = require('chai').assert;
// var describe = require('mocha').describe;
var ApiProcessor = require('../src/api/BusinessValidatorApi');
const chai = require('chai');

describe('Validate ApiProcessor - Unit test', () => {
    it('Should return validation success', () => {
        let testData = {
            fileRow: { currency: "AUD", rate: 123 },
            dataProcessors: {
                businessValidators: {
                    type: "simple",
                    simple: { rules: [{ file: "BusinessRuleValidator.js" }] }
                }
            },
            objectLocaltion: "tvx-middleware-dev"
        };
        ApiProcessor.process(testData, '').then(response => {
            console.log(response)
            let expected = { isValid: true, message: 'Validation Successful' }
            assert.equal(response.isValid, expected.isValid);
        });
    });

    it('Should return validation failed', (done) => {
        setTimeout(done, 4000)
        let testData = {
            body: {
                fileRow: { currency: "AUD" },
                dataProcessors: {
                    businessValidators: {
                        type: "simple",
                        simple: { rules: [{ file: "BusinessRuleValidator.js" }] }
                    }
                },
                objectLocaltion: "tvx-middleware-dev"
            }
        };
        ApiProcessor.process(testData, '')
            .catch(err => {
                let expected = { isValid: true, message: 'Validation Successful' }
                assert.equal(err.httpStatusCode, "500")
                done();
            });
    });
});