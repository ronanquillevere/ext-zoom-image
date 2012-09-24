 Ext.define('Ezi.store.Images', {
	extend: 'Ext.data.Store',
   	model: 'Ezi.model.Image',
	data : [
        {thumbBckUrl: './resources/gfx/bach.jpg', highlightBckUrl: './resources/gfx/bach.jpg', portrait: true, title: 'Bach Dang Tran'},
        {thumbBckUrl: './resources/gfx/lien.jpg', highlightBckUrl: './resources/gfx/lien.jpg', portrait: true, title: 'Lien Tran'},
        {thumbBckUrl: './resources/gfx/kim.jpg', highlightBckUrl: './resources/gfx/kim.jpg', portrait: true, title: 'Kim Tran'}
     ]
 });