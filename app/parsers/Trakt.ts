/// <reference path="../App.ts" />
class Trakt implements ContentParser {
    name() {
        return "Trakt.tv";
    }

    matches(url: string) {
        return url.match(".*trakt.tv/(show||movie)/.*") != null;
    }

    parse(url: string, page: JQuery) {
        var text = page.find("#header > ul > li > a.current").text();
        var type = text == "Movies" ? ContentType.MOVIE : ContentType.TV_SHOW
        return {
            type: type,
            title: url.match("(show||movie)/.*/?")[0].split("/")[1]
        }
    }
}