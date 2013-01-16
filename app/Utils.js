var Utils = (function () {
    function Utils() { }
    Utils._isFirefox = null;
    Utils._firefoxUrlBase = undefined;
    Utils.platform = function platform() {
        if(Utils._isFirefox == null) {
            Utils._isFirefox = !!($.browser.mozilla);
        }
        if(Utils._isFirefox) {
            return 'firefox';
        } else {
            return 'chrome';
        }
    }
    Utils.url = function url(path) {
        if(Utils.platform() == 'chrome') {
            return chrome.extension.getURL(path);
        } else {
            return Utils._firefoxUrlBase + path;
        }
    }
    return Utils;
})();
