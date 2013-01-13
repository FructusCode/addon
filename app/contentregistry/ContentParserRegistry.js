var ContentRegistry;
(function (ContentRegistry) {
    var ContentParserRegistry = (function () {
        function ContentParserRegistry() {
            this.registeredContentScrapers = [];
        }
        ContentParserRegistry.registerContentScraper = function registerContentScraper(toRegister) {
            this.registeredContentScrapers.push(toRegister);
        }
        ContentParserRegistry.scraperExists = function scraperExists(url) {
            for(var i = 0; i < this.registeredContentScrapers.length; i++) {
                if(this.registeredContentScrapers[i].matches(url)) {
                    return true;
                }
            }
            return false;
        }
        return ContentParserRegistry;
    })();
    ContentRegistry.ContentParserRegistry = ContentParserRegistry;    
})(ContentRegistry || (ContentRegistry = {}));
//@ sourceMappingURL=ContentParserRegistry.js.map
