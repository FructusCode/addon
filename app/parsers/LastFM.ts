/// <reference path="../App.ts" />
class LastFM implements ContentParser {
    name() {
        return "Last.FM";
    }

    matches(url: string) {
        if (!url.match(".*last\.fm/music/[a-zA-Z0-9/]*")) return false;
        var split = url.split("/");
        for (var i = 0; i < split.length; i++) {
            if(split[i].charAt(0) == "+")
                return false;
        }
        return true;
    }

    parse(page: JQuery, url:string) {
        var info = url.split("/").splice(0, 2).map((value, index, array) => value.replace("+", " "));
        var result = {
            artist: info[0],
            album: info.length > 1 ? info[1] : null,
            tracK: info.length > 2 ? info[2] : null
        };
        return new ParseResult(JSON.stringify(result), ParseResultType.MUSIC);
    }
}