///Content Registry
/// <reference path="contentregistry/ContentParser.ts" />
/// <reference path="contentregistry/Registry.ts" />
/// <reference path="contentregistry/ContentType.ts" />

///Parsers
/// <reference path="parsers/LastFM.ts" />

///Misic
/// <reference path="Config.ts" />

///Library Definitions
/// <reference path="lib/jquery.1.8.3.min.d.ts" />
declare var chrome: any;

ContentParserRegistry.unloadParsers();
ContentParserRegistry.registerParser(new LastFM());

class App {
    static contentOwner: string = null;

    constructor(url:string, pagecontent:JQuery) {
        var contentParser = ContentParserRegistry.getParser(url);
        if(contentParser == null) return;
        var result = contentParser.parse(url, pagecontent);
        $.get(Config.WEBSERVER_URL + Config.SEARCH_ENDPOINT, { argv: JSON.stringify(result) }, function (response) {
            if(response.success == true)
                App.contentOwner = response.items[0].recipients[0].title
            App.buildRibbon();
        });
    }

    static buildRibbon() {
        if(this.contentOwner == null) return;
        $("<div id='ribbon' style='width:64px;height:64px;'></div>").insertAfter("body"); 
        $("#ribbon").html("<a href='javascript:void(0)' id='ribbon-link'><img src='" + chrome.extension.getURL("shared/images/icon.png") + "' id='ribbon-icon'/></a>");
        $("<div id='ribbon-content' style='display:none !important;'><p>Would you like to donate money to " + this.contentOwner + "</p><a href=''>Donate</a></div>").insertAfter("#ribbon-link");
        $("#ribbon-link").click(function () {
            $("#ribbon-content").show();
            $(this).parent().animate({ height: 128, width: 256 }, 600);
        });
    }
}

new App(window.location.href, $("body"));
