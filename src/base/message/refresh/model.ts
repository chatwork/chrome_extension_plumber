import BaseModel from '../model';
import RulesModel from '../../rules/model';

class Model extends BaseModel {
    static Type = 'refresh';
    constructor(
        id: string,
        public rules: RulesModel
    ) {
        super(id);
    }
}
export default Model;