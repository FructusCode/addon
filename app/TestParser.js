var TestParser = (function () {
    function TestParser() { }
    TestParser.prototype.name = function () {
        return "Test Parser";
    };
    TestParser.prototype.matches = function (url) {
        return true;
    };
    TestParser.prototype.parse = function (html) {
        return new ParseResult("test parser, WHAT THE FUCK ARE YOU DOING", ParseResultType.GAME);
    };
    return TestParser;
})();
//@ sourceMappingURL=TestParser.js.map
