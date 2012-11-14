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
        },
        {
            ref: 'filterBtn',
            selector: '#eziFilterButton'
        }
    ],

    stores:['Images'],

    config: {
        //all values in pixels
        portraitWidth: 245,
        portraitHeight: 245, 
        landscapeWidth: 245,
        landscapeHeight: 245, 
        margin: 5,
        images: new Ext.util.HashMap(),
        highlightMatch: /highlight:(\w+)/g,
        filterMatch: /filter:(\w+)(,(\w+))*/g,
        highlight: null,
        tokenDelimiter: ':',
        menuFilterId: 'menuFilterId',
        filters: [],
        activeFilters: [],

        listeners: {
            highlightEvent: function(options) {
                var newToken, oldToken;

                newToken = "highlight"+ this.getTokenDelimiter() + options.id;
        
                oldToken = Ext.History.getToken();
       
                if (oldToken === null || oldToken.search(newToken) === -1) {
                    Ext.History.add(newToken);
                }               
            },

            filterEvent: function(filter) {
                var oldToken;
                
                oldToken = Ext.History.getToken();
                
                if (filter.checked === true) {
                    if (oldToken === null || oldToken === "") {
                        Ext.History.add("filter"+ this.getTokenDelimiter() + filter.tag); 
                    } else if (oldToken.search(filter.tag) === -1) {
                        Ext.History.add(oldToken + "," + filter.tag); 
                    }
                } else {
                    if (oldToken !== null && oldToken.search(filter.tag) !== -1) {
                        oldToken = oldToken.replace(","+filter.tag, "");
                        oldToken = oldToken.replace(filter.tag + ",", "");
                        oldToken = oldToken.replace(filter.tag, "");
                        if (oldToken === ("filter"+ this.getTokenDelimiter()))
                            oldToken = "";
                        Ext.History.add(oldToken);
                    }
                }
            },

            urlChanged: function(options){              
                if (!options){
                    this.setActiveFilters([]);
                    if (this.getHighlight())
                        this.cleanHighlight();   
                } else if (options.type === 'highlight'){
                    this.renderHighlight(options);
                } else if (options.type === 'filter'){
                    this.setActiveFilters(options.id.trim().replace(" ","").split(","));    
                    if (this.getHighlight())
                        this.cleanHighlight();  
                }

                this.filterGallery();  
            }
        }      
    },

    init: function() {
        var url = window.location.href,
            hashIdx=0,
            match,
            token;

        this.control({
            'viewport': {
                resize: this.handleResize
            }
        });

        Ext.create('Ezi.view.MainView');


        this.buildGallery(); 
        this.initToolbarButtons();
        this.initHistory();

    },

    initToolbarButtons: function(){

        var btn, f, i, menu, id;

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


        menu = Ext.create('Ext.menu.Menu', {id:this.getMenuFilterId()});

        for (i = 0; i < this.getFilters().length; i++) {          
            f = this.getFilters()[i];

            menu.add(
                {
                    text: i18n.filter[f],
                    checked:false,
                    checkHandler: this.onItemCheck,
                    tag: f,
                    controller: this,
                    id : f
                }
            );
        }

        this.getFilterBtn().menu = menu;

        this.getToolbar().add(btn);
    },

    onItemCheck: function(item, checked){
        item.controller.fireEvent('filterEvent', {tag: item.tag, checked: checked});
    },


    initHistory: function(){
        var tok, match, menu,i;
        Ext.History.init();
        Ext.History.on('change', function(token) {
            this.fireUrlChange(token);
        }, this);

        //need to open gallery with filter == back from highlight -> filtered gallery

        tok = Ext.History.getToken();

        if (!!tok){           
            this.fireUrlChange(tok);

            match = this.getFilterMatch().exec(tok);
            if (match){
                //click on the corresponding menu button
                menu = Ext.menu.Manager.get(this.getMenuFilterId());
                for (i = 0; i < match.length; i++) {
                    var cb = menu.items.getByKey(match[i]);
                    if (cb)
                        cb.checked = true;
                } 
                
            }
            
        }

        // if (!!tok){
        //     match = this.getFilterMatch().exec(tok);
        //     if (match){
        //          Ext.History.add("");
        //     } else {          
        //         this.fireUrlChange(tok);
        //     }
        // }
    },

    fireUrlChange: function(token){
        var parts, length, el;

        if (token) {
            parts = token.split(this.getTokenDelimiter());
            length = parts.length;
            
            this.fireEvent('urlChanged',{id: parts[1], type: parts[0]});
        } else {
            this.fireEvent('urlChanged', null);            
        }
    },

    cleanHighlight: function(){
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
        vh = this.getViewport().getHeight(),
        s = this.getStore("Images"),
        i,tags,tagTab;

        
        var createThumbs = function(s){    
            for (i = 0; i < s.getCount(); i++) {
                //set filters
                tags = s.getAt(i).get('tags');
                tags = tags.trim().replace(/[ ]+/g," ");
                tagTab = tags.split(" ");
                this.fillFilters(tagTab);


                this.getImages().add(
                    s.getAt(i).get('id'), 
                    this.createThumb(
                        s.getAt(i).get('thumbBckUrl'),
                        this.getPortraitWidth(),
                        this.getPortraitHeight(),
                        s.getAt(i).get('portrait'),
                        i18n.people[s.getAt(i).get('id')].title,
                        i18n.people[s.getAt(i).get('id')].miniDesc,
                        s.getAt(i).get('id'),
                        this,
                        s.getAt(i).get('tags')
                    )
                );

                tags = "";
                tagTab = [];
            }

            this.layoutImages(this.getImages(), this.getPortraitWidth(), this.getLandscapeWidth(), this.getPortraitHeight(), this.getLandscapeHeight(), this.getMargin());
            this.getGallery().add(this.getImages().getValues()); 
        };

        createThumbs.call(this, s);
        
        //debugger;
        // s.load({
        //         scope: this,
        //         callback:
        //             function(records, operation, success) {
        //                 //debugger;
        //                 if (success){
        //                       console.log('loaded records'); 
        //                       innerBuildGallery(s);        
        //                 } else {
        //                     console.log('fail to load records');
        //                 }
        //             }
        //     }
        //);
    },

    fillFilters: function (tab){
        var i;
        for (i = 0; i < tab.length; i++) {          
            if (this.getFilters().indexOf(tab[i]) === -1){
                this.getFilters().push(tab[i]);
            }
        }
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

    filterGallery: function(){   
        var ctlr = this,i;     
        this.getImages().each (
            function(key, value, length){
                var visible = false;
                if (ctlr.getActiveFilters().length>0){
                    for (i = 0; i < ctlr.getActiveFilters().length && !visible; i++) {
                        if (value.getTags().indexOf(ctlr.getActiveFilters()[i]) !== -1){
                            visible = true;
                        }
                    }
                } else {
                    visible = true;
                }

                if (!visible)
                    value.hide();
                else
                    value.show();
            }
        );
    },


    createThumb: function (thumbUrl, width, height, portrait, title, minidesc,id, controller, tags){
        return  Ext.create('Ezi.view.Thumb', {
                width: width,
                height: height,          
                thumbBckUrl: thumbUrl,
                portrait: portrait,
                html: '<div class="ezi-thumbnail-desc"><div class="ezi-thumbnail-title">'+ title +'</div><div class="ezi-thumbnail-minidesc">'+ minidesc +'</div></div>',
                id:id,
                controller:controller,
                tags: tags
        });
    }

});
