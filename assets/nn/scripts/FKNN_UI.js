/**
 * 游戏UI控制器
 */

cc.Class({
    extends: cc.Component,

    properties: {

        // Players
        pbActorSelf         : cc.Prefab ,
        pbActorLeft         : cc.Prefab ,
        ndActorPosContainer : cc.Node   ,
        
        lbRoomInfo          : cc.Label  ,
        lbFeeMode           : cc.Label  ,
        lbGameMode          : cc.Label  ,
        lbBankerMode        : cc.Label  ,
        lbGameTurn          : cc.Label  ,
        lbBaseScore         : cc.Label  ,
        lbRoomType          : cc.Label  ,
        lbScoreMin          : cc.Label  ,

        ndState             : cc.Node   , 
        lbState             : cc.Label  ,

        ndClock             : cc.Node   ,

        armGameStart        : dragonBones.ArmatureDisplay   ,

        ndBtns_Init         : cc.Node   ,
        //wait,rob,bet,showOx(btnsPlay)
        ndBtnsOfPlayer      : {
            default         : [] ,
            type            : cc.Node 
        },
        ndBtnSit            : cc.Node ,

        lbOxAuto            : cc.Label  ,

        ndCardCalcContainer : cc.Node   ,

        // ndMore              :  cc.Node ,
        ndMoreBtns          :  cc.Node ,
        ndCardCountBtns     :  cc.Node ,
        ndVictory           :  cc.Node ,
        ndFailure           :  cc.Node ,

        lbRoundCost         : cc.Label ,
        lbCountDown         : cc.Label ,
        lbMostWin           : cc.Label ,
        // ndGoldItem          :  cc.Node ,

        pbarBattery         : cc.ProgressBar ,

        ndResultAni         : cc.Node  ,

        ndRoot              : cc.Node  ,

        ndBtnChangeTable    : cc.Node  ,
        ndBtnCopyRoomId     : cc.Node  ,
        ndDealerSpeak       : cc.Node  ,

        ndMic                       : cc.Node   ,
        ndClockContainer            : cc.Node   ,
        ndVoiceStateContainer       : cc.Node   ,
        ndGoldActionLayerContainer  : cc.Node   ,

        spTableBg                   : cc.Sprite ,
        spTableL                    : cc.Sprite ,
        spTableR                    : cc.Sprite ,
        spDealer                    : cc.Sprite ,

        ndTime                      : cc.Node   ,
        lbRoomID                    : cc.Label  ,
        lbRoundNum                  : cc.Label  ,
        ndAskDisRoom                : cc.Node   ,
        ndDisRoom                   : cc.Node   ,  
    },  

    onLoad: function () {
        this._comScheduler      = this.addComponent('ComScheduler') ;
        this.ndDealerSpeak.active    = false;
        this.lbRoundCost.node.active = false;
        this.lbMostWin.node.active   = false;
        // this.lbCountDown.node.active = false;
        this.scoreTime              = 0.5 ;
        this.waitTime               = 2 ;
        this.roundCostTime          = 3 ;   //  提示收取手续费的展示时间
        this.mostWinTime            = 5 ;   //  提示输赢不能超过携带值的展示时间
        this.dealerSpeakTime        = 5 ;   //  荷官说话时间
        this.roomRounNum            = 0 ;
        this.ndMoreBtns.active      = false ;
        this.ndCardCountBtns.active = false ;
        this.ndVictory.active       = false ;
        this.ndFailure.active       = false ;
        
        this.isiwns = this.ndVictory.parent;
        // this.ndGoldItem.active = false ;
        // this.ndResultAni.active = false ;
        this.roomId();
        this.showRoundString();


    },

    initNodes : function(){
        this.ndTime.addComponent('ComTime');

        let nodeNames  = ['PbClock','PbGoldActionLayer'];
        let containers = [this.ndClockContainer , this.ndGoldActionLayerContainer ] ;

        let self = this ;
        _.each( nodeNames , (name,i)=>{
            PBHelper.getNode( name , (node)=>{
                containers[i].addChild( node );
                switch( i ){
                    case 2 : 
                        self.node.getComponent( 'GameScene_NN' )._goldActionLayer = self.ndGoldActionLayerContainer.children[0].getComponent('PbGoldActionLayer') ;
                        break;
                }
            },false);
        });
    },

    updateTable : function () {
        // if( this.spTableBg.spriteFrame == null ) this.spTableBg.spriteFrame = TexHelper.getTableBg();

        // this.spTableL.spriteFrame = TexHelper.getTables(gLocalData.sysInfo.tableBg ? gLocalData.sysInfo.tableBg : 0) ;
        // this.spTableR.spriteFrame = TexHelper.getTables(gLocalData.sysInfo.tableBg ? gLocalData.sysInfo.tableBg : 0) ;
    },

    showDealer : function( index = 0 ){
        // this.spDealer.spriteFrame = TexHelper.getDealer(index);
    },

    showDealerSpeak : function( index = 0 ){
        this.ndDealerSpeak.active    = true;
        let arr1    = index > 0 ? $G.gStrings.Dealer.Speaks[index-1] : _.last($G.gStrings.Dealer.Speaks) ;
        let arr2    = _.last($G.gStrings.Dealer.Speaks);
        let random1  = _.random(0 , 9)
        let arrSum = [];
        if(random1 > 9)arrSum = arr2;
        else arrSum = arr1;
        // let arrSum  = _.union(arr2 , arr1);
        let random  = _.random(0, _.size(arrSum) - 1)
        this.ndDealerSpeak.getChildByName('speak').getComponent(cc.Label).string = arrSum [ random ];
        if(!this._comScheduler) return;
        this._comScheduler.once( 'showDealerSpeak' ,  ()=>{
            this.ndDealerSpeak.active = false ;
        } , this.dealerSpeakTime )
    },

    /**
     * showCountDown
     */
    showCountDown : function ( time = 0 , show = true ) {
        if(time <= 0 )this.lbCountDown.node.active = false ;
        if( show ){
            this.lbCountDown.node.active = show ;
            this._initTime( Math.ceil( time ) ) ;
        }else{
            this.lbCountDown.node.active = show;
        }
    },

     /**
     * showMatching
     */
    showMatching : function ( show = true ) {
        this.lbCountDown.node.active = show;
        this.lbCountDown.string = '玩家匹配中...'
    
    },

    /**
     * showResultTitle
     */
    showResultTitle : function ( isWin ) {
        // this.ndResultAni.active = true ;
        // AudioMgr_Game.playSpecial( isWin ? 'win' : 'lose');
        // this.clips = this.ndResultAni.getComponent(cc.Animation).getClips();
        // this.ndResultAni.getComponent(cc.Animation).play(isWin ? 'win' : 'lose')
        this.ndVictory.active       = isWin ;
        this.ndFailure.active       = !isWin ;
        this.isiwns.getComponent(cc.Animation).play();
    },

    /**
     * showRoundCost
     */
    showRoundCost : function(){
        this.lbRoundCost.node.active = true ;
        // this.lbRoundCost.string = '本场每局消耗' + GameMsgHandler.getData().roundCost + 'GCoin'  ;
        this.lbRoundCost.string = '赢家将收取1%服务费'  ;
        if(!this._comScheduler) return;
        this._comScheduler.once( 'showRoundCost' ,  ()=>{
            this.lbRoundCost.node.active = false ;
        } , this.roundCostTime )
        
    },

     /**
     * MostWin
     */
    showMostWin : function(){
        this.lbMostWin.node.active = true ;
        // this.lbRoundCost.string = '本场每局消耗' + GameMsgHandler.getData().roundCost + 'GCoin'  ;
        // this.lbMostWin.string = '赢家将收取1%服务费'  ;
        if(!this._comScheduler) return;
        this._comScheduler.once( 'showRoundCost' ,  ()=>{
            this.lbMostWin.node.active = false ;
        } , this.mostWinTime )
        
    },

    /**
     * showRoomInfo
     */
    showRoomInfo : function( infos ){
        // this.lbRoomInfo.string      = infos[0];
        // this.lbFeeMode.string       = infos[1];
        this.lbBaseScore.string     = infos[2];
        // this.lbGameMode.string      = infos[3];
        // this.lbBankerMode.string    = infos[4];
        // this.lbGameTurn.string      = infos[5];
    },

    /**
     * showPlayerButton
     */
    showPlayerButton : function( state = null ){
        let showIndex = -1 ;
        switch( state ){
            case 'wait' :
                showIndex = 0 ;
                break;
            case 'rob' :
                showIndex = 1 ;
                break;
            case 'bet' :
                showIndex = 2 ;
                break;
            case 'showOx' :
                showIndex = 3 ;
                break;
        }
        _.each( this.ndBtnsOfPlayer , (btn,index) => {
            btn.active = showIndex === index ;
        });
    },

   /**
    * showInviteBtns
    *
    * mode 0 : dismiss 1:exit
    */
    showInviteBtns : function( show , isOwner , showInvite , showCopy ){
        // if( this.ndBtns_Init.active != show ) this.ndBtns_Init.active = show ;
        // if( show ){
        //     this.ndBtns_Init.children[0].active = showInvite ;
        //     this.ndBtns_Init.children[1].active = showCopy ;
        //     // this.ndBtns_Init.children[2].active = isOwner ;
        //     // this.ndBtns_Init.children[3].active = !isOwner ;
        // }
    },


    /**
     * showSitBtn
     */
    showSitBtn : function( show ){
        this.ndBtnSit.active = show ;
    },

    /**
     * setOxAutoText
     */
    setOxAutoText : function( text = '有牛' ){
        this.lbOxAuto.string = text ;
    },

    /**
     * showExitBtnMode
     */
    showExitBtnMode : function( mode = 'dismiss' ){
        this.ndBtns_Init
    },

    /**
     * showClock
    */
    showClock : function( show = true , time = 4 ){
        cc.log("@showClock" + time );
        time = parseInt( time );
        if( time <= 0 ) return ;
        this.ndClockContainer.active = show ;
        if(show) {
            if(this.ndClockContainer.children[0]){
                this.ndClockContainer.children[0].getComponent('PbClock').initTime( time );
            }
        }
        // else{
        //     this.ndClockContainer.children[0].getComponent('PbClock').initTime( time );
        // }
    },

    /**
     * showArmGameStart
     */
    showArmGameStart : function( show = true ){
        this.armGameStart.node.active = show ;
        if(show){
            this.showRoundCost();
            this.armGameStart.armature().animation.play('gamestart',1);
        }
    },

    // 玩牌按钮模式
    setBtnsOfPlayState : function( autoOx = false , canRub = false ){
        let nodes = this.ndBtnsOfPlayer[3].children ; 
        nodes[0].active = !autoOx ; // 有牛
        nodes[1].active = !autoOx ; // 无牛
        nodes[2].active = autoOx ;  // 自动摊牌
        nodes[3].active = canRub ;  // 搓牌
    },

    update : function(dt){
        if( this.scheduleActive ){
            this._updateLight(dt);
        }
    },

    _changeActive : function( node , active ){
        if( node.active != active ) node.active = active ;
    },

    _initTime : function( time ){
        if( time <= 0 ) {
            this.lbCountDown.node.active = false;
            return ;
        }
        if( time < 1 ) time = 0 ;
        this.timeOri   = time ;
        this.timeInt   = time ;
        this.timeFloat = time ;
        this.lbCountDown.string = `游戏即将开始：${Math.ceil(time)}` ;
        this.scheduleActive  = true ;
    },

    _updateTime : function(){
        this.timeInt -- ;
        if( this.timeInt < 0 ) return ;
        this.lbCountDown.string = `游戏即将开始：${Math.ceil(this.timeInt)}` ;
        // if( this.timeInt <= 2 )  AudioMgr_Game.playSpecial('alert');
    },

    _updateLight : function(dt){
        this.timeFloat -= dt ;
        if( this.timeFloat < 0 ){
            this._removeSchedule();
            this.lbCountDown.node.active = false ;
            return ;
        }
        let timeInt = Math.ceil( this.timeFloat ); 
        if( timeInt != this.timeInt ){
            this._updateTime();
        }
    },

    _removeSchedule : function(){
        this.scheduleActive = false ;
    },

    onDestroy : function(){
        this._comScheduler.clearAll();
    },

    //显示房间号
    roomId:function(){
        this.lbRoomID.string = `房号：${GameMsgHandler.getData().id}`
    },

    //刷新剩余局数
    showRoundString:function(){
        this.roomRounNum += 1;
        this.lbRoundNum.string = `当前局数：${this.roomRounNum}`
    }



});
