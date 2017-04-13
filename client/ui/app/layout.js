Template.layout.onCreated(function() {
    checkAuthenticatedInQlik(encodeURIComponent(window.location.href));
})

process.env.ROOT_URL = 'http://' + Meteor.settings.public.host;
console.log('********* Meteor runs on host ROOT_URL: ', process.env.ROOT_URL);