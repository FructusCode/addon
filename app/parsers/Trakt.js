var Trakt = (function () {
    function Trakt() { }
    Trakt.prototype.name = function () {
        return "Trakt.tv";
    };
    Trakt.prototype.matches = function (url) {
        return url.match(".*trakt.tv/(show||movie)/.*") != null;
    };
    Trakt.prototype.parse = function (url, page) {
        var text = page.find("#header > ul > li > a.current").text();
        var type = text == "Movies" ? ContentType.MOVIE : ContentType.TV_SHOW;
        return {
            type: type,
            title: url.match("(show||movie)/.*/?")[0].split("/")[1]
        };
    };
    return Trakt;
})();
