/// <reference path="../App.ts" />
interface ContentParser {
    name(): string;
    matches(url: string): bool;
    parse(page: JQuery, url:string): ParseResult;
}