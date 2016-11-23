Template.multipleCharts.events({
    'click .qToggleInteraction': function() {
        console.log("You clicked qEnable button");
        var interaction = Session.get('interaction');
        if(interaction){
        	console.log('interaction is: '+interaction);
        	Session.set('interaction', !interaction);
        }else{
        	console.log('Initialize interaction on false');
        	Session.set('interaction', false);
        }

    }
});
