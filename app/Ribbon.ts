/// <reference path="App.ts" />
class Ribbon {
    static create(result: any, expanded: bool = true) {
        $.get(Config.WEBSERVER_URL + Config.SEARCH_ENDPOINT, { argv: JSON.stringify(result) }, function (response) {
            if(response.success == true)
                Ribbon.inject(response.items[0].recipients[0].title, expanded);
            
        });
    }

    static private inject(contentCreator:string, expanded:bool = true) {
        if(contentCreator == null) return;
        $("#ribbon").remove();
        $("<div id='ribbon' style='width:64px;height:64px;'></div>").insertAfter("body"); 
        $("#ribbon").html("<a href='javascript:void(0)' id='ribbon-link'><img src='" + chrome.extension.getURL("shared/images/icon.png") + "' id='ribbon-icon'/></a>");
        $("<div id='ribbon-content' style='display:none !important;'>Would you like to donate money to " + contentCreator + "<br /><a href=''>Donate</a></div>").insertAfter("#ribbon-link");
        $("#ribbon-link").click(function () {
            Ribbon.expand();
        });
        if(expanded)
            Ribbon.expand(0);
    }

    static expand(delay:number = 600) {
        $("#ribbon-content").show();
        $("#ribbon").animate({ height: 128, width: 256 }, delay);
    }
}