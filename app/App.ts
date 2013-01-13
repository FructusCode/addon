/// <reference path="../background.ts" />

///Content Registry
/// <reference path="contentregistry/ContentParser.ts" />
/// <reference path="contentregistry/Registry.ts" />
/// <reference path="contentregistry/ParseResult.ts" />
var contentParser = ContentParserRegistry.getParser(window.location.href);
alert(contentParser.parse(document.documentElement.outerHTML).result);