import BaseModel = require('../model');

class Model extends BaseModel {
    static Type = 'base';
    constructor(id) {
        super(id);
    }
}
export = Model;