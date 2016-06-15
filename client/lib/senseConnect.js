 qConfig = {
        host: '2008ENT',
        prefix: "/",
        port: 80,
        isSecure: false, //window.location.protocol === "https:"
    };


myQlik = function myQlik(callback) {  
    require.config({
        baseUrl: (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        qlik.setOnError(function(error) {
            sAlert.error(error.message);
        });


        callback(qlik, qConfig);
        

    });


};


