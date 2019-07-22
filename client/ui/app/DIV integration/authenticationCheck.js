Meteor.startup(function() {
    checkAuthenticatedInQlik()
})


checkAuthenticatedInQlik = function checkAuthenticatedInQlik(sourceURL = encodeURIComponent(window.location.href)) {
	require.config({
        baseUrl: "https://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    console.log('Basic HTML page created, next check if user is authenticated in Qlik Sense to ensure all charts render properly...');
    require(["js/qlik"], function(qlik) {
        	qlik.setOnError(function (error) {
        	    console.error(error);
            });
            
            if (typeof qlik == 'undefined') {
                console.log('user is NOT logged in in Sense. Sent him to a dummy page in Qlik Sense, so the authentication flow is triggered, and ensure he comes back to this page via the return URL', encodeURIComponent(window.location.href));
                window.location = QlikSenseDemoURL() + "/resources/returnUrl.html?returnUrl=" + sourceURL;
            } else {
                console.log('user IS logged in in Sense');
            }
        })
}