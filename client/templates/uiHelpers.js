
qConfig = {
        host: Meteor.settings.public.host,
        prefix: '/'+Meteor.settings.public.virtualProxyClientUsage+'/',
        port: Meteor.settings.public.port,
        isSecure: Meteor.settings.public.isSecure,
    };

Template.registerHelper('host', function() {
    return Meteor.settings.public.host;
});


Template.registerHelper('hubURL', function() {
    return "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix+"hub"; 
});

Template.registerHelper('chartIframeURL', function() {    
    var appGUID = Session.get('currentAppId');
        var url = '';
        if (!appGUID) {
            //if not in the session, then get the demo app from the config
            appGUID = Meteor.settings.public.multipleDivAppGuid
        }

        url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix+"single?appid="+Meteor.settings.public.multipleDivAppGuid+'&obj=VzxsQBD&select=clearall'; 

        console.log('the generated IFrame URL is: ' + url);
        return url;
});

Template.registerHelper('SaaSDemoURL', function() {
    return "http://" + Meteor.settings.public.host + ":"+Meteor.settings.public.portMeteorQRS
});

Template.registerHelper('QlikSenseDemoURL', function() {
    return "http://" + Meteor.settings.public.host + ":"+Meteor.settings.public.port
});