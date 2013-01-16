/// <reference path="../../app/App.ts" />

declare var unsafeWindow: any;
declare var require: any;

if(unsafeWindow.self == unsafeWindow.top) {
    (<any>self).port.on('data_url', function (data_url) {
        Utils._firefoxUrlBase = data_url;

        new App(window.location.href, $("body"));
    });
    (<any>self).port.emit('r-data_url', '');

}