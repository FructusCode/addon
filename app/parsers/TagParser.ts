///<reference path="../App.ts" />
class TagParser implements ContentParser {
    name() {
       return "Generic Tag/Slug parser";
    }

    matches(url: string) {
        return true;
    }

    parse(url: string, page: JQuery) {
        var tags = page.html().match("$[^\s]+");
        if (tags == null) return null;
        return {
            type: ContentType.TAG,
            title: tags[0] 
        }
    }
}