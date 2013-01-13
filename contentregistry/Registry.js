var ContentParserRegistry;
(function (ContentParserRegistry) {
    var Registry = (function () {
        function Registry() {
            this.registeredContentScrapers = [];
        }
        Registry.registerContentScraper = function registerContentScraper(toRegister) {
            this.registeredContentScrapers.push(toRegister);
        }
        Registry.scraperExists = function scraperExists(url) {
            for(var i = 0; i < this.registeredContentScrapers.length; i++) {
                if(this.registeredContentScrapers[i].matches(url)) {
                    return true;
                }
            }
            return false;
        }
        return Registry;
    })();
    ContentParserRegistry.Registry = Registry;    
})(ContentParserRegistry || (ContentParserRegistry = {}));
//@ sourceMappingURL=Registry.js.map
