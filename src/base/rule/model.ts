import BaseModel from '../model';
import MatcheModel from './matche/model';
import ContentModel from './content/model';

class Model extends BaseModel {
    constructor(
                id: string,
                public name: string,
                public manifest_url: URL,
                public enable: boolean,
                public urls: URLPattern[],
                private types: RuleType[],
                public matchs: MatcheModel[],
                public content: ContentModel) {
        super(id);
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
export default Model;