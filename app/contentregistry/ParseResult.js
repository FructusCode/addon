var ParseResultType;
(function (ParseResultType) {
    ParseResultType._map = [];
    ParseResultType._map[0] = "TVSHOW";
    ParseResultType.TVSHOW = 0;
    ParseResultType._map[1] = "MOVIE";
    ParseResultType.MOVIE = 1;
    ParseResultType._map[2] = "GAME";
    ParseResultType.GAME = 2;
    ParseResultType._map[3] = "MUSIC";
    ParseResultType.MUSIC = 3;
    ParseResultType._map[4] = "UNKNOWN";
    ParseResultType.UNKNOWN = 4;
})(ParseResultType || (ParseResultType = {}));
var ParseResult = (function () {
    function ParseResult(result, resultType) {
        this.result = result;
        this.resultType = resultType;
    }
    return ParseResult;
})();
