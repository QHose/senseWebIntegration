Template.app.helpers({
    appURL: function() {
        var appGUID = Session.get('currentAppId');
        var url = '';
        if(!appGUID){
            url = 'https://sense-demo.qlik.com/sense/app/075506ed-73ee-4f1a-b9a0-1955df0bb3e0/sheet/FaQeFa/state/analysis'  
        }
        else{
            url = (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "sense/app/" + appGUID; 
        }        
        console.log('the generated IFrame URL is: '+ url);
        return url;
    }
});
