ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());
var App = (function () {
    function App(url, pagecontent) {
        var contentParser = ContentParserRegistry.getParser(url);
        if(contentParser == null) {
            return;
        }
        var result = contentParser.parse(url, pagecontent);
        $("<div id='ribbon' style='width:64px;height:64px;'></div>").insertAfter("body");
        $("#ribbon").html("<a href='javascript:void(0)' id='ribbon-link'><img src='" + chrome.extension.getURL("shared/images/icon.png") + "' id='ribbon-icon'/></a>");
        $("<div id='ribbon-content' style='display:none !important;'><p>Would you like to donate money to " + result.result.artist + "</p><a href=''>Donate</a></div>").insertAfter("#ribbon-link");
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
