
Template.slideGenerator.onRendered(function() {
    console.log('slideGenerator  onRendered');
    $('#jmpress').jmpress();
})


function getTable(template) {
    template.table = new ReactiveVar('test');
    var reactiveTable = template.table;

    require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        // Returns a table object of type QTable, which is initially empty but that eventually will contain data. 
        // The table object will be updated when selection state changes.
        table = app.createTable(["Country", "City"], ["Sum(SalesAmount)"], { rows: 3000 });

        var listener = function() {
            console.log('app.createTable(["Country", "City"], ["Sum(SalesAmount)"], result: ', table);
            reactiveTable.set(table);
        };
        table.OnData.bind(listener); //bind the listener
    })
}

