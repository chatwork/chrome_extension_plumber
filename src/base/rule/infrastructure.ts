import RuleModel = require('./model');
import MatcheInfrastructure = require('./matche/infrastructure');
import Utils = require('../utils');

class Infrastructure {
    private matchInfrastructure: MatcheInfrastructure;
    constructor() {
        this.matchInfrastructure = new MatcheInfrastructure();
    }
    toModel(obj: Object) {
        return new RuleModel(
            obj['name'],
            !!obj['enable'],
            Utils.toArray(obj['urls']).map((url) => new URL(url)),
            Utils.toArray(obj['types']).map((type) => {
                if (!RuleType[type]) {
                    console.error('Invalid RuleType', type);
                    throw(new Error('Invalid RuleType'));
                }
                return RuleType[type];
            }),
            Utils.toArray(obj['matchs']).map((match) => this.matchInfrastructure.toModel(match)),
            obj['content_script'],
            obj['content_stylesheet']
        );
    }
    toObject(model: RuleModel) {
        return {
            'name' : model.name,
            'enable': model.enable,
            'urls' : model.urls.map((url) => url.href),
            'types' : model.getTypes(),
            'matchs' : model.matchs.map((match) => this.matchInfrastructure.toObject(match)),
            'content_script' : model.content_script,
            'content_stylesheet' : model.content_stylesheet
        };
    }
}
export = Infrastructure;