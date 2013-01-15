ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());
ContentParserRegistry.registerParser(new Trakt());
var urlRegex = /(\$[^ ]+)/gi;
var snapTextElements = (document).evaluate("//text()[not(ancestor::a) " + "and not(ancestor::script) and not(ancestor::style) and " + "contains(., '$')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = snapTextElements.snapshotLength - 1; i >= 0; i--) {
    var elmText = snapTextElements.snapshotItem(i);
    if(elmText.nodeValue.match(/\$[0-9.,]+/gi) != null) {
        continue;
    }
    if(urlRegex.test(elmText.nodeValue)) {
        var elmSpan = document.createElement("span");
        var sURLText = elmText.nodeValue;
        elmText.parentNode.replaceChild(elmSpan, elmText);
        urlRegex.lastIndex = 0;
        for(var match = null, lastLastIndex = 0; (match = urlRegex.exec(sURLText)); ) {
            elmSpan.appendChild(document.createTextNode(sURLText.substring(lastLastIndex, match.index)));
            var elmLink = document.createElement("a");
            elmLink.setAttribute("href", "#");
            elmLink.setAttribute("class", "inject-ribbon-link");
            elmLink.appendChild(document.createTextNode(match[0]));
            elmSpan.appendChild(elmLink);
            lastLastIndex = urlRegex.lastIndex;
        }
        elmSpan.appendChild(document.createTextNode(sURLText.substring(lastLastIndex)));
        elmSpan.normalize();
    }
}
$(".inject-ribbon-link").click(function (ev) {
    Ribbon.create({
        artist: $(ev.srcElement).text().replace("$", ""),
        type: 2
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
        Ribbon.create(result, false);
    }
    return App;
})();
new App(window.location.href, $("body"));
