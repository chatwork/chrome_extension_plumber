class Service {
    private StorageKey = 'StorageKey2';
    constructor() {
    }
    private getKey(name) {
        return this.StorageKey + '_' + name;
    }
    get(name) {
        var key = this.getKey(name);
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (result) => {
                if (chrome.extension.lastError) {
                    reject(chrome.extension.lastError);
                }
                resolve((result || {})[key] || {});
            });
        });
    }
    set(name, obj: Object) {
        var key = this.getKey(name);
        return new Promise((resolve, reject) => {
            var set = {};
            set[key] = obj;
            chrome.storage.local.set(set, (result) => {
                if (chrome.extension.lastError) {
                    reject(chrome.extension.lastError);
                }
                resolve(obj);
            });
        });
    }
}
export = Service;