///Content Registry
/// <reference path="contentregistry/ContentParser.ts" />
/// <reference path="contentregistry/Registry.ts" />
/// <reference path="contentregistry/ContentType.ts" />

///Parsers
/// <reference path="parsers/LastFM.ts" />
/// <reference path="parsers/Trakt.ts" />

///Misc
/// <reference path="Config.ts" />
/// <reference path="Ribbon.ts" />

///Library Definitions
/// <reference path="lib/jquery.1.8.3.min.d.ts" />
declare var chrome: any;
declare var document: any;
declare var XPathResult: any;

class App {

    constructor(url:string, pagecontent:JQuery) {

        ContentParserRegistry.unloadParsers();
        ContentParserRegistry.registerParser(new LastFM());
        ContentParserRegistry.registerParser(new Trakt());

        var urlRegex = /(\$[^ ]+)/ig;
        var snapTextElements = (<any>document).evaluate("//text()[not(ancestor::a) " + 
	        "and not(ancestor::script) and not(ancestor::style) and " + 
	        "contains(., '$')]", 
	        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = snapTextElements.snapshotLength - 1; i >= 0; i--) {
	        var elmText = snapTextElements.snapshotItem(i);
            if(elmText.nodeValue.match(/\$[0-9.,]+/ig) != null) continue;
	        if (urlRegex.test(elmText.nodeValue)) { 
		        var elmSpan = document.createElement("span");
		        var sURLText = elmText.nodeValue;
		        elmText.parentNode.replaceChild(elmSpan, elmText);
		        urlRegex.lastIndex = 0;
		        for (var match = null, lastLastIndex = 0;
				        (match = urlRegex.exec(sURLText)); ) {     
			        elmSpan.appendChild(document.createTextNode(
			        sURLText.substring(lastLastIndex, match.index))); 
			        var elmLink = document.createElement("a"); 
			        elmLink.setAttribute("href", "#"); 
                                    elmLink.setAttribute("class", "inject-ribbon-link");
			        elmLink.appendChild(document.createTextNode(match[0])); 
			        elmSpan.appendChild(elmLink); 
			        lastLastIndex = urlRegex.lastIndex;
		        }
		        elmSpan.appendChild(document.createTextNode(
			        sURLText.substring(lastLastIndex)));
		        elmSpan.normalize();
	        }
        }
        $(".inject-ribbon-link").click((ev) => {
            Ribbon.create({ artist: $(ev.srcElement).text().replace("$", ""), type: 2 });
        });
        this.parseContent(url, pagecontent);
    }

    parseContent(url:string, pagecontent:JQuery) {
        var contentParser = ContentParserRegistry.getParser(url);
        if(contentParser == null) return;
        var result = contentParser.parse(url, pagecontent);
        if(result == null) return;
        Ribbon.create(result, false);
    }
}

new App(window.location.href, $("body"));
