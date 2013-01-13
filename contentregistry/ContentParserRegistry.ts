/**
 * Created with IntelliJ IDEA.
 * User: UberMouse
 * Date: 13/01/13
 * Time: 18:38
 * To change this template use File | Settings | File Templates.
 */
module ContentRegistry {
    export class ContentParserRegistry {
        var registeredContentScrapers:ContentParser[] = [];

        static registerContentScraper(toRegister:ContentParser) {
            registeredContentScrapers[toRegister.name] = toRegister;
        }

        static scraperExists(url:string) {
            for(var i = 0;i < registeredContentScrapers.length;i++) {
                if(registeredContentScrapers[i].matches(url))
                    return true;
            }
            return false;
        }
    }
}