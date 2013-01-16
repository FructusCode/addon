/// <reference path="App.ts" />
declare var testCSS: any;

class Utils {
    static private _isFirefox = null;
    static _firefoxUrlBase;

    static platform() {
        if (Utils._isFirefox == null)
            Utils._isFirefox = !!($.browser.mozilla);

        if (Utils._isFirefox)
            return 'firefox';
        else
            return 'chrome';
    }

    static url(path:string) {
        if (Utils.platform() == 'chrome') {
            return chrome.extension.getURL(path);
        } else {
            return Utils._firefoxUrlBase + path;
        }
    }
}