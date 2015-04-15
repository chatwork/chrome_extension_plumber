import RefreshModel from './model';
import RulesInfrastructure from '../../rules/infrastructure';
import Utils from '../../utils';

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
export default Infrastructure;