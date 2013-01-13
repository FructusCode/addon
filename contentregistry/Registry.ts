/// <reference path="../App.ts" />
class ContentParserRegistry {
    registeredContentParsers:ContentParser[] = [];

    static registerParser(toRegister:ContentParser) {
        this.registeredContentScrapers.push(toRegister);
    }

    static parserExists(url:string) {
        return getParser(url) != null;
    }

    static getParser(url: string):ContentParser {
        for(var i = 0;i < this.registeredContentScrapers.length;i++) {
            if(this.registeredContentScrapers[i].matches(url))
                return this.registeredContentScrapers[i];
        }
        return null;
    }
}