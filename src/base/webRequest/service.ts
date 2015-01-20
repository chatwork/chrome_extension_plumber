import RulesModel = require('../rules/model');

interface ruleHandler {
    (details: chrome.webRequest.OnBeforeRequestDetails): chrome.webRequest.BlockingResponse;
}
class Service {
    private ruleHandlers: ruleHandler[];
    constructor() {
        this.ruleHandlers = [];
    }
    private clear() {
        this.ruleHandlers.forEach((ruleHandler) => {
            chrome.webRequest.onBeforeRequest.removeListener(ruleHandler)
        });
        this.ruleHandlers = [];
    }
    bindRules(rules: RulesModel) {
        this.clear();
        rules
            .gets()
            .filter((rule) => rule.enable)
            .map((rule) => {
                this.getCallback(rule);
                var callback = this.getCallback(rule);
                var filter = this.getFilter(rule);
                chrome.webRequest.onBeforeRequest.addListener(callback, filter, ['blocking']);
            })
        ;
    }
    private getCallback(rule) {
        return (details) => {
            if (!~details.tabId) {
                return;
            }
            var redirect = rule.getRedirectUrl(details.url);
            if (!redirect) {
                return;
            }
            // call content script
            return {
                'redirectUrl': redirect.redirect.href
            };
        }
    }
    private getFilter(rule) {
        var filter = {
            urls: rule.urls.map((url) => url.href)
        };
        if (rule.getTypes().length) {
            filter['types'] = rule.getTypes();
        }
        return filter;
    }
}
export = Service;
