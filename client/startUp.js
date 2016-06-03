

Meteor.startup(function() {
   console.log('In meteor startup, get apps');
        myQlik(function(qlik) {
            qlik.getAppList(function(apps) {
                console.log('get app list from Sense: ');     
                console.log(apps);
                // _.each(list, function(app) {
                //     appList.insert(app);
                //     console.log("Updated Sense apps in Mongo collection, Inserted app" + app.qDocName);
                // })
                Session.set('appList', apps); 
            }, qConfig);
        }) 
});


