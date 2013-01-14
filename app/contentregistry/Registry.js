var ContentParserRegistry = (function () {
    function ContentParserRegistry() { }
    ContentParserRegistry.registeredContentParsers = [];
    ContentParserRegistry.registerParser = function registerParser(toRegister) {
        ContentParserRegistry.registeredContentParsers.push(toRegister);
    }
    ContentParserRegistry.parserExists = function parserExists(url) {
        return ContentParserRegistry.getParser(url) != null;
    }
    ContentParserRegistry.getParser = function getParser(url) {
        for(var i = 0; i < this.registeredContentParsers.length; i++) {
            if(this.registeredContentParsers[i].matches(url)) {
                return this.registeredContentParsers[i];
            }
        }
        return null;
    }
    ContentParserRegistry.unloadParsers = function unloadParsers() {
        ContentParserRegistry.registeredContentParsers = [];
    }
    return ContentParserRegistry;
})();
