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
    	currentAppId = '0d936428-7969-4b0c-a1e7-223ab22d39ff' //set a default value for demo purposes to 
    	Session.set('currentAppId', currentAppId);
    } 

    myQlik(function(qlik, config) {
        var app1 = qlik.openApp(currentAppId, config);

            // match each DIV in the html to the Qlik Sense object GUID'
            app1.getObject('CurrentSelections', 'CurrentSelections');
           //get objects -- inserted here --
           // app1.getObject('QV03','mhkbTp');
           app1.getObject('QV01','ENfmjW');
           app1.getObject('QV02','XGNFc');
           app1.getObject('QV04','FPYwSz');
           app1.getObject('QV03','pygyduy');
       })

});
