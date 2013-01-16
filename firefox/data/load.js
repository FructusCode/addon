if(unsafeWindow.self == unsafeWindow.top) {
    (self).port.on('data_url', function (data_url) {
        Utils._firefoxUrlBase = data_url;
        new App(window.location.href, $("body"));
    });
    (self).port.emit('r-data_url', '');
}
