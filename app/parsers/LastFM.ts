/// <reference path="../App.ts" />
class LastFM implements ContentParser {
    name() {
        return "Last.FM";
    }

    matches(url: string) {
        return true;
    }

    parse(page: JQuery, url:string) {
        
        return new ParseResult("", ParseResultType.MUSIC);
    }

}