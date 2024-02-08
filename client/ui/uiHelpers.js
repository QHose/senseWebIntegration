qConfig = {
    host: Meteor.settings.public.host,
    prefix: '/' + Meteor.settings.public.virtualProxyClientUsage + '/',
    port: Meteor.settings.public.port,
    isSecure: Meteor.settings.public.isSecure,
};

var prefix = Meteor.settings.public.isSecure? 'https://':'http://'

Template.registerHelper('host', function() {
    return Meteor.settings.public.host;
});

//HUB
Template.registerHelper('hubURL', function() {
    return prefix + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "hub";
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
    {
        url = prefix + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "single/?appid=" + appGUID + "&sheet=f4d81a06-1a01-4354-8566-e7df5577a4db&opt=currsel";
    }
    else {
        url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "sense/app/" + appGUID + '/sheet/f4d81a06-1a01-4354-8566-e7df5577a4db/state/analysis';
    }

    console.log('the generated IFrame URL is: ' + url);
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

    url = prefix + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "single?appid=" + Meteor.settings.public.multipleDivAppGuid + '&obj=pvFsfn';

    // console.log('the generated IFrame URL is: ' + url);
    return url;
});


//url of QRS Meteor Server
Template.registerHelper('SaaSDemoURL', function() {
    return prefix + Meteor.settings.public.QRSHost + ":" + Meteor.settings.public.portMeteorQRS
});

//url of the Qlik sense server
Template.registerHelper('QlikSenseDemoURL', function() {
    return QlikSenseDemoURL();
});

//url of the Qlik sense server for the js fiddles
Template.registerHelper('QlikSenseDemoURLAnon', function() {
    return prefix + Meteor.settings.public.host + ":" + Meteor.settings.public.port + "/anon";
});


//only show stuff if it is part of qlik sense or QAP
Template.registerHelper('QSE', function() {
    return Session.get('QAPOnly');
});

QlikSenseDemoURL = function QlikSenseDemoURL() {
    return prefix + Meteor.settings.public.host + ":" + Meteor.settings.public.port + "/" + Meteor.settings.public.virtualProxyClientUsage;
}

//url of the Qlik sense server
Template.registerHelper('cityBikeURL', function() {
    return prefix + Meteor.settings.public.host + ":" + Meteor.settings.public.port + "/" + Meteor.settings.public.virtualProxyClientUsage + "/extensions/DemoMashup/home.html";
});
