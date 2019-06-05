'user strict';

let _fileRow, _businessRules, _objectLocation, _dataProcessors;

class BusinessValidatorDto {
    constructor(fileRow, dataProcessors, objectLocaltion) {
        _fileRow = fileRow;
        _dataProcessors = dataProcessors;
        _objectLocation = objectLocaltion;
    }

    get fileRow() {
        return new FileRow(_fileRow);
    }

    get objectLocation() {
        return _objectLocation;
    }

    get businessRules() {
        if (_dataProcessors && _dataProcessors.businessValidators && _dataProcessors.businessValidators.type) {
            if (_dataProcessors.businessValidators.type == 'simple') {
                _businessRules = _dataProcessors.businessValidators.simple.rules;
            }
        }
        return _businessRules;
    }

    toString() {
        return JSON.stringify({
            row: this.fileRow,
            location: this.objectLocation,
            businessRules: this.businessRules
        })
    }

}

class FileRow {
    constructor(fileRow) {
        if (fileRow && fileRow.currency) {
            this.currency = fileRow.currency;
        }
        if (fileRow && fileRow.rate) {
            this.rate = fileRow.rate;
        }
    }
}
module.exports = BusinessValidatorDto;