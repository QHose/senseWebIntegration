 qConfig = {
        host: Meteor.settings.public.host,
        prefix: '/'+Meteor.settings.public.virtualProxyClientUsage+'/',
        port: Meteor.settings.public.port,
        isSecure: Meteor.settings.public.isSecure,
    };


myQlik = function myQlik(callback) {  
    // require.config({
    //     baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    //     // baseUrl: (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    // });

    // require(["js/qlik"], function(qlik) {
    //     qlik.setOnError(function(error) {
    //         sAlert.error(error.message);
    //         console.log(error);
    //     });


    //     callback(qlik, qConfig);
        

    // });
};



// qConfig = {
//         host: Meteor.settings.public.host,
//         prefix: Meteor.settings.public.virtualProxyClientUsage,
//         port: Meteor.settings.public.port,
//         isSecure: Meteor.settings.public.isSecure,
//     };

// myQlik = function myQlik(callback) {  
//     require.config({
//         baseUrl: (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + '/'+qConfig.prefix + "/resources"
//     });

//     require(["js/qlik"], function(qlik) {
//         qlik.setOnError(function(error) {
//             console.log(error);
//             sAlert.error(error.message);
//         });


//         callback(qlik, qConfig);
        

//     });


// };


