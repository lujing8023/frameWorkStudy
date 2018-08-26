cc.Class({
    extends: cc.Component,

    properties: {
        bg    : cc.Sprite ,
        title : cc.Label ,
    },

    onLoad: function () {
        
    },

    //mode 0 : push msglist   1：立即显示 
    init : function( info = "" , msgMode = 1 ){
        this.title.string = info    ;
        this.msgMode      = msgMode ;
        this.node.y       = cc.director.getScene().getChildByName('Canvas').height * 0.38 * -0.35 ;

        this._resizeBg();
        this._show();
    },
    
    
    _resizeBg : function(){
        // this.bg.node.width = this.title.width ;
    },
    
    
    _show : function(){
        let offset = 80 ;
        
        // 从有toast未显示完的游戏场景退到hall会出错，不知道为什么
        let a1 = cc.moveBy( 1.5 , cc.p( 0 , offset) );
        a1.easing(cc.easeExponentialOut(1));
        
        let cb  = cc.callFunc( this._removeSelf    , this );
        let seq  = cc.sequence( a1 , cb);
        
        this.node.y -= offset ;
        this.node.runAction(seq);
    },
    
    _removeSelf : function(){
        NPHelper.putNode( "PbToast" , this.node ) ;

        if(this.msgMode === 0){
            MsgHelper.onMsgFinished();
        }  
    },
   
});
