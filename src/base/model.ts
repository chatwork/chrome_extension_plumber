interface UUID {
    generate(): string;
}
declare function require(name: string): UUID;

var UUID = <UUID>require('uuid');

class Model {
    constructor(public id: string) {
        this.id = this.id || UUID.generate();
    }
}
export default Model;