import MessageInfrastructure from '../base/message/infrastructure';
import StorageService from '../base/storage/service';
import RulesInfrastructure from '../base/rules/infrastructure';
import WebRequestService from '../base/webRequest/service';
import Utils from '../base/utils';

var messageInfrastructure = new MessageInfrastructure();
var storageService = new StorageService();
var rulesInfrastructure = new RulesInfrastructure();
var webRequestService = new WebRequestService();

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    messageInfrastructure.dispatch(obj, {
        refresh: (msg) => {
            storageService.set('rules', rulesInfrastructure.toObject(msg.rules));
            webRequestService.clear();
            webRequestService.bindRules(msg.rules);
            sendResponse();
        }
    });
});
storageService.get('rules').then((obj) => {
    var rules = Utils.toArray(obj);
    var model = rulesInfrastructure.toModel(rules);
    webRequestService.clear();
    webRequestService.bindRules(model);
}).catch(console.error.bind(console));
