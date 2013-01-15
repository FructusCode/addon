/// <reference path="../App.ts" />
class Trakt implements ContentParser {
    name() {
        return "Trakt.tv";
    }

    matches(url: string) {
        return url.match(".*trakt.tv/(show||movie)/.*") != null;
    }

    parse(url: string, page: JQuery) {
        return {
            type: page.find("#header > ul > li > a.current").text() == "Movies" ? ContentType.MOVIE : ContentType.TV_SHOW,
            title: url.match("(show||movie)/.*/?")[0].split("/")[1]
        }
    }
}