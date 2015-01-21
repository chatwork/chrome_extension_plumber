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
            'id': msg.id,
            'type': RefreshModel.Type,
            'rules': this.rulesInfrastructure.toObject(msg.rules)
        };
    }
    toModel(obj: Object) {
        return new RefreshModel(
            obj['id'],
            this.rulesInfrastructure.toModel(obj['rules'])
        );
    }
}
export = Infrastructure;