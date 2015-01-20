import RuleInfrastructure = require('../rule/infrastructure');
import RulesModel = require('./model');
import Utils = require('../utils');

class Infrastructure {
    private ruleInfrastructure: RuleInfrastructure;
    constructor() {
        this.ruleInfrastructure = new RuleInfrastructure();
    }
    fromJSON(json: string) {
        var obj = JSON.parse(json);
        return this.toModel(obj);
    }
    toModel(models: Object[]) {
        return new RulesModel(
            Utils.toArray(models)
                .map(model => this.ruleInfrastructure.toModel(model))
        );
    }
    toObject(models: RulesModel) {
        return models.gets()
            .map((model) => this.ruleInfrastructure.toObject(model))
        ;
    }
}
export = Infrastructure