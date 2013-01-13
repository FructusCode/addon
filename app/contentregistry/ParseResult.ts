/// <reference path="../App.ts" />
enum ParseResultType {
    TVSHOW,
    MOVIE,
    GAME,
    MUSIC,
    UNKNOWN
}

class ParseResult {
    public result: string;
    public resultType: ParseResultType;

    constructor(result: string, resultType: ParseResultType) {
        this.result = result;
        this.resultType = resultType;
    }
}