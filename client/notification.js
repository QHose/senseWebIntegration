Meteor.startup(function () {

  sAlert.config({
    effect: '',
    position: 'top',
    timeout: 3000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0
  });

});