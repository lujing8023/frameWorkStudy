cc.Class({
    extends: cc.Component,

    properties: {},
    
    onLoad : function(){
        this.time = TimeHelper.getCTimeHM();
        this._setTime( this.time );
        this.sche = this.schedule( this.updateTime , 5 , this );
    },

    updateTime : function(){
        // this.lbCenter.node.runAction( cc.blink( 0.1 , 1 ) );

        let now = TimeHelper.getCTimeHM();
        if( now === this.time ) return ;

        this.time = now ;
        this._setTime( this.time );
    },

    _setTime : function( info ){
        this.node.getComponent(cc.Label).string = info ;
    },

});
