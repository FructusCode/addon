var Trakt = (function () {
    function Trakt() { }
    Trakt.prototype.name = function () {
        return "Trakt.tv";
    };
    Trakt.prototype.matches = function (url) {
        return url.match(".*trakt.tv/show/.*") != null;
    };
    Trakt.prototype.parse = function (url, page) {
        var match = url.match("show/.*/?");
        var split = match[0].split("/");
        return {
            type: ContentType.TV_SHOW,
            title: split[1]
        };
    };
    return Trakt;
})();
