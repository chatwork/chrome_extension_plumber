import RulesModel = require('../rules/model');

interface webRequestParam {
    handler(details: chrome.webRequest.OnBeforeRequestDetails): chrome.webRequest.BlockingResponse;
    filter: chrome.webRequest.RequestFilter;
    opt_extraInfoSpec: string[];
}
class Service {
    private requestParams: webRequestParam[];
    constructor() {
        this.requestParams = [];
    }
    clear() {
        this.requestParams.forEach((requestParam) => {
            (<any>chrome.webRequest.onBeforeRequest).removeListener(requestParam.handler, requestParam.filter, requestParam.opt_extraInfoSpec)
        });
        this.requestParams = [];
    }
    bindRules(rules: RulesModel) {
        rules
            .gets()
            .filter((rule) => rule.enable)
            .map((rule) => {
                var requestParam: webRequestParam = {
                    'handler': this.getCallback(rule),
                    'filter': this.getFilter(rule),
                    'opt_extraInfoSpec': ['blocking']
                };
                chrome.webRequest.onBeforeRequest.addListener(requestParam.handler, requestParam.filter, requestParam.opt_extraInfoSpec);
                this.requestParams.push(requestParam);
            })
        ;
    }
    private executeContent(tab_id, content) {
        //content.content_script
        //content.content_stylesheet
        //content.content_script_urls
        //content.content_stylesheet_urls
    }
    private getCallback(rule) {
        return (details) => {
            if (!~details.tabId) {
                return;
            }
            this.executeContent(details.tabId, rule.content);
            var redirect = rule.getRedirectUrl(details.url);
            if (!redirect) {
                return;
            }
            return {
                'redirectUrl': redirect.redirect.href
            };
        }
    }
    private getFilter(rule) {
        var filter = {
            urls: rule.urls.map((url) => url.pattern)
        };
        if (rule.getTypes().length) {
            filter['types'] = rule.getTypes();
        }
        return filter;
    }
}
export = Service;
