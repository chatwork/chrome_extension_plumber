import BaseModel = require('../../model');

class Model extends BaseModel {
    constructor(
        id: string,
        public url: RegExp,
        public redirect: URL
    ) {
        super(id);
    }
    isMatch(url) {
        return this.url.test(url);
    }
}
export = Model;