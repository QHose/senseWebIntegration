Template.app.helpers({
    appURL: function() {
        var appGUID = Session.get('currentAppId');
        var url = '';
        if (!appGUID) {
            //if not in the session, then get the demo app from the config
            appGUID = Meteor.settings.public.multipleDivAppGuid
        }

        url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "sense/app/" + appGUID+'/sheet/VUkssjz/state/analysis';

        console.log('the generated IFrame URL is: ' + url);
        return url;
    }
});
