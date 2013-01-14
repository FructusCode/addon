var LastFM = (function () {
    function LastFM() { }
    LastFM.prototype.name = function () {
        return "Last.FM";
    };
    LastFM.prototype.matches = function (url) {
        return true;
    };
    LastFM.prototype.parse = function (page) {
        return new ParseResult("", ParseResultType.MUSIC);
    };
    return LastFM;
})();
//@ sourceMappingURL=LastFM.js.map
