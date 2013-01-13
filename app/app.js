ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new TestParser());
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    new App(request.url, request.pagecontent);
});
var App = (function () {
    function App(url, pagecontent) {
        alert(url);
        var contentParser = ContentParserRegistry.getParser(url);
        alert(contentParser.parse(pagecontent).result);
    }
    return App;
})();
//@ sourceMappingURL=App.js.map
