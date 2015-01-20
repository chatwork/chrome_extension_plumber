import MatcheModel = require('./model');

class Infrastructure {
    toModel(obj: Object) {
        return new MatcheModel(
            new RegExp(obj['url']),
            new URL(obj['redirect'])
        );
    }
    toObject(model: MatcheModel) {
        return {
            'url' : model['url'].toString(),
            'redirect' : model['redirect'].href
        }
    }
}
export = Infrastructure;