/**
 * Created with IntelliJ IDEA.
 * User: UberMouse
 * Date: 13/01/13
 * Time: 18:37
 * To change this template use File | Settings | File Templates.
 */
declare var chrome: any;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    var url: String = tab.url;
    if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) { }
    else {
        if(ContentRegistry.ContentParserRegistry.scraperExists(url))
            //inject content script
    }
});
