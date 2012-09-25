Ext.define('Ezi.controller.Gallery', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'gallery',
            selector: '#eziGallery'
        },
        {
            ref: 'viewport',
            selector: '#eziViewport'
        },
        {
            ref: 'header',
            selector: 'x-panel-header'
        }
    ],

    stores:['Images'],

    config: {
        //all values in pixels
        portraitWidth: 210,
        portraitHeight: 245, 
        landscapeWidth: 210,
        landscapeHeight: 245, 
        margin: 5,
        images:[]
    },

    
    init: function() {
        this.control({
            'viewport': {
                resize: this.handleResize
            }
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            cls: 'ezi-viewport',
            id: 'eziViewport',
            items: [
            {
                region: 'north',
                html: '<h1 class="ezi-toolbar">Toolbar</h1>',
                border: false,
                margins: '0 0 0 0',
                cls: 'ezi-gallery-north'
            },{
                region: 'center',
                xtype: 'eziGallery', 
                id: 'eziGallery',
                layout: 'absolute',
                autoScroll: true
            }]
        });

        this.buildGallery(); 
    },


    buildGallery: function(){
        var vw = this.getViewport().getWidth(),
        vh = this.getViewport().getHeight();
        s = this.getStore("Images");

        for (var i = 0; i < s.getCount(); i++) {
            this.getImages().push( this.createImage(
            s.getAt(i).get('thumbBckUrl'),
            s.getAt(i).get('highlightBckUrl'),
            this.getPortraitWidth(),
            this.getPortraitHeight(),
            s.getAt(i).get('portrait'),
            s.getAt(i).get('title'),
            s.getAt(i).get('miniDesc')
            ));
        };

        this.layoutImages(this.getImages(), this.getPortraitWidth(), this.getLandscapeWidth(), this.getPortraitHeight(), this.getLandscapeHeight(), this.getMargin());
        this.getGallery().add(this.getImages());
    },



    computeX: function (margin, linePrevLand, linePreviousPortrait, landscapeWidth, portraitWidth){
        return linePreviousPortrait * portraitWidth + linePrevLand * landscapeWidth + margin * 2 * (linePrevLand+linePreviousPortrait);
    },

    computeY: function (line, margin, maxHeight){
        return (maxHeight + margin*2) * line; 
    },

    handleResize: function(){
        this.layoutImages(this.getImages(), this.getPortraitWidth(), this.getLandscapeWidth(), this.getPortraitHeight(), this.getLandscapeHeight(), this.getMargin());
        var images = this.getImages();

        for (i = 0; i < images.length; i++) {
            img = this.images[i];
             img.animate({
                to: {
                    x: this.getMargin() + img.x, //add border width if there is a border to the gallery
                    y: this.getMargin() + 30 + img.y //add border width if there is a border to the gallery
                }
            });
         }


    },

    layoutImages: function (images, portraitWidth, landscapeWidth, portraitHeight, landscapeHeight, margin){
         var nbLandscape = 0,
            nbPortrait = 0,
            nb = 0,
            line = 0,
            i,
            img,
            tmpx,
            tmpwidth,
            minWidth;
        
        for (i = 0; i < images.length; i++) {
            img = this.images[i];
            

            tmpwidth = (img.getPortrait() ? portraitWidth : landscapeWidth);
            minWidth = (tmpwidth + margin*2);

            tmpx = this.computeX(margin, nbLandscape, nbPortrait, landscapeWidth, portraitWidth);

           if ( !(nb === 0 && this.getViewport().getWidth() < minWidth) && tmpx > (this.getViewport().getWidth() - minWidth)){
                line++;
                nbLandscape = 0;
                nbPortrait = 0;
                nb = 0;
                tmpx = this.computeX(margin, nbLandscape, nbPortrait, landscapeWidth, portraitWidth);
            }
                
            img.x = tmpx;
            img.y = this.computeY(line, margin, ((portraitHeight > landscapeHeight) ? portraitHeight : landscapeHeight ));
            
            if (img.getPortrait())
                nbPortrait++;
            else
                nbLandscape++; 
            nb++;   
        }
    },


    createImage: function (thumbUrl, bigUrl, width, height, portrait, title, minidesc){
        return  Ext.create('Ezi.view.Image', {
                width: width,
                height: height,          
                thumbBckUrl: thumbUrl,
                bigBckUrl: bigUrl,
                portrait: portrait,
                html: '<div class="ezi-thumbnail-desc"><div class="ezi-thumbnail-title">'+ title +'</div><div class="ezi-thumbnail-minidesc">'+ minidesc +'</div></div>'
        });
    }

});
