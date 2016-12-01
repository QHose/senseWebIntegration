Template.tableUsingWidgets.helpers({
    table() {
        Session.get('table');
    },
    totalSales() {
        // return Session.get('table').totals[0].qNum.val();
    },
    headers() {
        var headers = Template.instance().table.get().headers;
        if (headers) {
            console.log('table has these headers', headers);
            return headers;
        }
    },
    rows() {
        var rows = Template.instance().table.get().rows;
        if (rows) {
            console.log('table has these rows', rows);
            return rows;
        }
    }
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
