///Content Registry
/// <reference path="contentregistry/ContentParser.ts" />
/// <reference path="contentregistry/Registry.ts" />
/// <reference path="contentregistry/ParseResult.ts" />

///Parsers
/// <reference path="parsers/LastFM.ts" />

///Library Definitions
/// <reference path="lib/jquery.1.8.3.min.d.ts" />
ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());
declare var chrome: any;

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    new App(request.url, request.pagecontent);
});

class App {
    constructor(url:string, pagecontent:JQuery) {
        var contentParser = ContentParserRegistry.getParser(url);
        alert(pagecontent.html());
    }
}
