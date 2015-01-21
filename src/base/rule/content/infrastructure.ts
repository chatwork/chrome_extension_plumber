import ContentModel = require('./model');
import Utils = require('../../utils');

class Infrastructure {
    toModel(obj: Object) {
        return new ContentModel(
            obj['id'],
            obj['content_script'],
            obj['content_stylesheet'],
            Utils.toArray(obj['content_script_urls']).map((url) => new URLPattern(url)),
            Utils.toArray(obj['content_stylesheet_urls']).map((url) => new URLPattern(url))
        );
    }
    toObject(model: ContentModel) {
        return {
            'id' : model.id,
            'content_script' : model.content_script,
            'content_stylesheet' : model.content_stylesheet,
            'content_script_urls' : model.content_script_urls.map((url) => url.pattern),
            'content_stylesheet_urls' : model.content_stylesheet_urls.map((url) => url.pattern)
        }
    }
}
export = Infrastructure;