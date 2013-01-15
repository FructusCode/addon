var Trakt = (function () {
    function Trakt() { }
    Trakt.prototype.name = function () {
        return "Trakt.tv";
    };
    Trakt.prototype.matches = function (url) {
        return url.match(".*trakt.tv/(show||movie)/.*") != null;
    };
    Trakt.prototype.parse = function (url, page) {
        return {
            type: page.find("#header > ul > li > a.current").text() == "Movies" ? ContentType.MOVIE : ContentType.TV_SHOW,
            title: url.match("(show||movie)/.*/?")[0].split("/")[1]
        };
    };
    return Trakt;
})();
