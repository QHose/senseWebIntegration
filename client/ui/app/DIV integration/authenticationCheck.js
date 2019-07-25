Meteor.startup(function() {
    checkAuthenticatedInQlik()
})




checkAuthenticatedInQlik = function checkAuthenticatedInQlik(sourceURL = encodeURIComponent(window.location.href)) {
    var protocol = Meteor.settings.public.isSecure? 'https://':'http://';
    console.log('baseUrl for Qlik require config: '+protocol + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources");
    require.config({        
        baseUrl: protocol + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    console.log('Basic HTML page created, next check if user is authenticated in Qlik Sense to ensure all charts render properly...');
    require(["js/qlik"], function(qlik) {      	
            
            if (typeof qlik == 'undefined') {
                console.log('user is NOT logged in in Sense. Sent him to a dummy page in Qlik Sense, so the authentication flow is triggered, and ensure he comes back to this page via the return URL', encodeURIComponent(window.location.href));
                window.location = QlikSenseDemoURL() + "/resources/returnUrl.html?returnUrl=" + sourceURL;
            } else {
                console.log('user IS logged in in Sense');
            }
        })
}