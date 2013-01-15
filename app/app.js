ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());
ContentParserRegistry.registerParser(new Trakt());
ContentParserRegistry.registerParser(new TagParser());
var urlRegex = /\b(\\$[^\s]+)/gi;
var snapTextElements = document.evaluate("//text()[not(ancestor::a) " + "and not(ancestor::script) and not(ancestor::style) and " + "contains(., '$')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = snapTextElements.snapshotLength - 1; i >= 0; i--) {
    var elmText = snapTextElements.snapshotItem(i);
    if(urlRegex.test(elmText.nodeValue)) {
        var elmSpan = document.createElement("span");
        var sURLText = elmText.nodeValue;
        elmText.parentNode.replaceChild(elmSpan, elmText);
        urlRegex.lastIndex = 0;
        for(var match = null, lastLastIndex = 0; (match = urlRegex.exec(sURLText)); ) {
            elmSpan.appendChild(document.createTextNode(sURLText.substring(lastLastIndex, match.index)));
            var elmLink = document.createElement("a");
            elmLink.setAttribute("href", match[0]);
            elmLink.appendChild(document.createTextNode(match[0]));
            elmSpan.appendChild(elmLink);
            lastLastIndex = urlRegex.lastIndex;
        }
        elmSpan.appendChild(document.createTextNode(sURLText.substring(lastLastIndex)));
        elmSpan.normalize();
    }
}
$(".inject-ribbon-link").click(function () {
    App.createRibbon({
        artist: $(this).text(),
        type: 1
    });
});
var App = (function () {
    function App(url, pagecontent) {
        var contentParser = ContentParserRegistry.getParser(url);
        if(contentParser == null) {
            return;
        }
        var result = contentParser.parse(url, pagecontent);
        if(result == null) {
            return;
        }
        App.createRibbon(result);
    }
    App.createRibbon = function createRibbon(result) {
        $.get(Config.WEBSERVER_URL + Config.SEARCH_ENDPOINT, {
            argv: JSON.stringify(result)
        }, function (response) {
            if(response.success == true) {
                App.buildRibbon(response.items[0].recipients[0].title);
            }
        });
    }
    App.buildRibbon = function buildRibbon(contentCreator) {
        if(contentCreator == null) {
            return;
        }
        $("<div id='ribbon' style='width:64px;height:64px;'></div>").insertAfter("body");
        $("#ribbon").html("<a href='javascript:void(0)' id='ribbon-link'><img src='" + chrome.extension.getURL("shared/images/icon.png") + "' id='ribbon-icon'/></a>");
        $("<div id='ribbon-content' style='display:none !important;'><p>Would you like to donate money to " + contentCreator + "</p><a href=''>Donate</a></div>").insertAfter("#ribbon-link");
        $("#ribbon-link").click(function () {
            $("#ribbon-content").show();
            $(this).parent().animate({
                height: 128,
                width: 256
            }, 600);
        });
    }
    return App;
})();
new App(window.location.href, $("body"));
