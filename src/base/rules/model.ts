import BaseModel = require('../model');
import RuleModel = require('../rule/model');

class Model extends BaseModel {
    constructor(
        private rules: RuleModel[] = []
    ) {
        super();
    }
    add(
        rule: RuleModel
    ) {
        this.rules.push(rule);
    }
    gets() {
        return this.rules;
    }
}
export = Model;