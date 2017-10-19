_ = lodash;

UI.registerHelper('formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY');
});


UI.registerHelper('appList', function() {
    return Session.get('appList');
});

Meteor.startup(function() {
    if (!Meteor.settings) {
        throw new Error('We can not find any settings parameters, did you mount your config folder which contains a settings.json file?');
    } else {
        console.log('Settings file found: ', Meteor.settings);
    }
})