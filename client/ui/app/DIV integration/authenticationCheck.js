checkAuthenticatedInQlik = function checkAuthenticatedInQlik(sourceURL){
	require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    console.log('HTML page created, check if user is authenticated in Qlik Sense');
    require(["js/qlik"], function(qlik) {
            if (typeof qlik == 'undefined') {
                console.log('user is NOT logged in in Sense. Sent him to a dummy page in Qlik Sense, so the authentication flow is triggered, and ensure he comes back to this page via the return URL', encodeURIComponent(window.location.href));
                Session.set('authenticated', false)

                window.location = QlikSenseDemoURL() + "/resources/returnUrl.html?returnUrl=" + sourceURL;
            } else {
                console.log('user IS logged in in Sense');
                Session.set('authenticated', true)
            }
        })
}