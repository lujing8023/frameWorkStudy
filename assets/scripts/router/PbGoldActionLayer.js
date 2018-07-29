cc.Class({
    extends: cc.Component,

    properties: {
        ndGoldItem          :  cc.Node ,
    },

    onLoad: function () {
        this.ndGoldItem.active  = false ;
        this._maxGoldCount      = 30  ;
        this.playerToBankerTime = 0.4 ;     //  GCoin由闲家飞入庄家的时间
        this.bankerToPlayerTime = 0.4 ;     //  GCoin由庄家飞入闲家的时间
        this.delayTime          = 0.3 ;     //  GCoin到目的地等待的时间
        this.timeSum            = 0.6 ;     //  创造GCoin的总时间
        this.speed              = 3500 ;
        this.offset             = 30 ;
        this._comScheduler      = this.addComponent('ComScheduler') ;
        this.comNodePool        = this.addComponent('ComNodePool');
        _.times( 400 , ()=>{
            this._putNode( cc.instantiate( this.ndGoldItem ) ) ;
        });
    },
    
    onDestroy : function(){
        this._comScheduler.clearAll();
    },

    onBtnClick : function () {
        // _.random(-500,500);
        this.playerMoveBanker( 5 , cc.v2( 0 , 0 ) , cc.v2( _.random(-500,500) , _.random(-500,500) ));
    },

    playerMoveBanker : function ( winTimes  , playerPos , bankerPos ) {
        this._actionAll( winTimes , ()=>{
            this._goldActionPlayerMoveBanker( playerPos , bankerPos , 100) ;
            this._goldActionPlayerMoveBanker( playerPos , bankerPos , 255) ;
        } , playerPos , bankerPos )
        // let time = this.playerToBankerTime + this.timeSum + this.delayTime ;
        // this._comScheduler.once( 'updateRoundScore' ,  ()=>{
        //     this.node.parent.getComponent('FKNNGame').updateRoundScore();
        // } , time * 2)
    },

    bankerMovePlayer : function ( winTimes , bankerPos , playerPos ) {
        let time = this.playerToBankerTime + this.timeSum + this.delayTime ;
        this._comScheduler.once( 'bankerMovePlayer' ,  ()=>{
            this._actionAll( winTimes , ()=>{
                this._goldActionBankerMovePlayer( bankerPos , playerPos , 100) ;
                this._goldActionBankerMovePlayer( bankerPos , playerPos , 255) ;
            })
        } , time )
       
    },

    _actionAll : function ( winTimes  , cb = null , playerPos = null , bankerPos = null) {
        AudioMgr_Game.playSpecial('gold');
        winTimes = Math.min( winTimes*5 , this._maxGoldCount )   ;
        winTimes = this._maxGoldCount;
        let time  = ( this.timeSum ) / winTimes ;
        let delay = 0 ;
        cc.log(winTimes);
        _.times( winTimes , ( i )=>{
            delay = ( time * ( i + 1 )) ;
            this._comScheduler.once( 'playerMoveBanker' ,  ()=>{
                if(cb)cb();
            } , delay);
        } )
    },

    //  创造GCoin
    _createGold : function ( pos = cc.v2( 0 , 0 ) , opacity = 255 ){
        // let item = cc.instantiate( this.ndGoldItem ) ; 
        let item = this.comNodePool.getNode( this.ndGoldItem );
        item.opacity = opacity ;
        item.setPosition( pos )
        item.active = true ;
        this.node.addChild( item ) ;
        return item ;
    },

    //  GCoin从闲家飞到庄家
    _goldActionPlayerMoveBanker : function ( playerPos , bankerPos , opacity ) {
        this._actionMove( this.playerToBankerTime , playerPos , bankerPos , opacity , ( gold )=>{
            this._putNode( gold ) ;
        } )
    },

    // 庄家及结算如果有闲家赢了飞回闲家
    _goldActionBankerMovePlayer : function ( bankerPos , playerPos , opacity ) {
        this._actionMove( this.bankerToPlayerTime , bankerPos , playerPos , opacity , ( gold )=>{
            this._putNode( gold ) ;
        } )
    },

    _actionMove : function ( time , startPos , endPos , opacity , cb  ) {
        let random1 = _.random(-this.offset,this.offset);
        let random2 = _.random(-this.offset,this.offset);
        let gold = this._createGold( startPos , opacity );
        // let gold = this._createGold( cc.v2( startPos.x + random1  ,  startPos.y + random2 ) , opacity );
        // var bezier = [startPos, cc.p((endPos.x-startPos.x) / 2, (endPos.y-startPos.y) * _.random( 1 , 10 ) * 0.1 ), cc.v2( endPos.x + random  ,  endPos.y + random )];
        // var moveTo = cc.bezierTo( time , bezier );
        let _time     = cc.pDistance( startPos , endPos ) / this.speed ;
        if(_time > this.playerToBankerTime)this.playerToBankerTime = this.bankerToPlayerTime = _time;
        let moveTo    = cc.moveTo( _time , cc.v2( endPos.x + random1  ,  endPos.y + random2 ) ) ;
        let callFunc  = cc.callFunc(()=>{ if(cb)cb( gold ); });
        let delay = cc.fadeOut( this.delayTime );
        let seq = cc.sequence( moveTo , delay , callFunc);
        gold.stopAllActions();
        gold.runAction(seq);
    },

    _putNode : function (node) {
        node.opacity = 255 ;
        this.comNodePool.putNode( node );
    },











});
