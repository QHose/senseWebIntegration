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
    if (!currentAppId) {
        currentAppId = 'bd195c18-e1af-4e52-997f-774cc58eeb59' //set a default value for demo purposes
        console.log('We try to make a mashup for this app guid: '+currentAppId); 
        Session.set('currentAppId', currentAppId);
    }

    myQlik(function(qlik, config) {
        var app = qlik.openApp(currentAppId, config);

        // match each DIV in the html to the Qlik Sense object GUID'
        app.getObject('CurrentSelections', 'CurrentSelections');
        app.getObject('QV03', 'grmSd');
        app.getObject('QV05', 'wJPVL');
        app.getObject('QV01', 'WmmqHK');
        app.getObject('QV06', 'vEAJLgj');
        app.getObject('QV04', 'mxJdtR');
        app.getObject('QV02', 'JxjhqT');
    })

});
