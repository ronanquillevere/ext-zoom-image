Ext.define('Ezi.view.Image', {
    extend: 'Ext.container.Container',
    alias: 'widget.eziThumbnail',

    config : {
        cls: 'ezi-thumbnail',
        thumbBckUrl : null,
        highlightBckUrl : null,
        deltaWidth : 10,
        deltaHeight : 10,
        orgWidth : null,
        orgHeight : null,
        highlighted : false,
        portrait: true,
        html: null,
 
        listeners: {
            beforeRender: function(component, eOps) {          
                component.style = 'background-image: url(\'' + this.getThumbBckUrl() + '\')';

            },
            afterRender: function(component, eOpts) {      
                this.setOrgWidth(this.getWidth());
                this.setOrgHeight(this.getHeight());
                component.getEl().on('mouseover',this.handleMouseOver, this);
                component.getEl().on('mouseout',this.handleMouseOut, this);
            }
        }      
    },

    handleMouseOver: function(e, t, eOpts){
        this.setHighlighted(true);

        var t = this;
        var task = new Ext.util.DelayedTask(function(){        
            if (t.getHighlighted()){
                t.bigger();
            }
        });
       
        task.delay(500);

    },    

    handleMouseOut: function(e, t, eOpts){
        this.setHighlighted(false);
        this.smaller();
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