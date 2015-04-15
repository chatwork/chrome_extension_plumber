import BaseModel from '../../model';

class Model extends BaseModel {
    constructor(
        id: string,
        public content_script: string,
        public content_stylesheet: string,
        public content_script_urls: URLPattern[],
        public content_stylesheet_urls: URLPattern[]
    ) {
        super(id);
    }
}
export default Model;