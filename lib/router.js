Router.configure({
    layoutTemplate: 'regionLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/onlyMultipleIframes', {
    template: 'multipleCharts',
    layoutTemplate: 'emptyLayout'
});

Router.route('/onlySheet', {
    template: 'app',
    layoutTemplate: 'emptyLayout'
});

Router.route('/onlyChart', {
    template: 'only1Chart',
    layoutTemplate: 'emptyLayout'
});

Router.route('/onlyMultipleDivs', {
    template: 'multipleDivs',
    layoutTemplate: 'emptyLayout'
});

Router.route('/', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('hubExplanationText', { to: 'asideExplanation' });
    this.render('hub'); //
});

Router.route('/hub', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('hubExplanationText', { to: 'asideExplanation' });
    this.render('hub');
});

Router.route('/app', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('appExplanationText', { to: 'asideExplanation' });
    this.render('app');
});

Router.route('/1chart', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('chartExplanationText', { to: 'asideExplanation' });
    this.render('1chart');
});

Router.route('/multipleCharts', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('multipleChartsExplanationText', { to: 'asideExplanation' });
    this.render('multipleCharts');
});

Router.route('/multipleDivs', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('multipleDivExplanationText', { to: 'asideExplanation' });
    this.render('multipleDivs');
});

Router.route('/cityBike', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('cityBikeExplanationText', { to: 'asideExplanation' });
    this.render('cityBike');
});

Router.route('/onTheFlybarChart', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('onTheFlyExplanation', { to: 'asideExplanation' });
    this.render('onTheFlybarChart');
});

Router.route('/google', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('tableUsingWidgetsExplanation', { to: 'asideExplanation' });
    this.render('google');
});

Router.route('/chartJS', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('tableUsingWidgetsExplanation', { to: 'asideExplanation' });
    this.render('chartJS');
});

Router.route('/tableUsingWidgets', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('tableUsingWidgetsExplanation', { to: 'asideExplanation' });
    this.render('tableUsingWidgets');
});

// Router.route('/multipleDivsAndCustomControls');

//generic routes
Router.route('/appList');
Router.route('/QRS.pathList');
