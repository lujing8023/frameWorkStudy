
cc.Class({
    extends: cc.Component,

    properties: {
        ndPoker : cc.Node,
    },

    onLoad:function(){
        this.ndPoker.active = false;
        this.comNodePool        = this.addComponent('ComNodePool');
        this._time = 0.2;
    },

    init : function( com ){
        this._target = com ;
        this.winCid = 0 ;
        this.loseCid = 0 ;
        if(!this._time)this._time = 0.2;
        if(!this.comNodePool)this.comNodePool = this.addComponent('ComNodePool');
        return this ;
    },


    runCompareCard : function( cid1 , cid2 , winCid , cb ){
        // this.winCid = winCid;
        // this.loseCid = cid1 == winCid ? cid2 : cid1 ;
        let cids = this._rowCid(  cid1 , cid2 );
        _.each(cids , (cid , index)=>{
            let isWin       = winCid ==  cid ;
            let startPos    = this._getStartPos(cid);
            let endPos      = this._getEndPos(index);
            $G.gCData.gComPlayers[ cid ].actionHideBigCard();
            this._runAction(startPos , endPos , cid , isWin , index , ()=>{if(index == 0)cb() });
        })
        
    },

    //  转换之后【左 ,右】
    _rowCid : function( cid1 , cid2  ){
        // 目前先随机分配
        let arr = [cid1 , cid2];
        // arr.sort(()=>{return 0.5 - Math.random()})
        if(cid1 == 0 || cid2 == 0){
            if( cid1 > 2 || cid1 == 0 ){
            }else{ arr = [ cid2 , cid1 ]; }  
        }else{
            if( cid2 > cid1 ) arr = [ cid2 , cid1 ];
        }
        return arr;
    },

    _getStartPos : function( cid ){
        let sid =  GameMsgHandler.getSid(cid);
        let pos = this._target.node.getComponent('ZJH_Ctl').getBigCardParentPosBySid(sid);
        return pos;
    },

    // index = 0 左侧 1 右侧
    _getEndPos : function( index ){
        // TODO:
        let pos = this._target.node.getComponent('ZJH_Ctl').getComparePosByIndex(index);
        return pos;
    },
    
    // pos 位置 type == 0 发牌  1 弃牌
    _runAction:function( startPos , endPos , cid , isWin = false , index , cb = null){
        let scaleByTime  = 1 ;
        let scaleToTime  = 0.5 ;
        let scaleToTime2 = 0.2 ;
        let delayTime    = 3 ;
        let poker       = this._createPoker( startPos , cid == 0);
        let startScale  = poker.children[0].scale;
        let scaleBy     = cc.scaleBy(scaleByTime,1.3);
        let callFunc1   = cc.callFunc(()=>{ poker.children[1].active = false ; });
        let _scaleTo    = cc.scaleTo(scaleToTime,1.6);
        let _moveTo     = cc.moveTo(scaleToTime ,endPos);
        let spawn       = cc.spawn( _moveTo , _scaleTo);
        let hideAction = cc.hide();
        let callFunc2   = cc.callFunc(()=>{
            // poker.active = false; 
            // 播放输赢动画
            if(!isWin){
                this._target.showCompareActionBg(false,true);
                this._target.showCompareActionByindex(index,true,true);
            }else{
                this._target.showCompareActionByindex(index,false,true);
            }
        });

        let showAction = cc.show();
        let delay = cc.delayTime(delayTime);
        let callFunc4   = cc.callFunc(()=>{ 
            this._target.showCompareActionBg(true , true);
            this._target.showCompareActionByindex(index,false,false);
            // poker.active = true; 
        });


        let _scaleTo2     = cc.scaleTo(scaleToTime2,startScale);
        let _moveTo2      = cc.moveTo(scaleToTime2 ,startPos);
        let spawn2        = cc.spawn( _scaleTo2 , _moveTo2);

        let callFunc3     = cc.callFunc(()=>{
            $G.gCData.gComPlayers[ cid ].actionShowBigCard();
            if(!isWin)$G.gCData.gComPlayers[ cid ].showIsLookCard(true ,1);
            poker.children[0].scale = 1;
            poker.children[1].active = false ;
            this._putNode( poker ) ;
            if(cb)cb();
        });

        let seq2 =  cc.sequence( scaleBy , callFunc1 , spawn , hideAction ,callFunc2 );
        let seq =  cc.sequence( seq2, delay , showAction ,callFunc4 , spawn2 , callFunc3 );

        poker.stopAllActions();
        // poker.runAction(seq.easing(cc.easeOut(this._time)));
        poker.runAction(seq);
    },

    _createPoker : function ( startPos , cidIsZero ){
        let type = 3;// 扎金花是三张
        let item = this.comNodePool.getNode( this.ndPoker );
        item.setPosition( startPos );
        cidIsZero = false//TODO
        item.scale = cidIsZero ? 1.5 : 1 ;
        item.active = true ;
        item.children[1].active = true ;
        this.node.addChild( item ) ;
        _.times(type , (index)=>{
            this.addCard( item.children[0].children[index] , {suit:1,point:1} , false , false );
        })
        return item;
    },
    
    //  创建并且添加牌
    addCard : function( nd , card , isFront = true , showAction = false ){
        let container = nd;
        let com = NPHelper.getNode('PbCard').getComponent('PbCard');
        com.init( card.suit , card.point , isFront );
        container.addChild( com.node );
        if( showAction ) com.showCardFrontWithFlipAction();
        return com;
    },

    _putNode : function (node) {
        node.opacity = 255 ;
        this.comNodePool.putNode( node );
    },

    //最后展示牌（边移动 边放大）
    showCard:function(cb = null){
        $G.gCData.gComPlayers[ 0 ].actionHideBigCard();
        let endScale    = 1.6;
        let time        = 0.2;
        let delayTime   = 2 ;
        let endPos      = cc.p(0 , 0);
        let poker       = this._creatCard();
        let moveAction  = cc.moveTo( time , endPos ).easing(cc.easeCubicActionIn());
        let scareAction = cc.scaleTo( time , endScale );
        let delay       = cc.delayTime(delayTime);
        let callFunc    = cc.callFunc(()=>{ 
            poker.getChildByName("frame").active = true ; 
            poker.children[0].scale = 1;
            this._putNode( poker ) ;
            if(cb)cb();
        });
        let spawn       = cc.spawn( moveAction , scareAction);
        let action      = cc.sequence(spawn , delay, callFunc );
        poker.runAction(action);
    },


    _creatCard:function(){
        let cardData = GameMsgHandler.getCardsByCid(0);//数组里面有三张牌的数据
        let startPos  = this._getStartPos(0);
        let cidIsZero = 1;
        let type = 3;// 三张
        let item = this.comNodePool.getNode( this.ndPoker );
        item.setPosition( startPos );
        item.scale = cidIsZero;
        item.active = true ;
        // item.children[1].active = true ;
        item.getChildByName("frame").active = false;
        this.node.addChild( item ) ;
        _.each(cardData , (card , index)=>{
            this.addCard( item.children[0].children[index] , card , true , false );
        })
        return item;
    }
    
});
