var Utils = require('../base/utils');
var RefreshMessageInfrastructure = require('../base/message/refresh/infrastructure');
var RefreshMessageModel = require('../base/message/refresh/model');
var RuleInfrastructure = require('../base/rule/infrastructure');

var refreshMessageInfrastructure = new RefreshMessageInfrastructure();
var ruleInfrastructure = new RuleInfrastructure;

new Promise((resolve, reject) => {
    var storageService = new (require('../base/storage/service'));
    storageService.get('rules').then((obj) => {
        var rulesInfrastructure = new (require('../base/rules/infrastructure'));
        rulesModel = rulesInfrastructure.toModel(Utils.toArray(obj));
        resolve(rulesModel);
    }).catch(reject);
}).then((rulesModel) => {
    var router = new (require('./router'));
    router.run(rulesModel, (rule) => {
        rulesModel.add(ruleInfrastructure.toModel(rule));
        var message = new RefreshMessageModel(rulesModel);
        chrome.runtime.sendMessage(refreshMessageInfrastructure.toJSON(message), () => {
            location.hash = '';
        });
    });
}).catch(console.error.bind(console));
