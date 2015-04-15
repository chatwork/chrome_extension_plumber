import RuleInfrastructure from '../rule/infrastructure';
import RulesModel from './model';
import Utils from '../utils';

class Infrastructure {
    private ruleInfrastructure: RuleInfrastructure;
    constructor() {
        this.ruleInfrastructure = new RuleInfrastructure();
    }
    fromJSON(json: string) {
        var obj = JSON.parse(json);
        return this.toModel(obj);
    }
    toModel(models: Object) {
        return new RulesModel(
            models['id'],
            Utils.toArray(models['rules'])
                .map(model => this.ruleInfrastructure.toModel(model))
        );
    }
    toObject(models: RulesModel) {
        return {
            'id': models.id,
            'rules': models.gets()
                .map((model) => this.ruleInfrastructure.toObject(model))
        };
    }
}
export default Infrastructure