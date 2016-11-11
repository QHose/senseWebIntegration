var config = {
    host: Meteor.settings.public.host,
    prefix: '/' + Meteor.settings.public.virtualProxyClientUsage + '/',
    port: Meteor.settings.public.port,
    isSecure: Meteor.settings.public.isSecure,
};


Template.multipleDIVs.onRendered(function() {
    // var currentAppId = Session.get('currentAppId');
    // if (!currentAppId) {
    //     currentAppId = 'bd195c18-e1af-4e52-997f-774cc58eeb59' //set a default value for demo purposes
    //     console.log('We try to make a mashup for this app guid: ' + currentAppId);
    //     Session.set('currentAppId', currentAppId);
    // }

    console.log('multipleDivs onRendered');
    console.log('the settings to connect to Sense are: ', config)
    require.config({
        baseUrl: "http://" + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        qlik.setOnError(function(error) {
            console.error(error);
            // alert(error.message);
        });

        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, config);
        //get objects -- inserted here --
        app.getObject('QV01', 'Ggpaxa');
        app.getObject('QV03', 'PYcyD');
        app.getObject('QV04', 'VzxsQBD');
        app.getObject('QV05', 'VaQjnV');
        app.getObject('QV06', 'LVqUFme');
        app.getObject('QV02', 'eBwDCmJ');

    });
});
