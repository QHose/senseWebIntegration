 Meteor.startup(function() {
 	console.log('inititialize require');
     require.config({
         baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
     });
 })
 
 Template.onTheFlybarChart.onRendered(function() {
     require(["js/qlik"], function(qlik) {
         var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
         app.visualization.create('barchart', ["Country", "=Sum(SalesAmount)"]).then(function(vis) {
             vis.show("chart")
         });
     })
 })


 