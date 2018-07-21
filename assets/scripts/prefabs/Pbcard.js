cc.Class({
    extends: cc.Component,

    properties: {
        // nodes
        spPoint : cc.Sprite ,
        lbPoint : cc.Label  ,
        spSuit  : cc.Sprite ,
        spMain  : cc.Sprite ,
        spBg    : cc.Sprite ,
        ndBanker: cc.Node   ,
        ndFold  : cc.Node   ,

        // color
        colorRed    : cc.Color.RED    ,
        colorBlack  : cc.Color.BLACK  ,
        colorLaizi  : cc.Color.YELLOW ,

        // items
        sfBgCover   : cc.SpriteFrame ,
        sfBgBlank   : cc.SpriteFrame ,
 
        // J / Q / K / JOKER
        sfFaces : {
            default: [] ,
            type: cc.SpriteFrame 
        },

        // 癞子icon
        sfLaiziIcon : cc.SpriteFrame ,

        // 方 梅 红 黑
        sfSuits : {
            default: [] ,
            type: cc.SpriteFrame 
        },

        // [1,15]
        sfPoints : {
            default: [] ,
            type: cc.SpriteFrame 
        },
        
    },
    

    onLoad : function(){
        // this.showCardFront(false);
        // this.showCardFrontWithFlipAction();
    },

    /**
     * 
     * Suit = cc.Enum({
            Spade:      1,   // 黑桃
            Heart:      2,   // 红桃
            Club:       3,   // 梅花
            Diamond:    4,   // 方块
            Joker  :    5,   // 王 
        });
     * 
     * point : [ 1 , 13 ] + [ 14 , 15 ] 小王大王
     */
    init : function( suit , point , isFront = true , isBanker = false , isLaizi = false ){
        //data
        this.suit    = suit  ;
        this.point   = point ;
        this.choosed = false ;
        this.hitted  = false ;

        this.showChoosed( false ) ;
        this.showHitted( false )  ;
        this.node.active = true   ; 
        
        //point : label or sp
        this.spPoint.node.active = true ;
        this.spPoint.spriteFrame = this.sfPoints[ point - 1 ] ;
        // if( this.lbPoint.node.active ){
        //     let names = ['A','2','3','4','5','6','7','8','9','10','J','Q','K','J\nO\nK\nE\nR','J\nO\nK\nE\nR'];
        //     this.lbPoint.string = names[ point - 1 ];
        //     this.lbPoint.node.scale = ( point >= 14 ) ? 0.7 : 1 ;
        // }

        //main
        var isFaceCard = point > 10;
        if( isFaceCard ) {
            this.spMain.spriteFrame = this.sfFaces[ point - 11 ] ;
        }else{
            this.spMain.spriteFrame = this.sfSuits[ suit - 1 ];
        }

        //small suit
        if( suit <= 4 ){
            this.spSuit.node.active = true ;
            this.spSuit.spriteFrame = this.sfSuits[ suit - 1 ];
        }

        //color
        this.baseColor = ( suit === 2 || suit === 4 ) ? this.colorBlack : this.colorRed;
        this.mainColor = isFaceCard ? cc.Color.WHITE : this.baseColor ;
        //joker
        if( point >= 14 )
        {
            this.spSuit.node.active = false ;
            this.baseColor = ( point === 14 ) ? this.colorBlack : this.colorRed ;
        }

        //color
        this.spPoint.node.color   = this.baseColor ;
        this.spSuit.node.color    = this.baseColor ;
        this.spMain.node.color    = this.mainColor ;

        //banker icon
        this.ndBanker.active = isBanker ;

        //laizi
        if( isLaizi ) this.showLaizi();

        this.spSuit.node.scale = isLaizi ? 0.55 : 0.35 ;
        this.spMain.node.scale = isLaizi ? 1.15 : 1 ;

        //front / back
        this.showCardFront( isFront );
    },

    showLaizi : function(){
        this.spMain.spriteFrame = this.sfLaiziIcon ;
        this.spSuit.spriteFrame = this.sfLaiziIcon ;
        this.spSuit.node.color  = cc.Color.WHITE   ;
        this.spPoint.node.color = this.colorLaizi  ;
        this.spMain.node.color  = cc.Color.WHITE   ;

        this.spPoint.node.active = true;
        this.spSuit.node.active  = true ;

        this.spSuit.node.scale = 0.55 ;
        this.spMain.node.scale = 1.15  ;
    },

    showBanker : function( show ){
        this.ndBanker.active = show ;
    },

    //true上移，false恢复
    showChoosed : function( show ){
        if( show === null ){
            this.choosed = !this.choosed ;
        }else{
            if( show === this.choosed ){
                return;
            }
            this.choosed = show ;
        }
        
        if( this.choosed ){
            this.node.y = 50 ;
        }else{
            this.node.y = 0  ;
        }
    },


    //true变灰，false变白
    showHitted : function( show ){
        if( show === null ){
            this.hitted = !this.hitted ;
        }else{
            if( show === this.hitted ){
                // return;
            }
            this.hitted = show ;
        }
        
        let num = 255 ;
        if( this.hitted ){
            num = 220 ;
            this.ndFold.active = true ;
            // this.spMain.node.color =  new cc.Color( 160, 160, 160, 255);  
            // this.spBg.node.color =  new cc.Color( 160, 160, 160, 255);   
        }else{
            this.ndFold.active = false ;
            // this.spBg.node.color = cc.Color.WHITE; 
            // this.spMain.node.color = cc.Color.WHITE; 
        }

        this.spMain.node.opacity  = num ;
        this.spPoint.node.opacity = num ;
        this.spSuit.node.opacity  = num ;
    },


    // true显示卡牌 ，false显示卡背
    showCardFront: function ( show = true ) {
        this.spPoint.node.active = show;
        this.spSuit.node.active  = show;
        this.spMain.node.active  = show;
        this.spBg.spriteFrame    = show ? this.sfBgBlank : this.sfBgCover;
    },

    showCardFrontWithFlipAction : function(_cb = null){
        let cb = () => {  this.showCardFront();if(_cb)_cb(); }
        this.node.runAction( ActionHelper.getFlip( cb , this.node.scaleX ) );
    },
    
});
