import BaseModel = require('../model');
import RulesModel = require('../../rules/model');

class Model extends BaseModel {
    static Type = 'refresh';
    constructor(
        id: string,
        public rules: RulesModel
    ) {
        super(id);
    }
}
export = Model;