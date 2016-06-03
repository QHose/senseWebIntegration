_ = lodash;

UI.registerHelper('formatDate', function(date) {
	return moment(date).format('DD/MM/YYYY');
});


UI.registerHelper('appList', function() {
	return Session.get('appList');
});
