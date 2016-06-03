//require('/imports/Qlik/require.js');
// import '/imports/Qlik/require.js'; 


// var config = {
//     host: window.location.hostname,
//     prefix: "/",
//     port: 80,
//     isSecure: window.location.protocol === "https:"
// };


Template.multipleDivs.events({
    'click': function() {
        // ...
    }
});

Template.multipleDivs.onCreated(function() {
	var currentAppId = Session.get('currentAppId');
    if(!currentAppId){
    	currentAppId = 'debd03a3-a2a9-41cc-901c-d21b44279783' //set a default value for demo purposes
    	Session.set('currentAppId', currentAppId);
    } 

        myQlik(function(qlik, config) {
            var app = qlik.openApp(currentAppId, config);

            // match each DIV in the html to the Qlik Sense object GUID'
            app.getObject('CurrentSelections', 'CurrentSelections');
            app.getObject('QV04', 'grmSd');
            app.getObject('QV02', 'GdjmWq');
            app.getObject('QV01', 'JfpX');
            app.getObject('QV03', 'Qjndk');

        })

});
