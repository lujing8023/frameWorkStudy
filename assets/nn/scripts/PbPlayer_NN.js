
cc.Class({
    extends: cc.Component,

    properties: {
        ndHead            : cc.Node   ,
        lbName            : cc.Label  ,
        lbScore           : cc.Label  ,
        spHead            : cc.Sprite ,

        ndMiss            : cc.Node   ,
        ndBanker          : cc.Node   ,
        ndBankerLight     : cc.Node   ,

        ndOxBg            : cc.Node   ,
        spOxResult        : cc.Sprite ,
        spState           : cc.Sprite ,
        sfReady           : cc.SpriteFrame ,
        sfFinish          : cc.SpriteFrame ,
        sfRob             : cc.SpriteFrame ,
        sfUnRob           : cc.SpriteFrame ,
        sfBet1            : cc.SpriteFrame ,
        sfBet2            : cc.SpriteFrame ,
        sfBet3            : cc.SpriteFrame ,

        ndCardHolderContainer   : cc.Node ,  //持牌区
        ndCardShowContainer     : cc.Node ,  //出牌区

        ndChatFace              : cc.Node ,
        ndChatInfo              : cc.Node ,

        ndLoseScore             : cc.Node ,
        ndWinScore              : cc.Node ,

        ndChatBubble            : cc.Node , 
    },

    onLoad: function () {
        let effHead= this.node.getChildByName('eff_head');
        this.defaultNickFontSize = this.ndChatInfo.getChildByName('info').getComponent(cc.Label).fontSize   ; 
        if(effHead) effHead.active                              = false ;
        this.ndChatBubble.active                                = false ;
        this.ndLoseScore.getChildByName('score').opacity        = 0;
        this.ndWinScore.getChildByName('score').opacity         = 0;
        this.ndLoseScore.active                                 = false ;
        this.ndWinScore.active                                  = false ;
        this._oxResultScale                                     = this.spOxResult.node.scale ;
        this._bankerScale                                       = this.ndBanker.scale ;
        this._chatSche                                          = null ;
        this.scoreTime                                          = 0.5 ;
        this.waitTime                                           = 4 ;
        this.startPos                                           = cc.v2( this.ndLoseScore.getChildByName('score').getPosition().x , this.ndLoseScore.getChildByName('score').getPosition().y - 40 );
        this._comScheduler                                      = this.addComponent('ComScheduler') ;
        this._ntf                                               = this.addComponent('ComNotify');
        this._ntf.register( NOTIFY_VOICE_PLAY_START , (event)=>{
            if( event.detail.cid == this.cid ){
                // this.ndChatBubble.active = true ;
            }
        });
        this._ntf.register( NOTIFY_VOICE_PLAY_END , (event)=>{
            this.ndChatBubble.active = false ;
        });
        this.resetAll();

        // this._sfChatFace = NPHelper.getNode('ComChatSF').getComponent('ComChatSF') ;
    },

    onDestroy : function(){
        this._comScheduler.clearAll();
        // NPHelper.putNode( 'ComChatSF' , this._sfChatFace.node );
    },
        
    start: function(){

    },

    init : function( cid ){
        this.cid = cid ;
    },

    updateRoundScore : function ( score , cb ) {
        this.ndLoseScore.active = score <= 0 ;
        this.ndWinScore.active  = score > 0 ;
        score = StringHelper.getValueChinese(score)
        let ndLoseScore =  this.ndLoseScore.getChildByName('score') ;
        let ndWinScore  =  this.ndWinScore.getChildByName('score')  ;
        if(this.ndLoseScore.active){
            ndLoseScore.getComponent(cc.Label).string = score;
        }
        if(this.ndWinScore.active){
            ndWinScore.getComponent(cc.Label).string = '+' + score;
        }
        let seq = ActionHelper.getFadeInToFadeOut( this.scoreTime , this.waitTime , ()=>{
            ndLoseScore.opacity        = 0;
            ndWinScore.opacity         = 0;
            this.ndLoseScore.active         = false ;
            this.ndWinScore.active          = false ;
        } )
        if( this.ndLoseScore.active ){
            ndLoseScore.stopAllActions();
            ndLoseScore.setPosition(this.startPos);
            ndLoseScore.runAction(seq);
        }
        if( this.ndWinScore.active ){
            ndWinScore.stopAllActions();
            ndWinScore.setPosition(this.startPos);
            ndWinScore.runAction(seq);
        }
    },

    showAnimation : function () {
        let effHead = this.node.getChildByName('eff_head');
        if( effHead ){
            effHead.active = true ;
            effHead.getComponent(cc.Animation).play();
        }
    },

    // 部分reset：每局结束的时候调用
    resetPart : function(){
        this.showOxResult(-1,false);
        this.showBanker(false);
        this.showState(null,false);
        this.removeCards(2);
        this.removeCards(1);
    },

    // 彻底reset：addplayer的时候调用
    resetAll : function(){
        let effHead = this.node.getChildByName('eff_head');
        effHead.active = false ;
        this.ndLoseScore.active         = false ;
        this.ndWinScore.active          = false ;
        this.resetPart();
        this.showMiss( false );
        this.showChat( false );
    },

    setRightMode : function(){
        this.isRightModeEnabled                      =  true ;
        this.ndHead.x                               *=  -1 ;
        this.ndMiss.x                               *=  -1 ;
        this.ndBanker.x                             *=  -1 ;
        this.spState.node.x                         *=  -1 ;
        this.spOxResult.node.x                      *=  -1 ;
        this.ndOxBg.x                               *=  -1 ;
        this.ndCardShowContainer.x                  *=  -1 ;
        this.ndCardHolderContainer.x                *=  -1 ;
        // this.ndChat.x                               *=  -1 ;
        this.ndChatFace.x                           *=  -1 ;
        this.ndChatInfo.x                           *=  -1 ;
        this.ndLoseScore.x                          *=  -1 ;
        this.ndWinScore.x                           *=  -1 ;
        this.ndChatBubble.x                         *=  -1 ;
        this.node.getChildByName('eff_head').x      *=  -1 ;
    },

    //onHeadClicked 
    onHeadClicked : function( event , custom ){
        let user = GameMsgHandler.getUserByCid( this.cid );
        if( !user ) return ;
        PBHelper.addNode( 'DlgPlayerInfo' , gGameScene.node , (node)=>{
            let com  = node.getComponent('DlgPlayerInfo'); 
            com.initWithData( user.nick , user.id , user.ip , user.head , user.desp ? user.desp : '' , user.sex , this.cid == 0) ;
        });
    },

    //showName
    showName : function( name ){
        this.lbName.string = name ;
    },

    //showScore
    showScore : function( money ){
        // let m = parseFloat( money ).toFixed(2);
        let m = money ;
        this.lbScore.string = m ;
    },

    showHead : function( head ){
        // TexHelper.setSpriteByUrl( this.spHead , url );
        head = head == '' ? 0 : head ;
        if(this._isPositiveInteger( head )){
            // if(TexHelper.getHead( head ))this.spHead.spriteFrame = TexHelper.getHead( head );
        }else{
            // TexHelper.setSpriteByUrl( this.spHead , head );
        }
    },

    //showMiss
    showMiss : function( show = true  ){
        if( this.ndMiss.active === show ) return ;
        this.ndMiss.active = show ;
    },

    //showBanker
    showBanker : function( show = true ){
        if( this.ndBanker.active != show ) this.ndBanker.active = show ;
        if( this.ndBankerLight.active != show ) this.ndBankerLight.active = show ;

        if( show ){
            let scale = this._bankerScale ;
            // this.ndBanker.runAction( ActionHelper.getBigToSmall(0.2,scale*2,scale) );
            let action = cc.spawn( ActionHelper.getBigToSmall(0.6,scale*2,scale) , cc.rotateBy(0.6,360) );
            this.ndBanker.rotation = 0 ;
            this.ndBanker.scale = scale ;
            this.ndBanker.runAction( action );
        }
    },
    hideBankerAction : function(){
        this.ndBankerLight.active = false;
    },
    showBankerAction : function(){
        this.ndBankerLight.active = true;
        
    },
    
    /**
     * showState
     */
    showState : function( sf = null , show = true ){
        show = ( sf == null ) ? false : show ;
        if( show == true ) this.spState.spriteFrame = sf ;
        if( this.spState.node.active != show ) this.spState.node.active = show ;
    },
    
    //showReady
    showReady : function( show = true ){
        cc.log( "showReady " + show );
        this.showState( this.sfReady , show ) ;
    },

    //showRob
    showRob : function( rob = null , show = true ){
        let sf = rob ? this.sfRob : this.sfUnRob ;
        this.showState( sf , show ) ;
    },

    //scoreValue:[1,3] 一分两分三分
    showCallScore : function( scoreValue , show = true ){
        let sfs = [ this.sfBet1 , this.sfBet2 , this.sfBet3 ]
        this.showState( sfs[ scoreValue - 1 ] , show ) ;
    },  

    //showOxResult -1:finish , [0.18]:ox
    showOxResult : function( result = -1 , show = true ){
        cc.log(( '@showOxResult: ' + result + ' show: ' + show )) ;
        if( this.spOxResult.node.active && show && result === -1 ) return;
        if( this.spOxResult.node.active != show ) this.spOxResult.node.active = show ;
        if( this.ndOxBg.active != show ) this.ndOxBg.active = show ;
        if( show ){
            this.spOxResult.spriteFrame = result === -1 ? this.sfFinish : TexHelper.getOXType( result ) ;
            this.spOxResult.node.scale = this._oxResultScale * 3 ;
            this.spOxResult.node.runAction( ActionHelper.getScaleTo( 0.2 , this._oxResultScale ));
        }
    },

    // addCards -> posType : 1 持牌区 / 2 出牌区
    addCards : function( posType , cards , isFront = true , showAction = false ){
        _.each( cards , (card) => {
            this.addCard( posType , card , isFront , showAction );
        });
    },

    // addCard -> posType : 1 持牌区 / 2 出牌区
    addCard : function( posType , card , isFront = true , showAction = false ){
        let container = posType === 1 ? this.ndCardHolderContainer : this.ndCardShowContainer ;
        let com = NPHelper.getNode('PbCard').getComponent('PbCard');
        com.init( card.suit , card.point , isFront );
        container.addChild( com.node );
        if( showAction ) com.showCardFrontWithFlipAction();
        return com;
    },

    //removeCards: 1 持牌区 / 2 出牌区
    removeCards : function( posType ){
        let container = posType === 1 ? this.ndCardHolderContainer : this.ndCardShowContainer ;
        for( let i = container.children.length ; i > 0 ; i-- ){
            NPHelper.putNode( 'PbCard' , container.children[i-1] );
        }
    },

    //从持牌区移动到出牌区
    moveCardsToShowArea : function(){
        if( _.size(this.ndCardHolderContainer.children) <= 0 && _.size(this.ndCardShowContainer.children) <= 0){
            this.addCards( 2 ,[{point:1},{point:1},{point:1},{point:1},{point:1}] , false , false );
        }else{
            while( _.size(this.ndCardHolderContainer.children) > 0 ){
                let node = this.ndCardHolderContainer.children[0];
                node.removeFromParent();
                node.parent = this.ndCardShowContainer ;
                let com = node.getComponent('PbCard');
                com.showCardFront(false);
                com.showChoosed(false);
            }
        }
    },

    //getCardsCount
    getCardsCount : function( posType ){
        let container = posType === 1 ? this.ndCardHolderContainer : this.ndCardShowContainer ;
        return _.size( container.children ) ;
    },

    //
    chooseCards : function( indexs = null ){
        _.each( this.ndCardHolderContainer.children , (node)=>{
            let card = node.getComponent('PbCard');
            card.showChoosed(false);
        });

        if( indexs === null ) return ;
        _.each( indexs , (i)=>{
            let node = this.ndCardHolderContainer.children[i];
            if( node != undefined && node != null ){
                node.getComponent('PbCard').showChoosed(true);
            }
        });
    },

    //1 emoj 2 fix string 3 custom string 4voice
    showChat : function( show , type , value ){
        if( type == 4 ){
            this.ndChatBubble.active = show ;
            return;
        }
        this.ndChatFace.active = show ;
        this.ndChatInfo.active = show ;
        if( !show ) return;
        let bg1     = this.ndChatInfo.getChildByName('bg1');
        let bg2     = this.ndChatFace.getChildByName('bg2');
        let icon    = this.ndChatFace.getChildByName('icon');
        let info    = this.ndChatInfo.getChildByName('info');
        info.getComponent(cc.Label).fontSize    = this.defaultNickFontSize  ; 
        info.getComponent(cc.Label).lineHeight  = this.defaultNickFontSize  ;
        icon.active = type === 1 ;
        bg2.active  = type === 1 ;
        info.active = type >= 2 ;
        bg1.active  = type >= 2 ;

        let time = 6 ;
        switch( type ){
            case 1 : 
                // let tex = TexHelper.getFace( value ) ;
                let tex = this._sfChatFace.getSf( value ) ;
                if( !tex ) return ;
                icon.getComponent(cc.Sprite).spriteFrame = tex ;
                break;
            case 2 : 
                info.getComponent(cc.Label).string = $G.gCData.Chat_TextList[value-1] ;
                break;
            case 3 : 
                info.getComponent(cc.Label).string = value ;
                time = 12 ;
                break;
        }

        if(this.ndChatInfo.active)this.ndChatInfo.runAction( ActionHelper.getDlgShow() ) ;
        if(this.ndChatFace.active)this.ndChatFace.runAction( ActionHelper.getDlgShow() ) ;
        if( this._chatSche ){
            this.unschedule( this._chatSche );
        }
        this._chatSche = ()=>{
            this.showChat(false) ; 
            this._chatSche = null ;
        }
        this.scheduleOnce( this._chatSche , time );
    },

    //  判断是否为正整数
    _isPositiveInteger : function(s){
        let re = /^[0-9]+$/ ;
        return re.test(s)
    },

});
