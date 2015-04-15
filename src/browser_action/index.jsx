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
        var rulesModel = rulesInfrastructure.toModel(obj);
        resolve(rulesModel);
    }).catch(reject);
}).then((rulesModel) => {
    var router = new (require('./router'));
    var onNewRule = (manifest_url, json) => {
        json['manifest_url'] = manifest_url;
        var rule = ruleInfrastructure.toModel(json);
        rulesModel.add(rule);
        applyRules(rulesModel, () => ReactRouter.HashLocation.replace('/'));
    };
    var onUpdate = (rule) => {
        fetch(rule.manifest_url, {
            'credentials': 'include'
        }).then(r => r.json())
            .then((json) => {
                json['manifest_url'] = rule.manifest_url;
                json['enable'] = rule.enable;
                var newRule = ruleInfrastructure.toModel(json);
                rulesModel.replace(rule, newRule);
                applyRules(rulesModel, () => location.reload());
            }).catch(console.error)
        ;
    };
    var onDelete = (rule) => {
        rulesModel.delete(rule);
        applyRules(rulesModel, () => location.reload());
    };
    var onChangeEnable = (rule, enable) => {
        rule.enable = enable;
        if (rule.enable) {
            onUpdate(rule);
        } else {
            applyRules(rulesModel, () => location.reload());
        }
    };
    router.run(rulesModel, onNewRule, onUpdate, onDelete, onChangeEnable);
}).catch(console.error);

function applyRules (rulesModel, callback) {
    var message = new RefreshMessageModel('', rulesModel);
    var json = refreshMessageInfrastructure.toJSON(message);
    chrome.runtime.sendMessage(json, callback);
}