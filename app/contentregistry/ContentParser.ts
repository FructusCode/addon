/// <reference path="../App.ts" />
interface ContentParser {
    name(): string;
    matches(url: string): bool;
    parse(url:string, page: JQuery): any;
}