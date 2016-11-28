 Meteor.startup(function() {
     require.config({
         baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
     });
 })

 Template.customTable.helpers({
     table() {
         // Session.get('table');
     },
     totalSales() {
         // return Session.get('table').totals[0].qNum.val();
     }
 })


 Template.customTable.onCreated(function() {
     // getCube();
 })

 Template.customTable.onRendered(function() {
     console.log('customTable onRendered');
     require(["js/qlik"], function(qlik) {
         var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);

         app.visualization.create('barchart', ["Country", "=Sum(SalesAmount)"]).then(function(vis) {
                 vis.show("chart")
             });             
     })
 })


 function getCube() {
     //create cubes and lists -- inserted here -- 
     require.config({
         baseUrl: "http://" + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "resources"
     });


     require(["js/qlik"], function(qlik) {
         var app = qlik.openApp(Meteor.settings.public.multipleDivAppGuid, qConfig);
         var table = app.createTable(["Country", "City"], ["Sum(SalesAmount)"], { rows: 100 });
         console.log(table.totals);
         // Session.set('table', table);

         app.visualization.create('table', ['Month', '=1'], {
             qHyperCubeDef: {
                 qInitialDataFetch: [{
                     qTop: 0,
                     qLeft: 0,
                     qWidth: 2,
                     qHeight: 1000
                 }]
             }
         }).then(model => {
             console.log(model)

         })
     })
 }
