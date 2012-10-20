Ext.define('Ezi.view.Thumb', {
    extend: 'Ext.container.Container',
    alias: 'widget.eziThumbnail',

    config : {
        cls: 'ezi-thumbnail',
        thumbBckUrl : null,
        deltaWidth : 5,
        deltaHeight : 5,
        orgWidth : null,
        orgHeight : null,
        hover : false,
        portrait: true,
        html: null,
        id: null,
        controller: null,
 
        listeners: {
            beforeRender: function(component, eOps) {          
                component.style = 'background-image: url(\'' + this.getThumbBckUrl() + '\')';

            },
            afterRender: function(component, eOpts) {      
                this.setOrgWidth(this.getWidth());
                this.setOrgHeight(this.getHeight());
                component.getEl().on('mouseover',this.handleMouseOver, this);
                component.getEl().on('mouseout',this.handleMouseOut, this);
                component.getEl().on('click',this.handleClick, this);
            }
        }      
    },

    handleMouseOver: function(e, t, eOpts){
        this.setHover(true);

        var t = this;
        var task = new Ext.util.DelayedTask(function(){        
            if (t.getHover()){
                t.bigger();
            }
        });
       
        task.delay(500);

    },    

    handleMouseOut: function(e, t, eOpts){
        this.setHover(false);
        this.smaller();
    },

    handleClick: function(e, t, eOpts){
        if (!!this.getController()){
             this.getController().fireEvent('highlightEvent', {id: t.id});
        }
    },

    initComponent: function() {
        this.callParent();  
    },

    bigger: function () {
        this.animate({
            to: {
                width: this.getOrgWidth() + this.getDeltaWidth(),
                height: this.getOrgHeight() + this.getDeltaHeight()
                // x: e.getPageX() + this.getDeltaWidth()/2,
                // y: e.getPageY() + this.getDeltaHeight()/2
            }
        });
    },

    smaller: function () {
        this.animate({
            to: {
                width: this.getOrgWidth(),
                height: this.getOrgHeight()
                // x: e.getPageX() - this.getDeltaWidth()/2,
                // y: e.getPageY() - this.getDeltaHeight()/2
            }
        });
    }
});