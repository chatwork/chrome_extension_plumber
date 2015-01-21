class URLPattern {
    constructor(public pattern: string) {}
}

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

interface fetch {
    (url: URL): any;
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

for (var i in console) ('function' === typeof console[i]) && (console[i] = console[i].bind(console));

(<any>window).chrome = (<any>window).chrome || {};
(<any>window).chrome.extension = (<any>window).chrome.extension || {};
(<any>window).chrome.storage = (<any>window).chrome.storage || {};
(<any>window).chrome.storage.local = (<any>window).chrome.storage.local || {};
(<any>window).chrome.storage.local.get = (<any>window).chrome.storage.local.get || function (name, callback) { callback({}); };
(<any>window).chrome.storage.local.set = (<any>window).chrome.storage.local.set || function (obj, callback) { callback({}); };
