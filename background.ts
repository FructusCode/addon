/// <reference path="App.ts" />
declare var chrome: any;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    var url: String = tab.url;
    if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) { }
    else {
        
    }
});