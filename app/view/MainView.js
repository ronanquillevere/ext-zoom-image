 Ext.define('Ezi.view.MainView', {
    extend: 'Ext.container.Viewport',
    // requires : 'Ext.button.Split',
    //config: {
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
                {
                    xtype: 'button',
                    text: i18n.filter.button,
                    id: 'eziFilterButton',
                    //handler: this.onButtonClick,
                    tooltip: i18n.filter.tooltip,
                    tooltipType : 'title',
                    iconCls: 'ezi-filter-btn'
                    //,
                    // menu : {
                    //     items: [{
                    //         text: i18n.filter.all,
                    //         checked:true
                    //     }]
                    // }
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
    //}
});