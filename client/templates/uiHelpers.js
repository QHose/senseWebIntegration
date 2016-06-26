
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

Template.registerHelper('SaaSDemoURL', function() {
    return "http://" + window.location.hostname + ":3000"; 
});