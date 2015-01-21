import MatcheModel = require('./model');

class Infrastructure {
    toModel(obj: Object) {
        return new MatcheModel(
            obj['id'],
            new RegExp(obj['url']),
            new URL(obj['redirect'])
        );
    }
    toObject(model: MatcheModel) {
        return {
            'id' : model.id,
            'url' : model.url.toString().replace(/^\/([\s\S]+)\/\w*?$/, '$1'),
            'redirect' : model.redirect.href
        }
    }
}
export = Infrastructure;