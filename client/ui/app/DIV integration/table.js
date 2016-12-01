Template.tableUsingWidgets.helpers({
    countries() {
        if (Template.instance().countryList) {
            var countries = Template.instance().countryList.get();
            console.log('helper: app.createList returned these countries', countries);
            countries.forEach
            return countries;
        }
    },
    headers() {
        console.log('helper: headers');
        if (Template.instance().table) {
            var headers = Template.instance().table.get().headers;
            // console.log('helper: table has these headers', headers);
            return Template.instance().table.get().headers;
        }
    },
    rows() {
        if (Template.instance().table) {
            var rows = Template.instance().table.get().rows;
            console.log('helper: table has these rows', rows);
            return rows;
        }
    }
})

Template.tableUsingWidgets.onRendered(function() {
    this.$('.ui.dropdown')
        .dropdown();

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        //create dropdown list for country
        //https://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/Methods/createList-method.htm
        app.createList({
            "qDef": {
                "qFieldDefs": [
                    "Country"
                ]
            },
            "qInitialDataFetch": [{
                qTop: 0,
                qLeft: 0,
                qHeight: 100,
                qWidth: 1
            }]
        }, function(reply) {
            var countries = reply.qListObject.qDataPages[0].qMatrix;
            console.log('List of Countries received via app.createList: ', countries);
            this.countryList = new ReactiveVar(countries);
            var str = "";
            $.each(reply.qListObject.qDataPages[0].qMatrix, function(key, value) {
                str += '<div class="item" >' + value[0].qText + '</div>';
            });
            this.$('#list').html(str);
        });
        //https://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/Methods/createList-method.htm
    })

})

Template.tableUsingWidgets.onCreated(function() {
    this.table = new ReactiveVar('test');
    var reactiveTable = this.table;
    console.log('getCube function', this.table.get());

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        // Returns a table object of type QTable, which is initially empty but that eventually will contain data. The table object will be updated when selection state changes.
        // var table = app.createTable(["Country", "City"], ["Sum(SalesAmount)"], { rows: 5 });
        var table = app.createTable(["Country", "City"], ["Sum(SalesAmount)"], { rows: 30 });

        var listener = function() {
            console.log('table is: ', table);
            reactiveTable.set(table);
            table.OnData.unbind(listener); //unregister the listener when no longer notification is needed.
        };
        table.OnData.bind(listener); //bind the listener
    })
})