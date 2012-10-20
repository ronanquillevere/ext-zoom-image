Ext.application({
    requires: ['Ext.container.Container','Ezi.view.Thumb','Ezi.view.Highlight', 'Ezi.view.Gallery', 'Ezi.controller.Gallery', 'Ezi.store.Images', 'Ezi.model.Image'],
    name: 'Ezi',

    views: ['Thumb', 'Gallery', 'Highlight'],
    stores: ['Images'],
    models: ['Image'],
    controllers: ['Gallery'],

    launch: function() {
       
    }
});

