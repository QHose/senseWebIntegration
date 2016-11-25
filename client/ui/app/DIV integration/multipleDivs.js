var config = {
    host: Meteor.settings.public.host,
    prefix: '/' + Meteor.settings.public.virtualProxyClientUsage + '/',
    port: Meteor.settings.public.port,
    isSecure: Meteor.settings.public.isSecure,
};

Template.multipleDivs.helpers({
    checked() {
        var drag = Session.get('draggable');
        console.log('draggable is ', drag);
        return drag ? 'checked' : '';
    },
})

Template.multipleDivs.events({
    'change .checkbox' (event, template) {
        if (event.target.checked) {
            Session.set('draggable', true);

        } else {
            Session.set('draggable', false);
        }
    }
})

Template.multipleDivs.onRendered(function() {
    // var currentAppId = Session.get('currentAppId');
    // if (!currentAppId) {
    //     currentAppId = 'bd195c18-e1af-4e52-997f-774cc58eeb59' //set a default value for demo purposes
    //     console.log('We try to make a mashup for this app guid: ' + currentAppId);
    //     Session.set('currentAppId', currentAppId);
    // }

    console.log('the settings to connect to Sense are: ', config)
    require.config({
        baseUrl: "http://" + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        qlik.setOnError(function(error) {
            console.error(error);
            // alert(error.message);
        });

        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, config);
        //get objects -- inserted here --
        app.getObject('CurrentSelections','CurrentSelections');
        app.getObject('QV01', 'Ggpaxa');
        app.getObject('QV03', 'PYcyD');
        app.getObject('QV04', 'VzxsQBD');
        app.getObject('QV05', 'VaQjnV');
        app.getObject('QV06', 'LVqUFme');
        app.getObject('QV02', 'eBwDCmJ');

    });

    //http://packery.metafizzy.co/#initialize-with-vanilla-javascript
    var $grid = this.$('.grid').packery({
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

    this.$('.Qdiv')
        .transition('scale in');

});
