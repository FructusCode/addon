chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var url = tab.url;
    if(url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
    } else {
        if(ContentParserRegistry.Registry.scraperExists(url)) {
        }
    }
});
//@ sourceMappingURL=background.js.map
