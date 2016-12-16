Template.onTheFlybarChart.onRendered(function() {
    checkAuthenticatedInQlik(encodeURIComponent(window.location.href));
    createQlikBarChart();
})


function createQlikBarChart() {
    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
        app.visualization.create('barchart', ["Country", "=Sum(SalesAmount)"]).then(function(vis) {
            vis.show("chart")
        });
    })
}
