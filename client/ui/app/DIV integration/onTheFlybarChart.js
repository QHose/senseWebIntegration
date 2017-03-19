Template.onTheFlybarChart.onRendered(function() {
    checkAuthenticatedInQlik(encodeURIComponent(window.location.href));
    createQlikBarChart();
    this.$('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

})


function createQlikBarChart() {
    require(["js/qlik"], function(qlik) {
        var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
        app.visualization.create('barchart', ["Country", "=Sum(SalesAmount)"]).then(function(vis) {
            vis.show("chart")
        });
    })
}
