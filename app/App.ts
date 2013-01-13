///Content Registry
/// <reference path="contentregistry/ContentParser.ts" />
/// <reference path="contentregistry/Registry.ts" />
/// <reference path="contentregistry/ParseResult.ts" />

///Parsers
/// <reference path="TestParser.ts" />
ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new TestParser());
declare var chrome: any;

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    new App(request.url, request.pagecontent);
});

class App {
    constructor(url:string, pagecontent:string) {
        alert(url);
        var contentParser = ContentParserRegistry.getParser(url);
        alert(contentParser.parse(pagecontent).result);
    }
}
