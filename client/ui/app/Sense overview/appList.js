Template.appList.helpers({
    appList: function() {   
		return Session.get('appList');  
    },
    appURL: function(appGUID) {
        return (qConfig.isSecure ? "https://" : "http://") + qConfig.host + (qConfig.port ? ":" + qConfig.port : "") + qConfig.prefix + "app/" + appGUID;
    },
    settings: function() {
        return {
            // collection: appList,
            rowsPerPage: 90,
            showFilter: true,
            showColumnToggles: true,
            // fields: ['customer', 'telephone', 'email', 'status', 'itemCount', 'deliveryDate', 'remarks'],
            fields: [
                { key: 'qDocName', label: 'App name' },
                { key: 'qMeta.stream.name	', label: 'Stream' },
                { key: 'qMeta.description', label: 'Description' }, {
                    key: 'deleteApp',
                    label: 'delete app',
                    fn: function() {
                        return 'Delete'
                    }
                }, {
                    key: 'openApp',
                    label: 'Open app',
                    fn: function() {
                        return 'Open'
                    }
                },
            ]
        }
    }
});


Template.appList.events({
    "click .reactive-table tbody tr": function() {
        //Make the event selector be tr, and you'll have your row object in this:
        console.log(this);

        // checks if the actual clicked element has the class `delete`
        if (event.target.className == "deleteApp") {
            console.log('Remove the app: ' + this.qDocName);
            
            
        } else if (event.target.className == "openApp") {
            sAlert.success('open an Iframe with the selected app: ' + this.qDocName);
            Session.set('currentAppId', this.qDocId);
            Router.go('/app');
        }

    }

});
