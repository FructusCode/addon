/// <reference path="app/App.ts" />
declare var chrome: any;

ContentParserRegistry.registerParser(new TestParser());

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    var url: string = tab.url;
    if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) { }
    else {
        if (ContentParserRegistry.parserExists(url))
            chrome.extension.executeScript(null, { file: "app/app.js" });
    }
});