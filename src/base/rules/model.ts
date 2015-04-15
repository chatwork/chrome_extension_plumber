import BaseModel from '../model';
import RuleModel from '../rule/model';

class Model extends BaseModel {
    constructor(
        id: string,
        private rules: RuleModel[] = []
    ) {
        super(id);
    }
    add(
        rule: RuleModel
    ) {
        this.rules.push(rule);
    }
    replace(
        oldRule: RuleModel,
        newRule: RuleModel
    ) {
        var index = this.rules.indexOf(oldRule);
        if (!~index) {
            throw new Error('missing target rule');
        }
        this.rules[index] = newRule;
    }
    delete(
        rule: RuleModel
    ) {
        var index = this.rules.indexOf(rule);
        if (!~index) {
            throw new Error('missing target rule');
        }
        this.rules.splice(index, 1);
    }
    gets() {
        return this.rules;
    }
}
export default Model;