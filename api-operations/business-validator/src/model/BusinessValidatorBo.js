'use strict';

let _fileRow,
    _businessRules,
    _objectLocation;

class BusinessValidatorBo {
    constructor(businessValidator) {
        _fileRow = businessValidator.fileRow;
        _objectLocation = businessValidator.objectLocation;
        _businessRules = businessValidator.businessRules;
    }
    get fileRow() {
        return _fileRow;
    }

    get objectLocation() {
        return _objectLocation;
    }

    get businessRules() {
        let newRules = [];
        if (_businessRules && _businessRules.length > 0) {
            for (let i = 0; i < _businessRules.length; i++) {
                let fileName = `interfaces/validators/Finance/${_businessRules[i].file}`;
                newRules.push({ file: _businessRules[i].file, key: fileName })
            };
        } else {
            console.log('No rules defined')
        }
        // _businessRules = newRules;
        return newRules;
    }

    toString() {
        return JSON.stringify({
            row: this.fileRow,
            location: this.objectLocation,
            businessRules: this.businessRules
        })
    }
}

module.exports = BusinessValidatorBo;