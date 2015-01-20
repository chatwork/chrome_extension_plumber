import MessageModel = require('./model');
import RefreshModel = require('./refresh/model');
import RefreshInfrastructure = require('./refresh/infrastructure');

interface Dispatch {
    refresh? : (message: RefreshModel) => void;
}

class Infrastructure {
    refreshInfrastructure: RefreshInfrastructure;
    constructor() {
        this.refreshInfrastructure = new RefreshInfrastructure()
    }
    toJSON(msg: MessageModel) {
        if (msg['type'] === RefreshModel.Type) {
            return this.refreshInfrastructure.toJSON(<RefreshModel>msg);
        } else {
            throw new Error('unknown message');
        }
    }
    dispatch(msg: Object, dipatcher: Dispatch) {
        if (msg['type'] === RefreshModel.Type) {
            dipatcher.refresh(this.refreshInfrastructure.toModel(msg));
        } else {
            throw new Error('missing dispatcher');
        }
    }
}
export = Infrastructure;