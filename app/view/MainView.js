 Ext.define('Ezi.view.MainView', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    cls: 'ezi-viewport',
    id: 'eziViewport',
    items: [
    {
        region: 'north',
        xtype: 'toolbar',
        //ui: 'ezi-toolbar',
        id: 'eziToolbar',
        width: '100%',
        items: [

            {
                text: 'Home',
                id: 'eziHomeButton',
                cls:'ezi-toolbar-button ezi-toolbar-button-home',
                iconAlign: 'left',
                iconCls:'ezi-home-btn'
            },
            '->'    
        ],
        cls: 'ezi-toolbar'
    },{
        region: 'center',
        xtype: 'eziGallery', 
        id: 'eziGallery',
        layout: 'absolute',
        autoScroll: true
    }]
});