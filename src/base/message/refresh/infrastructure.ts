import RefreshModel = require('./model');
import RulesInfrastructure = require('../../rules/infrastructure');
import Utils = require('../../utils');

class Infrastructure {
    rulesInfrastructure: RulesInfrastructure;
    constructor() {
        this.rulesInfrastructure = new RulesInfrastructure();
    }
    toJSON(msg: RefreshModel) {
        return {
            'type': RefreshModel.Type,
            'rules': this.rulesInfrastructure.toObject(msg.rules)
        };
    }
    toModel(obj: Object) {
        return new RefreshModel(
            this.rulesInfrastructure.toModel(Utils.toArray(obj['rules']))
        );
    }
}
export = Infrastructure;