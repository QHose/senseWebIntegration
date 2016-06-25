
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
    return (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix+"/hub"; 
});