Ext.define('Ezi.model.Image', {
    extend: 'Ext.data.Model',
    //requires:['Ezi.model.Tag'],
    fields: [
        {name: 'id', type: 'string'},
        {name: 'thumbBckUrl', type: 'string'},
        {name: 'highlightBckUrl',  type: 'string'},
        {name: 'portrait',       type: 'boolean'},
        {name: 'title',       type: 'string'},
        {name: 'miniDesc',       type: 'string'},
        {name: 'tags', type: 'string'} //ugly but cannot make nested models work

    ],

    //hasMany: [{model: 'Ezi.model.Tag', name: 'tags', associationKey:'tags', foreignKey:'tagName',}],

    idProperty:'id'
 });