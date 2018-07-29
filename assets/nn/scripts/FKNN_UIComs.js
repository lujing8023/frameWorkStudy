cc.Class({
    extends: cc.Component,

    properties: {
        ndAutoPosXIphoneXs      : {
            default     : [],
            type        : cc.Node 
        },

        ndAutoScaleIphoneXs    : {
            default     : [],
            type        : cc.Node 
        },

        ndFixBtnScales      : {
            default     : [],
            type        : cc.Node 
        },
    },
    
    onLoad () {
        _.each(this.ndFixBtnScales ,(nd)=>{
            nd.addComponent('ComFixBtnScale');
        });
        _.each(this.ndAutoPosXIphoneXs ,(nd)=>{
            nd.addComponent('ComAutoPosXIphoneX');
        });
        _.each(this.ndAutoScaleIphoneXs ,(nd)=>{
            nd.addComponent('ComAutoScaleIphoneX');
        });
    },
});
