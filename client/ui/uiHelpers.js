qConfig = {
    host: Meteor.settings.public.host,
    prefix: '/' + Meteor.settings.public.virtualProxyClientUsage + '/',
    port: Meteor.settings.public.port,
    isSecure: Meteor.settings.public.isSecure,
};

Template.registerHelper('host', function() {
    return Meteor.settings.public.host;
});

//HUB
Template.registerHelper('hubURL', function() {
    return "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "hub";
});

//APP
Template.registerHelper('appURL', function() {
    var appGUID = Session.get('currentAppId');
    var url = '';
    if (!appGUID) {
        //if not in the session, then get the demo app from the config
        appGUID = Meteor.settings.public.multipleDivAppGuid
    }

    url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "sense/app/" + appGUID + '/sheet/VUkssjz/state/analysis';

    console.log('the generated IFrame URL is: ' + url);
    return url;
});

Template.registerHelper('appGUID', function(){
    return Meteor.settings.public.multipleDivAppGuid;
})

//1 CHART
Template.registerHelper('chartIframeURL', function() {
    var appGUID = Session.get('currentAppId');
    var url = '';
    if (!appGUID) {
        //if not in the session, then get the demo app from the config
        appGUID = Meteor.settings.public.multipleDivAppGuid
    }

    url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "single?appid=" + Meteor.settings.public.multipleDivAppGuid + '&obj=VzxsQBD';

    console.log('the generated IFrame URL is: ' + url);
    return url;
});


//url of QRS Meteor Server
Template.registerHelper('SaaSDemoURL', function() {
    return "http://" + Meteor.settings.public.QRSHost + ":" + Meteor.settings.public.portMeteorQRS
});

//url of the Qlik sense server
Template.registerHelper('QlikSenseDemoURL', function() {
    return "http://" + Meteor.settings.public.host + ":" + Meteor.settings.public.port+"/"+Meteor.settings.public.virtualProxyClientUsage
});

//url of the Qlik sense server
Template.registerHelper('cityBikeURL', function() {
    return "http://" + Meteor.settings.public.host + ":" + Meteor.settings.public.port+"/"+Meteor.settings.public.virtualProxyClientUsage+"/extensions/DemoMashup/home.html";
});

