Template.onTheFlybarChart.onRendered(function() {
    createQlikBarChart();
    // createflexiblehCart();
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

// function createflexibleChart() {
//     require(["js/qlik"], function(qlik) {
//         var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
//         app.visualization.create('barchart').then(function(vis) {
//             vis.show("chartFlexible")
//         });
//     })
// }
