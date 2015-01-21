import RuleModel = require('./model');
import MatcheInfrastructure = require('./matche/infrastructure');
import ContentInfrastructure = require('./content/infrastructure');
import Utils = require('../utils');

declare function require(name: string): any;
var assign = require('object-assign');

class Infrastructure {
    private matchInfrastructure: MatcheInfrastructure;
    private contentInfrastructure: ContentInfrastructure;
    constructor() {
        this.matchInfrastructure = new MatcheInfrastructure();
        this.contentInfrastructure = new ContentInfrastructure();
    }
    toModel(obj: Object) {
        return new RuleModel(
            obj['id'],
            obj['name'],
            new URL(obj['manifest_url']),
            'enable' in obj ? !!obj['enable'] : true,
            Utils.toArray(obj['urls']).map((url) => new URLPattern(url)),
            Utils.toArray(obj['types']).map((type) => {
                if (!RuleType[type]) {
                    console.error('Invalid RuleType', type);
                    throw(new Error('Invalid RuleType'));
                }
                return RuleType[type];
            }),
            Utils.toArray(obj['matchs']).map((match) => this.matchInfrastructure.toModel(match)),
            this.contentInfrastructure.toModel(obj)
        );
    }
    toObject(model: RuleModel) {
        var content = this.contentInfrastructure.toModel(model.content);
        var obj = {
            'id' : model.id,
            'name' : model.name,
            'manifest_url' : model.manifest_url.href,
            'enable': model.enable,
            'urls' : model.urls.map((url) => url.pattern),
            'types' : model.getTypes(),
            'matchs' : model.matchs.map((match) => this.matchInfrastructure.toObject(match))
        };
        return (<any>assign)({}, content, obj)
    }
}
export = Infrastructure;