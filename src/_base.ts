interface URL {
    new (url: string): URL;
    hash: string;
    search: string;
    pathname: string;
    port: string;
    hostname: string;
    host: string;
    password: string;
    username: string;
    protocol: string;
    origin: string;
    href: string;
}

enum RuleType {
    main_frame,
    sub_frame,
    stylesheet,
    script,
    image,
    object,
    xmlhttprequest,
    other
}

(<any>window).chrome = (<any>window).chrome || {};
(<any>window).chrome.extension = (<any>window).chrome.extension || {};
(<any>window).chrome.storage = (<any>window).chrome.storage || {};
(<any>window).chrome.storage.local = (<any>window).chrome.storage.local || {};
(<any>window).chrome.storage.local.get = (<any>window).chrome.storage.local.get || function (name, callback) { callback({}); };
(<any>window).chrome.storage.local.set = (<any>window).chrome.storage.local.set || function (obj, callback) { callback({}); };
