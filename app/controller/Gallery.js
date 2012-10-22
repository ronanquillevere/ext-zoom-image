Ext.define('Ezi.controller.Gallery', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.util.History','Ext.util.HashMap', 'Ext.toolbar.Toolbar','Ext.form.Label'],

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
        },
        {
            ref: 'toolbar',
            selector: '#eziToolbar'
        },
        {
            ref: 'closeBtn',
            selector: '#eziCloseButton'
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
        images: new Ext.util.HashMap(),
        highlightMatch: /highlight:(\w+)/g,
        highlight: null,
        tokenDelimiter: ':',

        listeners: {
            highlightEvent: function(options) {
                var newToken, oldToken;

                newToken = "highlight"+ this.getTokenDelimiter() + options.id;
        
                oldToken = Ext.History.getToken();
       
                if (oldToken === null || oldToken.search(newToken) === -1) {
                    Ext.History.add(newToken);
                }               
            },

            urlChanged: function(options){
                this.renderHighlight(options);
            }
        }      
    },

    init: function() {
        var url = window.location.href,
            hashIdx=0,
            match,
            token,
            btn;

        this.control({
            'viewport': {
                resize: this.handleResize
            },
            'closeHighlight': {
                click:  function(){
                    alert('click');
                },
                mouseover: function(){
                    alert('mouseover');
                }
            }
        });

        Ext.create('Ezi.view.MainView');

        this.buildGallery(); 
        this.initCloseButton();
        this.initHistory();

    },

    initCloseButton: function(){
        btn = Ext.create('Ext.button.Button',{
                text: 'close',
                id: 'eziCloseButton',
                cls:'ezi-toolbar-button ezi-toolbar-button-close',
                iconAlign: 'right',
                iconCls:'ezi-close-btn',
                handler: function(btn){
                        Ext.History.back();
                }
            });
        btn.hide();
        this.getToolbar().add(btn);
    },

    initHistory: function(){
        Ext.History.init();
        Ext.History.on('change', function(token) {
            var parts, length, el;

            if (token) {
                parts = token.split(this.getTokenDelimiter());
                length = parts.length;
                
                this.fireEvent('urlChanged',{id: parts[1]});
            } else {
                this.clean();               
            }
        }, this);

        token = Ext.History.getToken();

        if (token){
            match = this.getHighlightMatch().exec(token);
            if (match && match.length > 0){     
                this.renderHighlight({id:match[1]});
            }
        }
    },

    clean: function(){
        this.getGallery().remove(this.getHighlight());
        this.getCloseBtn().hide();
    },

    renderHighlight: function(options){
        var img = this.getStore("Images").getById(options.id),
            config = {portrait: img.get('portrait')},
            idp = 'ezi-portrait',
            idl = 'ezi-landscape',
            el,
            highligh;

        if (config.portrait){
            config.html = '<div class="ezi-portrait" id="big'+ options.id +'"></div>';
        } else {
            config.html = '<div class="ezi-landscape" id="big'+ options.id +'"></div>';
        }

        this.setHighlight(Ext.create('Ezi.view.Highlight',config));
        this.getGallery().add([this.getHighlight()]);
        el = document.getElementById('big'+ options.id);
        el.style.backgroundImage = 'url(\'' + img.get('highlightBckUrl') + '\')';   

        this.getCloseBtn().show();
    },

    buildGallery: function(){
        var vw = this.getViewport().getWidth(),
        vh = this.getViewport().getHeight();
        s = this.getStore("Images");

        for (var i = 0; i < s.getCount(); i++) {
            this.getImages().add( s.getAt(i).get('id'), this.createThumb(
            s.getAt(i).get('thumbBckUrl'),
            this.getPortraitWidth(),
            this.getPortraitHeight(),
            s.getAt(i).get('portrait'),
            s.getAt(i).get('title'),
            s.getAt(i).get('miniDesc'),
            s.getAt(i).get('id'),
            this
            ));
        };

        this.layoutImages(this.getImages(), this.getPortraitWidth(), this.getLandscapeWidth(), this.getPortraitHeight(), this.getLandscapeHeight(), this.getMargin());
        this.getGallery().add(this.getImages().getValues());
    },



    computeX: function (margin, linePrevLand, linePreviousPortrait, landscapeWidth, portraitWidth){
        return linePreviousPortrait * portraitWidth + linePrevLand * landscapeWidth + margin * 2 * (linePrevLand+linePreviousPortrait);
    },

    computeY: function (line, margin, maxHeight){
        return (maxHeight + margin*2) * line; 
    },

    handleResize: function(){
        this.layoutImages(this.getImages(), this.getPortraitWidth(), this.getLandscapeWidth(), this.getPortraitHeight(), this.getLandscapeHeight(), this.getMargin());

        this.getImages().each (function(key, value, length){
             value.animate({
                to: {
                    x: this.getMargin() + value.x, //add border width if there is a border to the gallery
                    y: this.getMargin() + 30 + value.y //add border width if there is a border to the gallery
                }
            });
        }, this);
    },

    layoutImages: function (images, portraitWidth, landscapeWidth, portraitHeight, landscapeHeight, margin){
        var nbLandscape = 0,
            nbPortrait = 0,
            nb = 0,
            line = 0,
            tmpx,
            tmpwidth,
            minWidth;
        
        var ctlr = this;
        images.each (function(key, value, length){
            tmpwidth = (value.getPortrait() ? portraitWidth : landscapeWidth);
            minWidth = (tmpwidth + margin*2);

            tmpx = ctlr.computeX(margin, nbLandscape, nbPortrait, landscapeWidth, portraitWidth);

            if ( !(nb === 0 && ctlr.getViewport().getWidth() < minWidth) && tmpx > (ctlr.getViewport().getWidth() - minWidth)){
                line++;
                nbLandscape = 0;
                nbPortrait = 0;
                nb = 0;
                tmpx = ctlr.computeX(margin, nbLandscape, nbPortrait, landscapeWidth, portraitWidth);
            }
                
            value.x = tmpx;
            value.y = ctlr.computeY(line, margin, ((portraitHeight > landscapeHeight) ? portraitHeight : landscapeHeight ));
            
            if (value.getPortrait())
                nbPortrait++;
            else
                nbLandscape++; 
            nb++;
        });
    },


    createThumb: function (thumbUrl, width, height, portrait, title, minidesc,id, controller){
        return  Ext.create('Ezi.view.Thumb', {
                width: width,
                height: height,          
                thumbBckUrl: thumbUrl,
                portrait: portrait,
                html: '<div class="ezi-thumbnail-desc"><div class="ezi-thumbnail-title">'+ title +'</div><div class="ezi-thumbnail-minidesc">'+ minidesc +'</div></div>',
                id:id,
                controller:controller
        });
    }

});
