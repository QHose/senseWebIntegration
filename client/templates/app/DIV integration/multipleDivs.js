var config = {
    host: Meteor.settings.public.host,
    prefix: '/' + Meteor.settings.public.virtualProxyClientUsage + '/',
    port: Meteor.settings.public.port,
    isSecure: Meteor.settings.public.isSecure,
};


Template.multipleDivs.events({
    'click': function() {
        // ...
    }
});

Template.multipleDivs.onRendered(function() {
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
            çonsole.error(error);
            alert(error.message);
        });

        //callbacks -- inserted here --
        //open apps -- inserted here --
        var app = qlik.openApp('bd195c18-e1af-4e52-997f-774cc58eeb59', config);

        //get objects -- inserted here --
        app.getObject('QV03', 'grmSd');
        app.getObject('QV05', 'wJPVL');
        app.getObject('QV01', 'WmmqHK');
        app.getObject('QV06', 'vEAJLgj');
        app.getObject('QV04', 'mxJdtR');
        app.getObject('QV02', 'JxjhqT');
        //create cubes and lists -- inserted here --

    });


    // myQlik(function(qlik, config) {
    //     var app = qlik.openApp(currentAppId, config);

    //     // match each DIV in the html to the Qlik Sense object GUID'
    //     app.getObject('CurrentSelections', 'CurrentSelections');
    //     app.getObject('QV03', 'grmSd');
    //     app.getObject('QV05', 'wJPVL');
    //     app.getObject('QV01', 'WmmqHK');
    //     app.getObject('QV06', 'vEAJLgj');
    //     app.getObject('QV04', 'mxJdtR');
    //     app.getObject('QV02', 'JxjhqT');
    // })


});
