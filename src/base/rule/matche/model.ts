import BaseModel = require('../../model');

class Model extends BaseModel {
    constructor(
        private url: RegExp,
        public redirect: URL
    ) {
        super();
    }
    isMatch(url) {
        return this.url.test(url);
    }
}
export = Model;