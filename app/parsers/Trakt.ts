/// <reference path="../App.ts" />
class Trakt implements ContentParser {
    name() {
        return "Trakt.tv";
    }

    matches(url: string) {
        return url.match(".*trakt.tv/show/.*") != null;
    }

    parse(url: string, page: JQuery) {
        return {
            type: ContentType.TV_SHOW,
            title: url.match("show/.*/?")[0].split("/")[1]
        }
    }
}