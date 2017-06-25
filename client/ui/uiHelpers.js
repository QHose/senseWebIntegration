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

    if (Session.get('QAPOnly')) //show the link without menu
    //http://presales1:81/single/?appid=78f7312a-85c1-4428-b93e-0f2c1ea04b64&sheet=PumJhh&opt=currsel
url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "single/?appid=" + appGUID + "&sheet=VUkssjz&opt=currsel";

else {
    url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "sense/app/" + appGUID + '/sheet/VUkssjz/state/analysis';
}

    // console.log('the generated IFrame URL is: ' + url);
    return url;
});

Template.registerHelper('appGUID', function() {
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

    url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "single?appid=" + Meteor.settings.public.multipleDivAppGuid + '&obj=LVqUFme';

    // console.log('the generated IFrame URL is: ' + url);
    return url;
});


//url of QRS Meteor Server
Template.registerHelper('SaaSDemoURL', function() {
    return "http://" + Meteor.settings.public.QRSHost + ":" + Meteor.settings.public.portMeteorQRS
});

//url of the Qlik sense server
Template.registerHelper('QlikSenseDemoURL', function() {
    return QlikSenseDemoURL();
});

//url of the Qlik sense server for the js fiddles
Template.registerHelper('QlikSenseDemoURLAnon', function() {
    return "http://" + Meteor.settings.public.host + ":" + Meteor.settings.public.port + "/anon";
});


//only show stuff if it is part of qlik sense or QAP
Template.registerHelper('QSE', function() {
    return Session.get('QAPOnly');
});

QlikSenseDemoURL = function QlikSenseDemoURL() {
    return "http://" + Meteor.settings.public.host + ":" + Meteor.settings.public.port + "/" + Meteor.settings.public.virtualProxyClientUsage;
}

//url of the Qlik sense server
Template.registerHelper('cityBikeURL', function() {
    return "http://" + Meteor.settings.public.host + ":" + Meteor.settings.public.port + "/" + Meteor.settings.public.virtualProxyClientUsage + "/extensions/DemoMashup/home.html";
});
