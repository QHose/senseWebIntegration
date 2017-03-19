Template.multipleDivs.helpers({
    draggableChecked() {
        var drag = Session.get('draggable');
        return drag ? 'checked' : '';
    },
    allowInteractionsChecked() {
        var allow = Session.get('allowInteractions');
        return allow ? 'checked' : '';
    },
})

Template.divTagDefaultBullet.helpers({
    SenseLayout() {
        return Session.get('SenseLayout');
    }
})

Template.multipleDivs.events({
    'change .checkbox.draggable' (event, template) {
        if (event.target.checked) {
            Session.set('draggable', true);
            Session.set('allowInteractions', false)
        } else {
            Session.set('draggable', false);
        }
    },
    'change .checkbox.allowInteractions' (event, template) {
        if (event.target.checked) {
            Session.set('draggable', false);
            Session.set('allowInteractions', true)
        } else {
            Session.set('allowInteractions', false);
        }
    }
})

Template.multipleDivs.onRendered(function() {
    checkAuthenticatedInQlik(encodeURIComponent(window.location.href));

    var app = setupQlikSenseDivs();
    setupPackery(this);
    Session.set('allowInteractions', true);
    Session.set('draggable', false);

    this.$('.Qdiv')
        .transition('scale in');
});

function setupQlikSenseDivs() {
    // var currentAppId = Session.get('currentAppId');
    // if (!currentAppId) {
    //     currentAppId = 'bd195c18-e1af-4e52-997f-774cc58eeb59' //set a default value for demo purposes
    //     console.log('We try to make a mashup for this app guid: ' + currentAppId);
    //     Session.set('currentAppId', currentAppId);
    // }
    console.log('the settings to connect to Sense are: ', qConfig)

    require(["js/qlik"], function(qlik) {
        qlik.setOnError(function(error) {
            console.error(error);
            // alert(error.message);
        });

        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        Tracker.autorun(function() {
            var options = {};
            Session.get('allowInteractions') ? null : options = { noInteraction: true };
            //get objects -- inserted here --
            app.getObject('CurrentSelections', 'CurrentSelections');
            app.getObject('QV01', 'Ggpaxa', options); //sales by country bar
            app.getObject('QV03', 'PYcyD', options); //customers per country bar
            app.getObject('QV04', 'VzxsQBD', options); //customers scatter
            app.getObject('QV05', 'VaQjnV', options); //listbox
            //app.getObject('QV06', 'LVqUFme', options); //map
            // app.getObject('QV02', 'eBwDCmJ', options); //sales over time linechart

            getAppLayout(app, this); //this equals the multipleDivs template
        })
    });
}

function getAppLayout(app, template) {
    app.getAppLayout(function(layout) {
        console.log('The Qlik Sense app layout is ', layout);
        Session.set('SenseLayout', layout);
    })
};

function setupPackery(layout) {
    //http://packery.metafizzy.co/#initialize-with-vanilla-javascript
    var $grid = layout.$('.grid').packery({
        itemSelector: '.grid-item',
        columnWidth: 100
    });

    // collection of Draggabillies
    var draggies = [];
    var isDrag = false;

    // make all grid-items draggable
    $grid.find('.grid-item').each(function(i, gridItem) {
        var draggie = new Draggabilly(gridItem);
        draggies.push(draggie);
        // bind drag events to Packery
        $grid.packery('bindDraggabillyEvents', draggie);
    });

    Tracker.autorun(function() {
        var draggableEnabled = Session.get('draggable');
        var method = draggableEnabled ? 'enable' : 'disable';
        draggies.forEach(function(draggie) {
            draggie[method]();
        });
    })
}
