'use strict';

let BusinessValidatorDto = require('../model/BusinessValidatorDto');
let BusinessValidatorBo = require('../model/BusinessValidatorBo');


class BusinessValidatorTransformer {

    static async transformToBo(businessValidatorDto) {
       // businessValidatorDto = await validator.validate(businessValidatorDto);
        return new BusinessValidatorBo(businessValidatorDto);
    }

    static async transformToDto(businessValidatorBo) {
        return new BusinessValidatorDto();
    }
}

module.exports = BusinessValidatorTransformer;