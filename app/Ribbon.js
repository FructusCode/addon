var Ribbon = (function () {
    function Ribbon() { }
    Ribbon.create = function create(result, expanded) {
        if (typeof expanded === "undefined") { expanded = true; }
        $.ajax(Config.WEBSERVER_URL + Config.SEARCH_ENDPOINT, {
            data: {
                argv: JSON.stringify(result)
            },
            dataType: 'json',
            success: function (response) {
                if(response.success == true) {
                    Ribbon.inject(response.items[0].recipients[0].title, expanded);
                }
            }
        });
    }
    Ribbon.inject = function inject(contentCreator, expanded) {
        if (typeof expanded === "undefined") { expanded = true; }
        if(contentCreator == null) {
            return;
        }
        $("#ribbon").remove();
        $("body").append("<div id='ribbon' style='width:64px;height:64px;z-index:999999;'></div>");
        $("#ribbon").html("<a href='javascript:void(0)' id='ribbon-link'><img src='" + Utils.url("shared/images/icon.png") + "' id='ribbon-icon'/></a>");
        $("<div id='ribbon-content' style='display:none !important;'>Would you like to donate money to " + contentCreator + "<br /><a href=''>Donate</a></div>").insertAfter("#ribbon-link");
        $("#ribbon-link").click(function () {
            Ribbon.expand();
        });
        if(expanded) {
            Ribbon.expand(0);
        }
    }
    Ribbon.expand = function expand(delay) {
        if (typeof delay === "undefined") { delay = 600; }
        $("#ribbon-content").show();
        $("#ribbon").animate({
            height: 128,
            width: 256
        }, delay);
    }
    return Ribbon;
})();
