/// <reference path="../App.ts" />
class ContentParserRegistry {
    static registeredContentParsers:ContentParser[] = [];

    static registerParser(toRegister:ContentParser) {
        registeredContentParsers.push(toRegister);
    }

    static parserExists(url:string) {
        return getParser(url) != null;
    }

    static getParser(url: string):ContentParser {
        for(var i = 0;i < this.registeredContentParsers.length;i++) {
            if(this.registeredContentParsers[i].matches(url))
                return this.registeredContentParsers[i];
        }
        return null;
    }

    static unloadParsers() {
        registeredContentParsers = []
    }
}