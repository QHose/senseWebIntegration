Template.google.onCreated(function() {
    checkAuthenticatedInQlik(encodeURIComponent(window.location.href));
})

Template.google.onRendered(function() {
    getTable(this); //get the data for the chart, and provide the current blaze layout template, so it can store the table json there.
})

function getTable(template) {
    require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        // Returns a table object of type QTable, which is initially empty but that eventually will contain data. 
        // The table object will be updated when selection state changes.
        table = app.createTable(["Country"], ["Sum(SalesAmount)"], { rows: 1000 });

        var listener = function() {
            console.log('We received the populated table from Qlik Sense: ', table);
            var googleFormattedData = _.map(table.qHyperCube.qDataPages["0"].qMatrix, function(currentItem) {
                //.qHyperCube.qDataPages["0"].qMatrix["0"]["0"].qText
                //.qHyperCube.qDataPages["0"].qMatrix["0"][1].qNum
                var itemArray = [];
                itemArray.push(currentItem["0"].qText);
                itemArray.push(currentItem[1].qNum);
                return itemArray;
            })
            console.log('googleFormattedData: ', googleFormattedData);
            createGoogleChart(googleFormattedData);
        };
        table.OnData.bind(listener); //bind the listener
    })
}

function createGoogleChart(data) {
    //https://developers.google.com/chart/interactive/docs/gallery/geochart
    google.charts.load('upcoming', { 'packages': ['geochart'] });
    google.charts.setOnLoadCallback(drawRegionsMap)
    var data2 = data;
   
    function drawRegionsMap() {
        var dataWithHeaders = [];
        dataWithHeaders.push(['Country', 'SalesAmount']);
        _.each(data2, function(item){
            dataWithHeaders.push(item);
        })
        console.log('dataWithHeaders', dataWithHeaders);
        var data = google.visualization.arrayToDataTable(dataWithHeaders);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }
}