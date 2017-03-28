Template.webIntegrationMessage.onRendered(function() {
    this.$('.ui.accordion')
        .accordion();
})

Template.sideMenu.onRendered(function() {
	Session.set('QAPOnly', false);
    this.$('.ui.dropdown')
        .dropdown();
})

Template.sideMenu.events({
    'change .checkbox.template' (event, template) {
        if (event.target.checked) {
        	Session.set('QAPOnly', true);
        } else {
        	Session.set('QAPOnly', false);
        }
    }
})

Template.sideMenu.helpers({
    checked() {
        return Session.get('QAPOnly')? 'checked':'';
    }
})