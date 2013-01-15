///Content Registry
/// <reference path="contentregistry/ContentParser.ts" />
/// <reference path="contentregistry/Registry.ts" />
/// <reference path="contentregistry/ContentType.ts" />

///Parsers
/// <reference path="parsers/LastFM.ts" />
/// <reference path="parsers/Trakt.ts" />
/// <reference pat="parsers/TagParser.ts" />

///Misic
/// <reference path="Config.ts" />

///Library Definitions
/// <reference path="lib/jquery.1.8.3.min.d.ts" />
declare var chrome: any;
declare var document: any;
declare var XPathResult: any;

ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());
ContentParserRegistry.registerParser(new Trakt());
ContentParserRegistry.registerParser(new TagParser());

var urlRegex = /(\$[^ ]+)/ig;
var snapTextElements = document.evaluate("//text()[not(ancestor::a) " + 
	"and not(ancestor::script) and not(ancestor::style) and " + 
	"contains(., '$')]", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapTextElements.snapshotLength - 1; i >= 0; i--) {
	var elmText = snapTextElements.snapshotItem(i);
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
                            elmLink.setAttribute("class", "ribbon-inject-link");
			elmLink.appendChild(document.createTextNode(match[0])); 
			elmSpan.appendChild(elmLink); 
			lastLastIndex = urlRegex.lastIndex;
		}
		elmSpan.appendChild(document.createTextNode(
			sURLText.substring(lastLastIndex)));
		elmSpan.normalize();
	}
}
$(".inject-ribbon-link").click(function() {
    App.createRibbon({ artist: $(this).text(), type: 1 });
});

class App {

    constructor(url:string, pagecontent:JQuery) {
        var contentParser = ContentParserRegistry.getParser(url);
        if(contentParser == null) return;
        var result = contentParser.parse(url, pagecontent);
        if(result == null) return;
        App.createRibbon(result);
    }

    static createRibbon(result: any) {
        $.get(Config.WEBSERVER_URL + Config.SEARCH_ENDPOINT, { argv: JSON.stringify(result) }, function (response) {
            if(response.success == true)
                App.buildRibbon(response.items[0].recipients[0].title);
            
        });
    }

    static buildRibbon(contentCreator:string) {
        if(contentCreator == null) return;
        $("#ribbon").remove();
        $("<div id='ribbon' style='width:64px;height:64px;'></div>").insertAfter("body"); 
        $("#ribbon").html("<a href='javascript:void(0)' id='ribbon-link'><img src='" + chrome.extension.getURL("shared/images/icon.png") + "' id='ribbon-icon'/></a>");
        $("<div id='ribbon-content' style='display:none !important;'><p>Would you like to donate money to " + contentCreator + "</p><a href=''>Donate</a></div>").insertAfter("#ribbon-link");
        $("#ribbon-link").click(function () {
            $("#ribbon-content").show();
            $(this).parent().animate({ height: 128, width: 256 }, 600);
        });
    }
}

new App(window.location.href, $("body"));
