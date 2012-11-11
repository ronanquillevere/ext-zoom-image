Ext.define('Ezi.model.Tag', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tagName', type: 'string'}
    ],

    idProperty:'tagName'
 });