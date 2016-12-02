Template.layout.onCreated(function() {
    checkAuthenticatedInQlik(encodeURIComponent(window.location.href));
})