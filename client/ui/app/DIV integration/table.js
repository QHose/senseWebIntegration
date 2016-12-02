var table = {};

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
        if (Template.instance().table) {
            var headers = Template.instance().table.get().headers;
            console.log('helper: table has these headers', headers);
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

Template.tableUsingWidgets.events({
    'change .country.dropdown': function(event, template) {
        var selected = template.$('.countryList').val(); //returns [1, 5]
        var array = selected.split(',').map(Number); //make an array of selections
        console.log(array);

        //make the selection in Qlik Sense
        //https://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/Methods/select-method.htm
        require(["js/qlik"], function(qlik) {
            var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
            app.field('Country').clear();
            app.field('Country').select(array, false, true); //works fine, turn toggle to false for multi select

        })

    }
})

Template.tableUsingWidgets.onRendered(function() {
    getCurrentSelections();
    getCountryList();

    this.$('.ui.dropdown')
        .dropdown();
})

function getCountryList() {
    require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

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
                str += '<div class="item" data-value="' + value[0].qElemNumber + '" >' + value[0].qText + '</div>';
            });
            this.$('#list').html(str);
        });
        //https://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/Methods/createList-method.htm
    })
}

function getCurrentSelections() { //source: http://snipplr.com/view/100939/custom-current-selections/
    require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
        console.log('App layout object: ', app);
        app.getList("CurrentSelections", function(reply) {

            selectionslist = "";
            var mySelectedFields = reply.qSelectionObject.qSelections;
            console.log(mySelectedFields);

            //loop through selected fields
            var mySelectedFields_arrayLength = mySelectedFields.length;
            for (var i = 0; i < mySelectedFields_arrayLength; i++) {
                var text = mySelectedFields[i].qField + " ";
                console.log(mySelectedFields[i].qField);

                if (mySelectedFields[i].qLocked == true) {
                    var labeltype = 'label label-warning'
                } else {
                    var labeltype = 'label-success';
                }

                console.log(mySelectedFields[i].qLocked);

                //loop through selected field values
                var currentFieldValues = mySelectedFields[i].qSelectedFieldSelectionInfo
                var currentFieldValues_arrayLength = currentFieldValues.length;

                for (var y = 0; y < currentFieldValues_arrayLength; y++) {
                    text += "<span class='label " + labeltype + "'>" + currentFieldValues[y].qName + "</span> ";
                }

                if (i == 0) {
                    selectionslist = text;
                } else {
                    selectionslist += text;
                }
            }

            console.log(selectionslist);
            $("#myselections").html(selectionslist);
        });
    })
}

Template.tableUsingWidgets.onCreated(function() {
    this.table = new ReactiveVar('test');
    var reactiveTable = this.table;
    console.log('getCube function', this.table.get());

    require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        // Returns a table object of type QTable, which is initially empty but that eventually will contain data. The table object will be updated when selection state changes.
        table = app.createTable(["Country", "City"], ["Sum(SalesAmount)"], { rows: 3000 });

        var listener = function() {
            console.log('table is: ', table);
            reactiveTable.set(table);
        };
        table.OnData.bind(listener); //bind the listener
    })
})

Template.tableUsingWidgets.onDestroyed(function() {
    if (table.OnData) {
        table.OnData.unbind(listener); //unregister the listener when no longer notification is needed.
    }
})
