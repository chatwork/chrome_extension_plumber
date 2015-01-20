import UUID = require('uuid');

class Model {
    private id: string;
    constructor() {
        this.id = UUID.generate();
    }
}
export = Model;