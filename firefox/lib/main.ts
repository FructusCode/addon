declare var require: any;

var data = require("self").data;
var pageMod = require("page-mod");

pageMod.PageMod({
    include: "*",
    contentStyleFile: data.url("shared/ribbon.css"),
    contentScriptWhen: 'ready',
    contentScriptFile: [
        data.url("shared/parsers/LastFM.js"),
        data.url("shared/parsers/Trakt.js"),
        data.url("shared/lib/jquery.1.8.3.min.js"),
        data.url("shared/contentregistry/Registry.js"),
        data.url("shared/contentregistry/ContentType.js"),
        data.url("shared/Config.js"),
        data.url("shared/Ribbon.js"),
        data.url("shared/Utils.js"),
        data.url("shared/app.js"),
        data.url("load.js")
    ],
    onAttach: function (worker) {
        worker.port.on('r-data_url', function (text) {
            worker.port.emit('data_url', data.url());
        });
    }
});