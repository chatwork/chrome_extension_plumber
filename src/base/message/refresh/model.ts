import BaseModel = require('../model');
import RulesModel = require('../../rules/model');

class Model extends BaseModel {
    static Type = 'refresh';
    constructor(
        public rules: RulesModel
    ) {
        super();
    }
}
export = Model;