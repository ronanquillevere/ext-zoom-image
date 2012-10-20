Ext.define('Ezi.model.Image', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'id', type: 'string'},
         {name: 'thumbBckUrl', type: 'string'},
         {name: 'highlightBckUrl',  type: 'string'},
         {name: 'portrait',       type: 'boolean'},
         {name: 'title',       type: 'string'},
         {name: 'miniDesc',       type: 'string'}
     ],
     idProperty:'id'
 });