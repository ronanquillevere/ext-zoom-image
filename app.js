Ext.application({
    requires: ['Ext.container.Container','Ezi.view.Image','Ezi.view.Gallery', 'Ezi.controller.Gallery', 'Ezi.store.Images', 'Ezi.model.Image'],
    name: 'Ezi',

    views: ['Image', 'Gallery'],
    stores: ['Images'],
    models: ['Image'],
    controllers: ['Gallery'],

    launch: function() {
       
    }
});

