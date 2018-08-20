cc.Class({
    extends: cc.Component ,

    properties: {},

    onDestroy : function(){
        NotifyHelper.clearAll();
        gGameScene   = null ;
        GameMsgHandler.clearData();
        $G.gCData.gComPlayers          = [];
        $G.gCData.gSids                = [];
        $G.gCData.gCids                = [];
    },

    start : function () {
        // AudioMgr_Game.playMusic("loadGameScene");
        //MsgHelper
        MsgHelper.resumeMsgHelper();
        MsgHelper.check();
    },
    
    onLoad: function () {
        gGameScene  = this ;
        this._load();
    },

    _load : function(){
         //coms
         this._ui                    = this.getComponent('FKNN_UI');   //单独提供UI接口 , 不含逻辑 
         this._ctl                   = this.addComponent("FKNN_Ctl");  //复合控制UI + 音效 + 逻辑等
         this._logic                 = require('FKNN_Logic');          //牛牛算法
         this._ntf                   = this.addComponent('ComNotify'); //控件 - Notify
         this._comScheduler          = this.addComponent('ComScheduler') ;
        //  this._goldActionLayer       = cc.find('ndRoot/ComGoldActionLayer',this.node).getComponent('PbGoldActionLayer');   // GCoin动画层

         //init
         NPHelper.initHelper();
         this._ui.initNodes();
        //  this._ctl.initRoomInfo();
         this._ctl.initDealer();
         this._ctl.initPlayers();
         // this._ctl.updatePlayers();
         // this._ctl.updateSelfBtns();
         let state = GameMsgHandler.getRoomStateType() ;
         this._ctl.jumpRoomState( state );
         this._ctl.updatePlayers();
         this._ctl.updateSelfBtns();
 
         //notifys
         this._ctl.initNotifys();
         this._ui.updateTable();
    },

    onButtonClicked : function( event , custom ){
        // AudioMgr_Game.playButton();
        switch( custom ){
            case 'gamerules' :
                GameHelper.addGameRulesView(true);
                break;
            case 'invite' :
                let names   = GameMsgHandler.getRoomInfoNames();
                let title   = Configs.APPName + '【房号' + names.id + '】';
                let content = GameMsgHandler.getRoomParamsOneLineByNames( names , '、');
                WXHelper.inviteJoinRoom( names.id , title , content );
                break;
            case 'copy' :
                {
                    let names   = GameMsgHandler.getRoomInfoNames();
                    // let content = GameMsgHandler.getRoomParamsOneLineByNames( names , '、');
                    let content = '准入：' + GameMsgHandler.getData().scoreMin + '、' + '底注：' + GameMsgHandler.getData().baseScore +'、';
                    let text = `${Configs.APPName}【房号${names.id}】\n${content}(复制此消息后粘贴房号可快速进入房间)`
                    let info = '房间' + names.id + '复制成功，快分享给好友吧' ;
                    MsgHelper.pushToast(info);
                    cc.log( text );
                    PlatformHelper.copyToClipboard( text );
                    break;
                }
            case 'dismiss' :
                RoomServer.dismissRoom(()=>{
                    RoomServer.dismissVote(true);
                });
                break;
            // case 'leaveSit' :
            // case 'leave' :
            //     RoomServer.leaveRoom( ()=>{
            //         GameLogic.leaveRoom() ;
            //     });
                break;
            case 'sit' :
                GameMsgServer.sit( ()=>{
                    this._ui.showSitBtn( false );
                });
                break;
            case 'ready' :
                GameMsgServer.ready();
                break;
            case 'rob' :
                GameMsgServer.callBanker( 1 );
                break;
            case 'unRob' :
                GameMsgServer.callBanker( 0 );
                break;
            case 'bet1' :
                GameMsgServer.bet( 1 );
                break;
            case 'bet2' :
                GameMsgServer.bet( 2 );
                break;
            case 'bet3' :
                GameMsgServer.bet( 3 );
                break;
            case 'hasOx' :
                this._ctl.handlerBtnPlay('hasOx');
                break;
            case 'noOx' :
                this._ctl.handlerBtnPlay('noOx');
                break;
            case 'autoOx' :
                if(GameMsgHandler.canRubCard()){
                    this._ui.ndBtnsOfPlayer[3].active = false;
                    if( $G.gCData.gComPlayers[0].ndCardHolderContainer.children[4].getComponent('PbCard').spPoint.node.active){
                        GameMsgServer.finish();
                    }else{
                        $G.gCData.gComPlayers[0].ndCardHolderContainer.children[4].getComponent('PbCard').showCardFrontWithFlipAction();
                        this._comScheduler.once( 'autoOx' , ()=>{ GameMsgServer.finish();}, 1);
                    }
                }else{
                    GameMsgServer.finish();
                }
                break;
            case 'rubCard' :
            cc.log('###FGGGGGGGG' ,  1);
                if(cc.sys.isNative){
                    cc.log('###FGGGGGGGG' ,  2);
                    if( $G.gCData.gComPlayers[0].ndCardHolderContainer.children[4].getComponent('PbCard').spPoint.node.active){
                        cc.log('###FGGGGGGGG' ,  4);
                        GameMsgServer.finish();
                    }else{
                        cc.log('###FGGGGGGGG' ,  5);
                        PBHelper.addNode('DlgRubCard');
                    }
                }else{
                    cc.log('###FGGGGGGGG' ,  3);
                    this._ui.ndBtnsOfPlayer[3].active = false;
                    if( $G.gCData.gComPlayers[0].ndCardHolderContainer.children[4].getComponent('PbCard').spPoint.node.active){
                        cc.log('###FGGGGGGGG' ,  6);
                        GameMsgServer.finish();
                    }else{
                        cc.log('###FGGGGGGGG' ,  7);
                        $G.gCData.gComPlayers[0].ndCardHolderContainer.children[4].getComponent('PbCard').showCardFrontWithFlipAction();
                        this._comScheduler.once( 'autoOx' , ()=>{ GameMsgServer.finish();}, 1);
                    }
                }
                break;
            case 'setting' :
                PBHelper.addNode( 'DlgSetting' );
                break;
            case 'chat' :
                $G.gCData.gChatType = 'text' ;
                PBHelper.addNode( 'DlgChat' , null , null , 10000 );
                break;
            case 'emoji' :
                $G.gCData.gChatType = 'face' ;
                PBHelper.addNode( 'DlgChat' );
                break ;
            case 'moreOpen' :
                this._ui.ndMoreBtns.active = true ;
                break ;
            case 'moreClose' :
                this._ui.ndMoreBtns.active = false ;
                break ;
            case 'leave' :
                // RoomServer.dismissStart(()=>{RoomServer.dismissVote(true);});
                // RoomServer.dismissRoom(()=>{
                //     GameLogic.leaveRoom();
                // });
                break ;
            case 'changeTable' :
                this._ctl.changeTable();
                break ;
            case 'stand' :
                cc.log('stand');
                break ;
            case 'cardCountOpen' :
                this._ui.ndCardCountBtns.active = true ;
                break ;
            case 'cardCountClose' :
                this._ui.ndCardCountBtns.active = false ;
                break ;
            
        }
    },

});



