/// <reference path="../App.ts" />
enum ParseResultType {
    TVSHOW,
    MOVIE,
    GAME,
    MUSIC,
    UNKNOWN
}

class ParseResult {
    public result: any;
    public resultType: ParseResultType;

    constructor(result: any, resultType: ParseResultType) {
        this.result = result;
        this.resultType = resultType;
    }
}