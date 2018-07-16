//http://www.chartjs.org/docs/#getting-started-creating-a-chart

Template.chartJS.onRendered(function() {
    getTable();
    this.$('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
})

function getTable() {
    require.config({
        baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
    });

    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

        // Returns a table object of type QTable, which is initially empty but that eventually will contain data. 
        // The table object will be updated when selection state changes.
        table = app.createTable(["Country"], ["Sum(SalesAmount)"], { rows: 3000 });

        var listener = function() {
            console.log('table is: ', table);
            drawChartJs(table);
        };
        table.OnData.bind(listener); //bind the listener
    })
}

function drawChartJs(table) {
    var ctx = $("#myChart");
    var rows = table.rows;
    var labels = _.map(rows, function(row) {
        return row.cells["0"].qText
    })
    var data = _.map(rows, function(row) {
        return row.measures["0"].qNum;
    })

    console.log('labels array is ', labels);
    console.log('data array', data);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: 'Sales Amount',
                data: data, //[12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}
