 Ext.define('Ezi.store.Images', {
	extend: 'Ext.data.Store',
  model: 'Ezi.model.Image',

  // proxy: {
  //     type: 'ajax',
  //     url:  'app/data/pics.json',
  //     reader: {type:'json', root:'data'}
  // },
  // autoLoad: false

 
  data : [
          {
            id:'bachdangtran', 
            thumbBckUrl: './resources/gfx/big/bach.jpg', 
            highlightBckUrl: './resources/gfx/big/bach.jpg', 
            portrait: true,
            tags : 'KFamily'
          }
          ,
          {
            id:'lientran',
            thumbBckUrl: './resources/gfx/big/lien.jpg',
            highlightBckUrl: './resources/gfx/big/lien.jpg',
            portrait: true,
            tags : 'KFamily'
          },
          {
            id:'kimtran',
            thumbBckUrl: './resources/gfx/big/kim.jpg', 
            highlightBckUrl: './resources/gfx/big/kim.jpg', 
            portrait: true,
            tags : 'Bride   KFamily'
          },
          {
            id:'minhtran', 
            thumbBckUrl: './resources/gfx/big/minh.jpg', 
            highlightBckUrl: './resources/gfx/big/minh.jpg', 
            portrait: true,
            tags : 'KFamily KWitness'
          },
          {
            id:'ronan', 
            thumbBckUrl: './resources/gfx/big/ronan.jpg', 
            highlightBckUrl: './resources/gfx/big/ronan.jpg', 
            portrait: true,
            tags : 'Groom RFamily'
          },
          {
            id:'rozenn',
            thumbBckUrl: './resources/gfx/big/rozenn.jpg', 
            highlightBckUrl: './resources/gfx/big/rozenn.jpg', 
            portrait: true,
            tags : 'RFamily'
          },
          {
            id:'katell', 
            thumbBckUrl: './resources/gfx/big/katell.jpg', 
            highlightBckUrl: './resources/gfx/big/katell.jpg', 
            portrait: true,
            tags : 'RFamily'
          },
          {
            id:'bertrand', 
            thumbBckUrl: './resources/gfx/big/bertrand.jpg', 
            highlightBckUrl: './resources/gfx/big/bertrand.jpg', 
            portrait: true,
            tags : 'RFamily'
          },
          {
            id:'ben', 
            thumbBckUrl: './resources/gfx/big/ben.jpg', 
            highlightBckUrl: './resources/gfx/big/ben.jpg', 
            portrait: true,
            tags : 'RWitness'
          },
          {
            id:'jiph', 
            thumbBckUrl: './resources/gfx/big/jiph.jpg', 
            highlightBckUrl: './resources/gfx/big/jiph.jpg', 
            portrait: true,
            tags : 'RWitness'
          },
          {
            id:'vinc', 
            thumbBckUrl: './resources/gfx/big/vinc.jpg', 
            highlightBckUrl: './resources/gfx/big/vinc.jpg', 
            portrait: true,
            tags : 'RWitness'
          },
          {
            id:'oliv', 
            thumbBckUrl: './resources/gfx/big/oliv.jpg', 
            highlightBckUrl: './resources/gfx/big/oliv.jpg', 
            portrait: true,
            tags : 'RWitness'
          }
       ]
});