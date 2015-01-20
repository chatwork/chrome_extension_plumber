import BaseModel = require('../model');

class Model extends BaseModel {
    static Type = 'base';
    constructor() {
        super();
    }
}
export = Model;