Template.regionLayout.onCreated(function() {
  //   checkAuthenticatedInQlik(encodeURIComponent(window.location.href));
});

Template.regionLayout.onRendered(function() {
  this.$(".ui.accordion").accordion();
});
