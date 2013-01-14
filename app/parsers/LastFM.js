var LastFM = (function () {
    function LastFM() { }
    LastFM.prototype.name = function () {
        return "Last.FM";
    };
    LastFM.prototype.matches = function (url) {
        if(!url.match(".*last\.fm/music/[a-zA-Z0-9/]*")) {
            return false;
        }
        var split = url.split("/");
        for(var i = 0; i < split.length; i++) {
            if(split[i].charAt(0) == "+") {
                return false;
            }
        }
        return true;
    };
    LastFM.prototype.parse = function (page, url) {
        var info = url.split("/").splice(0, 2).map(function (value, index, array) {
            return value.replace("+", " ");
        });
        var result = {
            artist: info[0],
            album: info.length > 1 ? info[1] : null,
            tracK: info.length > 2 ? info[2] : null
        };
        return new ParseResult(JSON.stringify(result), ParseResultType.MUSIC);
    };
    return LastFM;
})();
//@ sourceMappingURL=LastFM.js.map
