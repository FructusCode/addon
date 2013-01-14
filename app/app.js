ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    new App(request.url, request.pagecontent);
});
var App = (function () {
    function App(url, pagecontent) {
        var contentParser = ContentParserRegistry.getParser(url);
        alert(pagecontent.html());
    }
    return App;
})();
//@ sourceMappingURL=App.js.map
