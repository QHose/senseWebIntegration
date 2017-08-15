Template.webIntegrationMessage.onRendered(function() {
    this.$('.ui.accordion')
        .accordion();
})

Template.nav.helpers({
    // Session and localstorage do not work cross domains. 
    // For the Cookies the requirejs is not loading
    // I will be passing the userRole as a url parameter for now.
    userRole() {
        let ur = getQueryParams('ur');
        if (ur) {
            switch (ur) {
                case '1':
                    // Session.set('userRole', 'Developer');
                    localStorage['userRole'] = 'Developer';
                    break;
                case '2':
                    // Session.set('userRole', 'Product Owner');
                    localStorage['userRole'] = 'Product Owner';
                    break;
                case '5':
                    // Session.set('userRole', 'CTO');
                    localStorage['userRole'] = 'CTO';
                    break;
            }
        }
        let role = 'Select a role'
        // if (Session.get('userRole')) {
        //     role = Session.get('userRole')
        //     $('.dropdown-menu li').find(role).parent().addClass('active')
        // } else {
        //     Session.set('userRole', role);
        // }
        if (localStorage.userRole) {
            role = localStorage.userRole
            $('.dropdown-menu li').find(role).parent().addClass('active')
        } else {
            localStorage['userRole'] = role;
        }
        return role;
    },
});
Template.nav.onRendered(function() {
    this.$('.header .dropdown-toggle').dropdown()
    this.$('.header .dropdown-toggle').on('click', function(){
        $('.header .dropdown-menu').toggle()
    });
    this.$('.header .dropdown-menu a').on('click', function(){
        role = $(this).attr("data")
        // Session.set('userRole', role);
        localStorage['userRole'] = role;
        $('.dropdown-menu li').removeClass('active')
        $(this).parent().addClass('active');
        $('.header .dropdown-menu').toggle()
    });
});

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

Template.EmbedFooter.helpers({
    nav() {
        let nav = {
            'Developer': {
                previous: {
                    text: 'PREVIOUS: Home',
                    link: '/'
                },
                next: {
                    text: 'NEXT: Self Service',
                    link: '/'
                }
            },
            'Product Owner': {
                previous: {
                    text: 'PREVIOUS: Embed Qlik Sense',
                    link: '/'
                },
                next: {
                    text: 'NEXT: Resources',
                    link: '/'
                }
            },
            'CTO': {
                previous: {
                    text: 'PREVIOUS: Embed Qlik Sense',
                    link: '/'
                },
                next: {
                    text: 'NEXT: SAAS Provisioning',
                    link: '/'
                }
            },
        }
        if (localStorage.userRole==='Developer' || localStorage.userRole==='Product Owner' || localStorage.userRole==='CTO') {
            return nav[localStorage.userRole];
        } else {
            return false;
        }
    },
    isNavVisible() {
        // if (Session.get('userRole')==='Developer' || Session.get('userRole')==='Product Owner' || Session.get('userRole')==='CTO') {
        if (localStorage.userRole==='Developer' || localStorage.userRole==='Product Owner' || localStorage.userRole==='CTO') {
            return true;
        } else {
            return false;
        }
    }
});

// @TODO Replace
function getQueryParams(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}