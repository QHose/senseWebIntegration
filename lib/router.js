Router.configure({
    layoutTemplate: 'regionLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
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

Router.route('/customTable', function() {
    this.render('nav', { to: 'nav' });
    this.render('sideMenu', { to: 'aside' });
    this.render('onTheFlyExplanation', { to: 'asideExplanation' });
    this.render('customTable');
});

// Router.route('/multipleDivsAndCustomControls');

//generic routes
Router.route('/appList');
Router.route('/QRS.pathList');
