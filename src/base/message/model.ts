import BaseModel from '../model';

class Model extends BaseModel {
    static Type = 'base';
    constructor(id) {
        super(id);
    }
}
export default Model;