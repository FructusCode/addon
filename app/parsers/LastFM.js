var LastFM = (function () {
    function LastFM() { }
    LastFM.prototype.name = function () {
        return "Last.FM";
    };
    LastFM.prototype.matches = function (url) {
        if(url.match(".*last\.fm/music/[a-zA-Z0-9/]*") == null) {
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
    LastFM.prototype.parse = function (url, page) {
        var info = url.split("/").splice(4).map(function (value, index, array) {
            return value.replace("+", " ");
        });
        return {
            type: ContentType.MUSIC,
            artist: info[0],
            album: info.length > 1 ? info[1] : null,
            track: info.length > 2 ? info[2] : null
        };
    };
    return LastFM;
})();
