import MessageInfrastructure = require('../base/message/infrastructure');
import StorageService = require('../base/storage/service');
import RulesInfrastructure = require('../base/rules/infrastructure');
import WebRequestService = require('../base/webRequest/service');
import Utils = require('../base/utils');

var messageInfrastructure = new MessageInfrastructure();
var storageService = new StorageService();
var rulesInfrastructure = new RulesInfrastructure();
var webRequestService = new WebRequestService();

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    messageInfrastructure.dispatch(obj, {
        refresh: (msg) => {
            storageService.set('rules', rulesInfrastructure.toObject(msg.rules));
            webRequestService.bindRules(msg.rules);
            sendResponse();
        }
    });
});
// for debug
chrome.storage.local.clear(() => {
    storageService.get('rules').then((obj) => {
        var rules = Utils.toArray(obj);
        // for debug
        rules = [{
            'name' : 'setting name',
            'enable': true,
            'urls' : ['http://0-9.tumblr.com/*'],
            'matchs' : [
                {
                    'url' : 'http://0-9.tumblr.com/tweets.js',
                    'redirect' : 'http://jsrun.it/otoyasumi/A0b1/js'
                }
            ],
            'content_script' : '',
            'content_stylesheet' : ''
        }];
        var model = rulesInfrastructure.toModel(rules);
        webRequestService.bindRules(model);
    }).catch(console.error.bind(console));
});