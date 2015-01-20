import BaseModel = require('../model');
import MatcheModel = require('./matche/model');

class Model extends BaseModel {
    constructor(public name: string,
                public enable: boolean,
                public urls: URL[],
                private types: RuleType[],
                public matchs: MatcheModel[],
                public content_script: string,
                public content_stylesheet: string) {
        super();
    }
    getTypes() {
        return this.types.map((type) => RuleType[type]);
    }
    getRedirectUrl(url) {
        return this.matchs
            .filter((match) => match.isMatch(url))
            .shift()
        ;
    }
}
export = Model;