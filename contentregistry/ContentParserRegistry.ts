/// <reference path="../App.ts" />
/**
 * Created with IntelliJ IDEA.
 * User: UberMouse
 * Date: 13/01/13
 * Time: 18:38
 * To change this template use File | Settings | File Templates.
 */
module ContentRegistry {
    export class ContentParserRegistry {
        registeredContentScrapers:ContentParser[] = [];

        static registerContentScraper(toRegister:ContentParser) {
            this.registeredContentScrapers.push(toRegister);
        }

        static scraperExists(url:string) {
            for(var i = 0;i < this.registeredContentScrapers.length;i++) {
                if(this.registeredContentScrapers[i].matches(url))
                    return true;
            }
            return false;
        }
    }
}