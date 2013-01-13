/// <reference path="app.ts" />
class TestParser implements ContentParser {
    name() {
        return "Test Parser";
    }

    matches(url: string) {
        return true;
    }

    parse(html: string):ParseResult {
        return new ParseResult("", ParseResultType.GAME);
    }
}