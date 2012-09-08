Ext.application({
    requires: ['Ext.container.Container'],
    name: 'Ezi',
    launch: function() {
        Ext.create('Ext.container.Container', {
            //layout: 'fit',
            renderTo: Ext.getBody(),
            cls: 'gallery',
            width: 200,
            height : 200,
            // cls: 'ronantest',
            items: [
                {
                    title: 'Hello Ext',
                    html : 'Hello! Welcome to Ext JS.',

                }
            ]
        });
    }
});

