/**
 * 游戏控件控制器
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _targetComName  : 'GameScene_NN'
    },

    onLoad: function () {
        //DATA
        this._playersNumMax     = 9 ;
        this._comScheduler      = this.addComponent('ComScheduler') ;   //scheduler
        this._comScheduler2     = this.addComponent('ComScheduler') ;
        this._comRandomBanker   = this.addComponent('ComRandomBanker') ;
        this._comFunc           = this.addComponent('ComFuncChecker') ;
        // this._comVoicePlayer    = this.addComponent( 'ComVoicePlayer' ) ;
        this._target            = this.node.getComponent( this._targetComName );
        this._startAniTime      = 1.0 ;
        // this._target._ui.ndMic.addComponent('ComVoiceRecorder');

        //UI
        // this._target._ui.showArmGameStart( false );
        // if(GameMsgHandler.getData().type == 2)this._target._ui.showMatching();
        // this._target._ui.showCountDown( GameMsgHandler.getData().state.timer ? GameMsgHandler.getData().state.timer / 1000 : 0 , true );
        // this._target._ui.showInviteBtns( true , GameMsgHandler.isRoomOwner() , !GameMsgHandler.getData().guild ,!GameMsgHandler.getData().guild );
        this._target._ui.showInviteBtns( true , GameMsgHandler.isRoomOwner() , true , true );
        this._target._ui.setBtnsOfPlayState( true , GameMsgHandler.canRubCard() );

        //DEBUG

        //switch
        this.showBankerswitch = false;
        this._comRandomBanker.reset();
        this.bankerActionOver = true ;
        this.gameStart        = 0;//0 房间未开始  1 房间开始
        
        
    },

    initNotifys : function(){
        let ACFG = ServerRouters.OnAction_FKNN ;
        let NTF  = this._target._ntf ;
        ///////////////////////
        // NTF.register( NOTIFY_VOICE_RECORD_START , (event)=>{
        //     // event.detail.max
        //     this._target._ui.showVoiceMic(event.detail.max);
        //     $G.gCData.gIsVoiceRecordOrPlay = true ;
        // });
        // NTF.register( NOTIFY_VOICE_RECORD_CANCEL_ALERT , (event)=>{
        //     this._target._ui.showVoiceCancel();
        // });
        // NTF.register( NOTIFY_VOICE_RECORD_END , (event)=>{
        //     $G.gCData.gIsVoiceRecordOrPlay = false ;
        //     this._target._ui.hideVoice();

        //     if (!cc.sys.isNative) { return; }
        //     if( event.detail != '') ChatServer.sendVoice( event.detail );
        // });
        // NTF.register( NOTIFY_VOICE_RECORD_CANCEL , (event)=>{
        //     this._target._ui.hideVoice();
        //     $G.gCData.gIsVoiceRecordOrPlay = false ;
        // });
        // NTF.register( NOTIFY_VOICE_RECORD_TOOSHORT , (event)=>{
        //     this._target._ui.showVoiceCaution();
        // });
        // NTF.register( NOTIFY_VOICE_PLAY_START , (event)=>{
        //     $G.gCData.gIsVoiceRecordOrPlay = true ;
        // });
        // NTF.register( NOTIFY_VOICE_PLAY_END , (event)=>{
        //     $G.gCData.gIsVoiceRecordOrPlay = false ;
        // });

        

        // 聊天
        NTF.register( ACFG.ROOM_CHAT , (event)=>{ 
            let com = $G.gCData.gComPlayers[ GameMsgHandler.getCid( event.detail.seat ) ];
            com.showChat( true , event.detail.type , event.detail.content );
            
            if( event.detail.type === 2 ){
                let sexIsMan = GameMsgHandler.getUserBySid( event.detail.seat ).sex == 0 ;
                // AudioMgr_Hall.playChat( (event.detail.content-1) , sexIsMan );
            }

            if( event.detail.type === 4 ){
                let key = event.detail.content ;
                ChatServer.getVoice(  key , ( data )=>{
                    ChatHandler.addChatVoice( key , data );
                    // this._comVoicePlayer.playVoiceByData( data );
                });                
            }
        });


        /////////////////////////
        NTF.register( NOTIFY_GAME_IN , ()=>{
            /**
             * TODO:测试代码需要打苹果包测试，，目前安卓没问题
             */
            if( SocketHelper.isConnected() ){
            //     MsgHelper.pushLoading();
                GameHelper.autoLogin();
            }else{
            //     MsgHelper.pushLoading();
            //     MsgHelper.pushToast('no net no net')
                SocketHelper.disconnectSelf = false;
                pomelo.disconnect();
            }
            // MsgHelper.pushLoading();
            FuncHelper.addFunc(  MsgHelper.removeLoading , GameHelper.isLogined );
        });
        NTF.register( NOTIFY_GAME_OUT , ()=>{
            this._resetAll();
            SocketHelper.disconnect();
        });
        NTF.register( ACFG.RoundResult , ()=>{
            // PBHelper.addNode( 'DlgResult' );
            let bankerSid =GameMsgHandler.getBankerSid()  ;
            let baseScore = GameMsgHandler.getData().baseScore ;
            let scores = GameMsgHandler.getStateResult();
            let seats  = GameMsgHandler.getSeats();
            // List
            let once = true; // 用来标记庄家动画是否播放过
            
            let comGoldActionLayer = this._target._goldActionLayer;
            if( !comGoldActionLayer ) return ;
            _.each( seats , (seat,i)=>{
                let user = seat.user ;
                let isPlaying = user ? GameMsgHandler.isPlayerPlaying(user.id) : false ;
                if( user && isPlaying ){
                    // let item = [ user.nick , seat.hand.formation.cards , oxname , scores[i].score.change , (banker == i) , ( mySid == i ) ];
                    let getHeadPos = ( sid )=>{  
                        let ndHead          = $G.gCData.gComPlayers[ GameMsgHandler.getCid( sid ) ].ndHead ;
                        let worldPos        = ndHead.parent.convertToWorldSpaceAR( ndHead.getPosition() );
                        let convertPos      = this._target._ui.ndRoot.convertToNodeSpaceAR( worldPos );
                        return convertPos; 
                    } ;
                    if( GameMsgHandler.getBankerSid() != i ){
                        cc.log( '######123' ,scores , isPlaying , scores[i] , i )
                        if(scores[i].score.change < 0){
                            comGoldActionLayer.playerMoveBanker( Math.abs( scores[i].score.change ) / baseScore , getHeadPos( i ) , getHeadPos( bankerSid ) );
                            if( once ){
                                let time = comGoldActionLayer.playerToBankerTime + comGoldActionLayer.timeSum   ;
                                this._comScheduler2.once( 'showAnimation' ,  ()=>{
                                    $G.gCData.gComPlayers[ GameMsgHandler.getCid( bankerSid ) ].showAnimation();
                                },time);
                            }
                            once = false; 
                        }else{
                            comGoldActionLayer.bankerMovePlayer( Math.abs( scores[i].score.change ) / baseScore , getHeadPos( bankerSid ) , getHeadPos( i ) );
                        }
                    }
                }
            });
            let haveWin = _.find( seats , (seat,i)=>{ 
                let user = seat.user ;
                let isPlaying = user ? GameMsgHandler.isPlayerPlaying(user.id) : false ;
                if( user && isPlaying ){
                    if( GameMsgHandler.getBankerSid() != i ){
                         return scores[i].score.change > 0;
                    }
                }
            })
            let time = comGoldActionLayer.playerToBankerTime + comGoldActionLayer.timeSum   ;
            // Self Win
            let isPlaying = GameMsgHandler.isSelfPlaying() ;
            this._comScheduler2.once( 'updateRoundScore' ,  ()=>{
                if(isPlaying){
                    let isWin = scores[ GameMsgHandler.getSid(0) ].score.change >=0 ;
                    this._target._ui.showResultTitle(isWin);
                    if(scores[ GameMsgHandler.getSid(0) ].score.play > scores[ GameMsgHandler.getSid(0) ].score.result)this._target._ui.showMostWin();
                }
                this.updateRoundScore();
                // this._resetAll();
                // this._comScheduler2.clearAll();
            } , time * (haveWin ? 2 : 1)) ;
        });

        // 游戏开始倒计时
        NTF.register( ACFG.RoomStateTimerStart , ()=>{
            // TODO:
            this._target._ui.showCountDown( GameMsgHandler.getData().state.timer / 1000 , true );
        });

        // 游戏倒计时结束（ 认识不足无法开始 ）
        NTF.register( ACFG.RoomStateTimerStop , ()=>{
            // TODO:
            this._target._ui.showCountDown( 0 , false );
            if(GameMsgHandler.getData().type == 2)this._target._ui.showMatching();
        });

        // 玩家牛币变动
        NTF.register( ACFG.PlayerScore , ()=>{
            this.updateEvenyRound();
        });

        // 房间解散
        NTF.register( ACFG.DISMISS_ROOM , ()=>{
            GameLogic.leaveRoom( true ) ;
        });

         // 大结算
         NTF.register( ACFG.ROOM_RESULT , ()=>{
            this._target._ui.resultShow();
        });

        

        // 进入房间 - 平时不会触发，当在结算界面点击别人分享的微信链接回到游戏时，会触发
        NTF.register( ACFG.PLAYER_ENTER_ROOM , ()=>{
            // CLEAR
            this._comScheduler2.clearAll();
            this._resetAll();

            // INIT
            this.initRoomInfo();
            this.initDealer();
            this.updatePlayers();
            this.updateSelfBtns();
            this.jumpRoomState( GameMsgHandler.getRoomStateType() );

            // Show cards
            this.updateCardsAll();

            // REMOVE DLG
            let dlg = this._target.node.getChildByTag(9999);
            if( dlg ) dlg.destroy();
        });

        // LEAVE_ROOM
        NTF.register( ACFG.LEAVE_ROOM , (event)=>{ 
            
            if( Constants.ClearReason.REQUEST() != event.detail ){
                GameLogic.leaveRoom();
            }
            this._comScheduler2.clearAll();
            this._resetAll();
        });


        // 房间状态切换
        NTF.register( ACFG.ROOM_CHANGE_STATE , ()=>this.updateRoomState() );


        // Round
        NTF.register( ACFG.ROUND_BEGIN , ()=>{
            // this._target._ui.lbGameTurn.string = GameMsgHandler.getRoundInfo();
            this.gameStart = 1;
            let round = GameMsgHandler.getData().state.round
            this._target._ui.showRoundString(round);
            this._target._ui.showCountDown( 0 , false );
            // this._target._ui.showArmGameStart( true );
            // this._target._ui.showDealerSpeak( GameMsgHandler.getData().area ? GameMsgHandler.getData().area : 0 );
        });
        

        // 掉线
        NTF.register( ACFG.PLAYER_HOST       , (event)=>{
            $G.gCData.gComPlayers[GameMsgHandler.getCid(event.detail.seat)].showMiss( event.detail.hosting ) ;
        });

        // 玩家加入、玩家退出
        NTF.register( ACFG.ADD_PLAYER        , (event)=>{ 
            if(event.detail.user.id == UserHandler.getId() && GameMsgHandler.getRoomStateType() == 1){
                GameMsgHandler.resetData();
                this.jumpRoomState(GameMsgHandler.getRoomStateType());
            }else{
                this.updatePlayer( GameMsgHandler.getCid(event.detail.index) )     
            }
        } );
        NTF.register( ACFG.REMOVE_PLAYER     , (event)=>{ this.updatePlayer( GameMsgHandler.getCid(event.detail) )} );

        // 准备、叫庄、下注
        NTF.register( ACFG.PLAYER_READY      , (event)=>{ this.updatePlayerState( GameMsgHandler.getCid(event.detail.seat) )} );
        NTF.register( ACFG.PLAYER_BANKER     , (event)=>{ this.updatePlayerState( GameMsgHandler.getCid(event.detail.seat) )} );
        NTF.register( ACFG.PLAYER_BID        , (event)=>{ this.updatePlayerState( GameMsgHandler.getCid(event.detail.seat) )} );
        
        // 系统决定庄家
        NTF.register( ACFG.ROOM_BANKER       , (event)=>{ 
            // AudioMgr_Game.playSpecial('banker');
            if(event.detail == null){

            }else{
                this._comRandomBanker.enableBankerAction(true);
            }
        });

        // 开始解散房间
        NTF.register( ACFG.DISMISS_START       , (event)=>{ 
            cc.log("【开始解散房间】")
            this._target._ui.ndDisRoom.active = true;
            // AudioMgr_Game.playSpecial('banker');
            // if(event.detail == null){

            // }else{
            //     this._comRandomBanker.enableBankerAction(true);
            // }
        });

        NTF.register( ACFG.DISMISS_STOP , ()=>{ 
            // if( RoomHistoryHandler.isRecording() ) return ;
            // MsgHelper.pushToast( $G.gStrings.Error.dismissStop );
            this._target._ui.ndDisRoom.active = false;
        } );

        // 解散的玩家的状态
        NTF.register( ACFG.DISMISS_VOTE       , (event)=>{ 
            cc.log("【解散房间玩家的状态】")
            // AudioMgr_Game.playSpecial('banker');
            // if(event.detail == null){

            // }else{
            //     this._comRandomBanker.enableBankerAction(true);
            // }
        });
        
        // 玩家的手牌
        NTF.register( ACFG.PLAYER_ADD_CARDS  , (event)=>{ 
            let cards = event.detail ;

            // 显示手牌
            let time  = 0.125 ;
            let start = this._startAniTime ;
            let comCards = [];
            let delay    = 0;
            let showAction = GameMsgHandler.getRoomStateType() === 2 || GameMsgHandler.getRoomStateType() === 5 ;
            // let showAction = true ;
            _.each( cards , (card,i)=>{
                delay = ( time * ( i + 1 )) + start ;
                this._comScheduler.once( 'AddCards' ,  ()=>{
                    AudioMgr_Game.playSpecial('dispatch');
                    comCards.push( $G.gCData.gComPlayers[ 0 ].addCard( 1 , card , !showAction , false ));
                    _.each( GameMsgHandler.getSeats() , (seat,index)=>{
                        let cid = GameMsgHandler.getCid( index );
                        if( cid > 0 && seat && seat.user){
                            let isPlaying = GameMsgHandler.isPlayerPlaying( seat.user.id );
                            if( isPlaying ){
                                $G.gCData.gComPlayers[ cid ].addCard( 1 , card , false );
                            }
                        }
                    });
                } , delay);
            });
            if( showAction ){
                delay += ( time * comCards.length ) ;
                this._comScheduler.once( 'FlipCards' , ()=>{ _.each( comCards , (card)=>{
                    if(comCards.length == 1 && GameMsgHandler.canRubCard()) {

                    }else{
                        card.showCardFrontWithFlipAction()
                    }
                    }) 
                } , delay );
            }
            delay += 1 ;  

            if(GameMsgHandler.getCardsByCid(0).length == 4 || !GameMsgHandler.canRubCard()) this._comScheduler.once( 'ChooseCards' , ()=>{ this.updateCardsChoosed(); } , delay );
           
        });

        // 摆牛完成
        NTF.register( ACFG.PLAYER_PLAY          , (event)=>{ 
            let com = $G.gCData.gComPlayers[ GameMsgHandler.getCid( event.detail.seat ) ];
            com.moveCardsToShowArea();
            com.showOxResult(-1);
            let count = 5 ;
            
            let cards = [];
            _.times( count , ()=>{
                cards.push( {point:1,suit:1} );
            });
            com.removeCards( 1 );
            com.removeCards( 2 );
            //  用于解决，亮牌瞬间断线续玩动画延迟等问题
            if(GameMsgHandler.getCid( event.detail.seat ) == 0){
                this._comScheduler.clear('FlipCards');
                this._comScheduler.clear('AddCards');
                this._comScheduler.clear('showBanker');
                this._comScheduler.clear('_bankerAction');
                // this.showBanker( GameMsgHandler.getCid( GameMsgHandler.getBankerSid() ) );
            }
            com.addCards( 2 , cards , false );
            this.updateSelfBtns();

            // @ temp remove
            // let ndRubCard = cc.find( 'ndRubCard' , cc.director.getScene().getChildByName('Canvas') )
            // if(ndRubCard && GameMsgHandler.getCid( event.detail.seat ) == 0){
            //     ndRubCard.removeFromParent();
            //     ndRubCard.destroy();
            // }
        });

        // 展示手牌
        NTF.register( ACFG.PLAYER_SHOW_HAND     , (event)=>{
            this._target._ui.showClock(false);

            let formations = event.detail;

            let sids   = [];
            _.times( 9 , (i)=>{  sids[i]=i; }) ;
            let banker = GameMsgHandler.getBankerSid();
            cc.log( 'banker:' + banker );
            let cursid = banker ;
            _.each( sids , (sid,index)=>{
                cursid += 1 ;
                if( cursid >= _.size(sids) ){
                    cursid = 0 ;
                } 
                sids[index] = cursid ;
            });
            cc.log( sids );

            let delay = 0.05 ;
            _.each( sids , ( sid )=>{
                let formation = formations[sid] ;
                if( formation ){
                    this._comScheduler.once( 'ShowCards' ,  ()=>{
                        let com = $G.gCData.gComPlayers[ GameMsgHandler.getCid( sid ) ];
                        com.removeCards( 1 );
                        com.removeCards( 2 );
                        com.addCards( 2 , formation.cards , true );
                        let index = this._target._logic.getIndex( formation.type , formation.value );
                        com.showOxResult( index ); // 0.2 s

                        let sexIsMan = GameMsgHandler.getUserBySid( sid ).sex == 0 ;
                        AudioMgr_Game.playPokerType( index , sexIsMan );
                    } , delay );
                    delay += 0.4 ;
                }
            });
        });
        
        // 自己在旁观 -> 展示卡背
        NTF.register( ACFG.PLAYER_SHOW_CARDS   , (event)=>{ 
            let isSelfPlaying = GameMsgHandler.isSelfPlaying();
            if( isSelfPlaying ) return ;

            let sid   = event.detail.seat ;
            let count = event.detail.cards ;
            count = count == 1 ? 5 : count ;

            let cards = [];
            _.times( count , ()=>{
                cards.push( {point:1,suit:1} );
            });
            let com = $G.gCData.gComPlayers[ GameMsgHandler.getCid( sid ) ];
            com.removeCards( 1 );
            com.addCards( 1 , cards , false );
        });

        

        // 魔窗
        NTF.register( NOTIFY_MAGIC_WINDOW , (event)=>{ 
            FuncHelper.addFunc( MWHelper.checkAndExecute , GameHelper.isLogined );
        });

    },


    /**
     * initRoomInfo
     */
    initRoomInfo : function(){
        let infos = GameMsgHandler.getRoomInfos();
        this._target._ui.showRoomInfo( infos );
        // this._target._ui.lbRoomType.string =  GameMsgHandler.getData().type == 2 ? '房型：' + $G.gStrings.Room.names[ GameMsgHandler.getData().area - 1 ] : '房号：' + GameMsgHandler.getData().id ;
        // this._target._ui.lbScoreMin.string =  '准入：' + StringHelper.getValueChinese( GameMsgHandler.getData().scoreMin );
        // this._target._ui.ndBtnChangeTable.active = GameMsgHandler.getData().type == 2 ;
        this._target._ui.ndBtnCopyRoomId.active  = GameMsgHandler.getData().type == 3 ;
    },

     /**
     * initDealer
     */
    initDealer : function (){
        if( GameMsgHandler.getData().type == 2 ){
            // this._target._ui.showDealer( GameMsgHandler.getData().area );
        }else if( GameMsgHandler.getData().type == 3 ){
            // this._target._ui.showDealer(0);
        }
        
    },

    /***
     * initPlayers : 第一次进入房间时初始化界面，房间里可能有1-N个人
     */
    initPlayers : function(){
        let maxRight = parseInt( this._playersNumMax / 2 );
        _.times( this._playersNumMax , function( cid ){
            let node = ( cid == 0 ) ? cc.instantiate( this._target._ui.pbActorSelf ) : cc.instantiate( this._target._ui.pbActorLeft ) ;
            node.active = false ;
            let com = node.getComponent('PbPlayer_NN');
            com.init( cid );
            if( cid >= 1 && cid <= maxRight ){
                com.setRightMode();
            }
            $G.gCData.gComPlayers[ cid ] = com ;
            let name = '' + cid ;
            this._target._ui.ndActorPosContainer.getChildByName(name).addChild( node );
        } , this );
    },



    /**
     * updateRoomInfo 
     */
    updateEvenyRound : function(){
        // Round
        // this._target._ui.lbGameTurn.string = GameMsgHandler.getRoundInfo();

        // score
        let seats = GameMsgHandler.getSeats();
        _.each( seats , ( seat , index ) =>{
            let user = GameMsgHandler.getUserBySid( index );
            if( user ){
                let com = $G.gCData.gComPlayers[ GameMsgHandler.getCid(index) ];
                com.showScore( user.score );
            }
        });

        //battery
        // this._target._ui.pbarBattery.progress = PlatformHelper.getBattery() / 100 ;
    },


    /**
     * updatePlayers
    */
    updatePlayers : function(){
        let seats = GameMsgHandler.getSeats();
        _.each( seats , ( seat , index ) =>{
            this.updatePlayer( index )
        });
        //banker
        let banker = GameMsgHandler.getData().state.banker ;
        if(( GameMsgHandler.getData().bankerMode == 3 )                                       ||
           ( GameMsgHandler.getData().bankerMode == 2 && GameMsgHandler.getCurrentRound() > 1 )  ||
           ( GameMsgHandler.getData().bankerMode == 1 && GameMsgHandler.getRoomStateType() == 4) ){
            if( banker != null ){
                let bankerCid = GameMsgHandler.getCid( banker );
                this.showBanker( bankerCid );
            }
        }
        
        this.updateCardsAll();
    },


    /**
     * updatePlayer
     */
     updatePlayer : function( cid = 0 ){
        cc.log("updatePlayer " + cid );
        let user = GameMsgHandler.getUserByCid( cid );
        let com  = $G.gCData.gComPlayers[ cid ] ;
        if( !user ){
            com.node.active = false ;
            com.resetAll();
            return ;
        }
        com.node.active = true ;
        com.showName( user.nick );
        com.showScore( user.score ? user.score : 0 );
        com.showMiss( GameMsgHandler.getSeatByCid(cid).hosting );
        com.showHead( user.head );
        if(GameMsgHandler.getCurrentRound() <= 1){
            com.showReady( GameMsgHandler.getSeatByCid(cid).ready );
        }
        this.updatePlayerState( cid );


        // Debug - 显示全部玩家的UI
        // let com  = $G.gCData.gComPlayers[ cid ] ;
        // com.node.active = true ;
        // com.showReady(true);
        // com.addCards( 1 ,[{point:1},{point:1},{point:1},{point:1},{point:1}]);
        // com.addCards( 2 ,[{point:1},{point:1},{point:1},{point:1},{point:1}]);
     },

     /**
      * ShowBanker - 唯一性
      */
      showBanker : function( index ){
        this.bankerActionOver = true ;

        AudioMgr_Game.playSpecial('banker');

        this._comFunc.execute();
        
        _.each( $G.gCData.gComPlayers , (com,cid)=>{
            // if( GameMsgHandler.isPlayerPlaying( GameMsgHandler.getSid( cid ))){
                com.showBanker( index == cid );
            // }
        })

        if( GameMsgHandler.getSeatStateByCid( 0 , 'bid') === null ){
            if( GameMsgHandler.getRoomState().banker != GameMsgHandler.getSid(0) ){
                // 自己没有抢庄并且不是庄家 
                if(GameMsgHandler.isSelfPlaying())this._target._ui.showPlayerButton( 'bet' );
            }
        }

        let actionTime = 0 ;
        let BankerList =  this._comRandomBanker.getBankerList();
        if(this._comRandomBanker.couldShowBankerAction && BankerList != null){
            actionTime = _.last( this._comRandomBanker.getTimeList() );
        }
        this._target._ui.showClock( true , GameMsgHandler.getRoomState().time / 1000 - actionTime);

      },
      _bankerAction(first,last){
        AudioMgr_Game.playSpecial('bankerRandom');
        if(first != null)$G.gCData.gComPlayers[ GameMsgHandler.getCid( first ) ].hideBankerAction();
        if(last != null)$G.gCData.gComPlayers[ GameMsgHandler.getCid( last ) ].showBankerAction();
      },

      /**
       * jumpRoomState
       */
      jumpRoomState : function( state ){    
        for( let i = 0 ; i <= state ; i++ ){
            this.updateRoomState( i );
        }
      },

      /**
       * updateRoomState
       */
       updateRoomState : function( state = null ){
            //  RoomState = 'default' : 0 , 'WAIT': 1, 'FIRST_DEAL': 2, 'BANKER': 3,  'BID': 4, 'SECOND_DEAL': 5, 'PLAY': 6 , 'RESULT': 7
            state = state != null ? state : GameMsgHandler.getRoomStateType() ;
            cc.log( '@@@ updateRoomState :' + state );
            switch( state ){
                case 0 : 
                    break;
                case 1 :
                    this._target._ui.showRoundString();
                    this._resetAll();
                    this.updatePlayers();
                    this.updateEvenyRound(); 
                    this._target.node.removeChildByTag(9999);
                    this._target._ui.showClock(false);
                    this._target._ui.showCountDown( GameMsgHandler.getData().state.timer ? GameMsgHandler.getData().state.timer / 1000 : 0 , true );
                    if(GameMsgHandler.getData().type == 2 && !GameMsgHandler.getData().playing && !GameMsgHandler.getData().state.timer)this._target._ui.showMatching();
                    break;
                case 2 :
                    if( GameMsgHandler.getRoomStateType() === 2 ){
                        AudioMgr_Game.playSpecial('start');
                        // this._target._ui.showCountDown( 0 , false );
                        // this._target._ui.showArmGameStart( true );
                    }
                    // 固定庄模式/轮庄模式直接显示庄家
                    if(( GameMsgHandler.getData().bankerMode == 3 )||( GameMsgHandler.getData().bankerMode == 2 && GameMsgHandler.getCurrentRound() >= 1 )  ){
                        let banker = GameMsgHandler.getData().state.banker ;
                        if( banker != null ) $G.gCData.gComPlayers[ GameMsgHandler.getCid( banker )].showBanker( true ); 
                        // this.showBanker( banker );
                    }
                    this.clearAllPlayersState();
                    break;
                case 3 :
                    this._target._ui.showClock( true , GameMsgHandler.getRoomState().time / 1000 );
                    break;
                case 4 :
                    this.clearAllPlayersState();
                    this._target._ui.showClock(false);
                    if(( GameMsgHandler.getData().bankerMode == 3 )||( GameMsgHandler.getData().bankerMode == 2 && GameMsgHandler.getCurrentRound() >= 1 )  ){
                        this._target._ui.showClock( true , GameMsgHandler.getRoomState().time / 1000);
                    }
                    if( GameMsgHandler.getData().bankerMode == 1 ){
                        let BankerList =  this._comRandomBanker.getBankerList();
                        if( BankerList != null && this._comRandomBanker.couldShowBankerAction ){
                            this.bankerActionOver = false ;
                            let TimeList = this._comRandomBanker.getTimeList();
                            _.each(BankerList , (banker,index)=>{
                                if(index > 0){
                                    this._comScheduler.once("_bankerAction",()=>{this._bankerAction(BankerList[index - 1],banker);},TimeList[index] );
                                }else{
                                    this._comScheduler.once("_bankerAction",()=>{this._bankerAction(null,banker);},TimeList[index] );
                                }
                                if(index== _.size(BankerList) -1){
                                    // this.scheduleOnce(()=>this.showBanker( GameMsgHandler.getCid( GameMsgHandler.getBankerSid() ) ),TimeList[index]);
                                    this._comScheduler.once("showBanker",()=>this.showBanker( GameMsgHandler.getCid( GameMsgHandler.getBankerSid() ) ),TimeList[index]);
                                }
                            });
                        }else{
                            this.showBanker( GameMsgHandler.getCid( GameMsgHandler.getBankerSid() ) );
                        }
                    }
                    break;
                case 5 :
                    this._target._ui.showClock( false );
                    break;
                case 6 :
                    this._target._ui.showClock( true , GameMsgHandler.getRoomState().time / 1000 );
                    this.updateOxAutoBtnText();
                    break;
                case 7 :
                    // PBHelper.addNode( 'DlgResult' );
                    // this._resetAll();
                    break;
            }

            // 从前面移到了末尾，因为 bankerActionOver 字段会影响selfBtn
            this.updateSelfBtns();
        },

       /**
        * _resetAll
        */
        _resetAll : function(){
            this._target._ui.showCountDown( 0 , false );
            this.bankerActionOver = true ;
            this._comRandomBanker.reset();
            this._comScheduler.clearAll();
            _.each( $G.gCData.gComPlayers , (com)=>{
                com.resetPart();
            });
            this._target._ui.showClock( false );
            this.clearAllPlayersState();
            // this.updateEvenyRound(); 
            this._comFunc.clear();
        },

       /**
        * updatePlayerState : cid
        */
        updatePlayerState : function( cid ){
            let seat  = GameMsgHandler.getSeatByCid(cid);
            let currentState = GameMsgHandler.getRoomStateType();
            let com  = $G.gCData.gComPlayers[cid];
            cc.log("【不存在cid】",$G.gCData.gComPlayers)
            cc.log("【根据取出来的$G.gCData.gComPlayers】",com)
            let isPlaying = seat.user ? GameMsgHandler.isPlayerPlaying( seat.user.id ) : false;
            let info = "@ cid : " + cid + " ready : " + seat.ready + "  bid: "+ seat.bid ;
            if(!seat.user) return ;
            cc.log( info );
            // 'default' : 0 , 'WAIT': 1, 'FIRST_DEAL': 2, 'BANKER': 3,  'BID': 4, 'SECOND_DEAL': 5, 'PLAY': 6 , 'RESULT': 7
            switch( currentState ){
                case 0 : 
                    break;
                case 1 :
                    if(GameMsgHandler.getCurrentRound() <= 1){
                        com.showReady( seat.ready );   
                    }
                    break;
                case 2 :
                    break;
                case 3 :       
                    if(isPlaying){
                        com.showRob( seat.banker );
                    }else{
                        com.showState(null,false);
                    }
                    AudioMgr_Game.playRob( seat.banker , ( seat.user.sex == 0 ) );
                    break;
                case 4 :
                    this._comFunc.addFunc( ()=>{
                        com.showState( null );
                        let bid = seat.bid
                        if(!isPlaying)bid = null
                        com.showCallScore( bid );
                        AudioMgr_Game.playScore( seat.bid , seat.user.sex == 0 );
                    },()=>{
                        return this.bankerActionOver ;
                    });
                    break;
                case 5 :
                    break;
                case 6 :
                    let bid = seat.bid
                    if(!isPlaying)bid = null
                    com.showCallScore( bid );
                    break;
                case 7 :
                    com.showState( null );
                    break;
            }
            this.updateSelfBtns();
        },

        updateSelfBtns : function(){
            this._target._ui.showPlayerButton( null );
            this.updateSitBtn();
            let state = GameMsgHandler.getRoomStateType() ;
            if( state > 1 ) this._target._ui.showInviteBtns(false);

            if( !GameMsgHandler.isSelfPlaying() ) return ;

            switch( state ){
                case 0 : 
                    break;
                case 1 :
                    if( GameMsgHandler.getSeatStateByCid( 0 , 'ready') === false ){
                        this._target._ui.showPlayerButton( 'wait' );
                    }
                    break;
                case 2 :
                    this._target._ui.showInviteBtns(false);
                    break;
                case 3 :
                    if( GameMsgHandler.getSeatStateByCid( 0 , 'banker') === null ){
                        this._target._ui.showPlayerButton( 'rob' );
                    }
                    break;
                case 4 :
                    // 防止抢庄模式的抢庄动画中显示123分按钮
                    if( !this.bankerActionOver ) return ;
                    if( ( GameMsgHandler.getData().bankerMode == 3 )
                        || ( GameMsgHandler.getData().bankerMode == 2 && GameMsgHandler.getCurrentRound() >= 1 ) 
                        || ( GameMsgHandler.getData().bankerMode == 1 && GameMsgHandler.getRoomStateType() == 4 )){
                        if( GameMsgHandler.getSeatStateByCid( 0 , 'bid') === null ){
                            if( GameMsgHandler.getRoomState().banker != GameMsgHandler.getSid(0) ){
                                // 自己没有抢庄并且不是庄家 
                                this._target._ui.showPlayerButton( 'bet' );
                            }
                        }
                    }
                    break;
                case 5 :
                    break;
                case 6 :
                    // if( GameMsgHandler.getCardTypeByCid( 0 ) === null ){
                    if( GameMsgHandler.getSeatStateByCid( 0 , 'played' ) === false ){
                        this._target._ui.showPlayerButton( 'showOx' );
                    }
                    break;
                case 7 :
                    break;
            }
        },

        updateSitBtn : function(){
            this._target._ui.showSitBtn(GameMsgHandler.couldSit());
        },

        clearAllPlayersState : function(){
            _.each( $G.gCData.gComPlayers , (com)=>{
                com.showState( null,false );
            });
        },

        updateOxAutoBtnText : function(){
            if( !GameMsgHandler.isSelfPlaying() ) return ;
            let oxType  = this._target._logic.getOxType( GameMsgHandler.getCardsByCid(0) );
            // let oxIndex = this._target._logic.getIndex( oxType)
            let oxName  = this._target._logic.getOXNameByType(oxType) ;
            this._target._ui.setOxAutoText( oxType >= 3 ? oxName : '有牛' );
        },

        handlerBtnPlay : function( param = 'hasOx' ){
            if( !GameMsgHandler.isSelfPlaying() ) return ;
            let oxType = this._target._logic.getOxType( GameMsgHandler.getCardsByCid(0) );
            if( param === 'hasOx' && oxType === 0 ){
                MsgHelper.pushToast('您没有牛哦');
                return ;
            } 
            if( param === 'noOx' && oxType > 0 ){
                MsgHelper.pushToast('您有牛哦');
                return ;
            } 
            GameMsgServer.finish();
        },

        updateCardsChoosed : function(){
            if( !GameMsgHandler.isSelfPlaying() ) return ;
           let three = this._target._logic.getThree( GameMsgHandler.getCardsByCid(0) );
           if( !three ) return ;

           $G.gCData.gComPlayers[ 0 ].chooseCards(three);
        },
        
        updateRoundScore : function () {
            let bankerSid =GameMsgHandler.getBankerSid()  ;
            let scores = GameMsgHandler.getStateResult();
            let seats  = GameMsgHandler.getSeats();
            _.each( seats , (seat,sid)=>{
                let user = seat.user ;
                if( !user ) return ;
                let isPlaying = GameMsgHandler.isPlayerPlaying(user.id) ;
                if( user && isPlaying ){
                    if(!scores) return ;
                    $G.gCData.gComPlayers[ GameMsgHandler.getCid( sid ) ].updateRoundScore(scores[sid].score.change , this.updateEvenyRound );
                    if( scores[sid].score.change > 0  && bankerSid != sid )$G.gCData.gComPlayers[ GameMsgHandler.getCid( sid ) ].showAnimation();
                }
            })
        },

        // played false ： 表示肯定是手牌 ； played true && ！showed 已出牌，暗牌；, showed 明牌
        updateCardsAll : function(){
            cc.log( "@@@@ addCards " );

            _.each( GameMsgHandler.getSeats() , (seat,sid)=>{ 
                if( !seat || !seat.user ) return ;
                let isPlaying = GameMsgHandler.isPlayerPlaying( seat.user.id );
                if( !isPlaying ) return ;
  
                cc.log( 'updateCardsAll :' + sid );
                let cid    = GameMsgHandler.getCid( sid );
                let played = GameMsgHandler.getSeatStateBySid( sid , 'played' );
                let showed = GameMsgHandler.getSeatStateBySid( sid , 'showed' ); 
                if( GameMsgHandler.isPlayerShowHandOver() )showed = true;

                $G.gCData.gComPlayers[ cid ].removeCards(1);
                $G.gCData.gComPlayers[ cid ].removeCards(2);

                // RoomState = 'default' : 0 , 'WAIT': 1, 'BANKER': 3, 'FIRST_DEAL': 2, 'BID': 4, 'SECOND_DEAL': 5, 'PLAY': 6 , 'RESULT': 7
                let state = GameMsgHandler.getRoomStateType();
                if( state <= 1 ){
                    return;
                }

                if( !played ){
                    // 手牌阶段
                    cc.log("@@@@ 手牌阶段")
                    
                    // if( !GameMsgHandler.isSelfPlaying() ) return ;
                    // let cards  = GameMsgHandler.getCardsByCid(0);
                    // if( !GameMsgHandler.isSelfPlaying() ){
                    //     if( cards < GameMsgHandler.getCardsByCid( cid ) ) 
                    //         cards = GameMsgHandler.getCardsByCid( cid ) ;
                    // }
                    let cards  = GameMsgHandler.getCardsByCid( cid )
                    if( cards == 4 || cards == 5 ){
                        let temparr = [];
                        _.times(cards , ()=>{
                            temparr.push({suit : 0 , point : 0});
                        })
                        cards = temparr;
                        $G.gCData.gComPlayers[ cid ].addCards( 1 , cards , false , false ) ;
                    }else{
                        if( !cards ||(  _.size(cards) == 0)) return;
                        if( cid == 0 ){
                            $G.gCData.gComPlayers[ 0 ].addCards( 1 , cards , true , false );
                            this.updateCardsChoosed();
                        }else{
                            $G.gCData.gComPlayers[ cid ].addCards( 1 , cards , false , false ) ;
                        }
                    }
                    
                }else if ( played && !showed ){
                    // 摆牛完成阶段
                    cc.log("@@@@ 摆牛完成阶段")
                    // if( !GameMsgHandler.isSelfPlaying() ) return ;
                    // let cards  = GameMsgHandler.getCardsByCid(0);
                    // if( !GameMsgHandler.isSelfPlaying() ){
                    //     if( cards < GameMsgHandler.getCardsByCid( cid ) ) cards = GameMsgHandler.getCardsByCid( cid );
                    // }
                    let cards  = GameMsgHandler.getCardsByCid( cid )
                    if( cards == 4 || cards == 5){
                        let temparr = [];
                        _.times(cards , ()=>{
                            temparr.push({suit : 0 , point : 0});
                        })
                        cards = temparr;
                    }else{
                        if( !cards || _.size(cards) == 0 ) return ;
                    }
                    let com = $G.gCData.gComPlayers[ cid ];
                    com.addCards( 2 , cards , false , false );
                    com.showOxResult(-1);
                }else if ( showed ){
                    // 展示牛牛结果阶段
                    cc.log("@@@@ 展示牛牛结果阶段")
                    let cards  = GameMsgHandler.getCardsByCid(cid);
                    let formation = GameMsgHandler.getCardTypeByCid(cid);
                    cards = formation.cards;
                    if( !cards || _.size(cards) == 0 ) return ;
                    let com = $G.gCData.gComPlayers[ cid ];
                    com.removeCards( 2 );
                    com.addCards( 2 , cards , true );
                    let index = this._target._logic.getIndex( formation.type , formation.value );
                    com.showOxResult( index );
                }
            });
        },

        changeTable : function(){
            if( !this.funcChangeTable ){
                this.funcChangeTable = _.throttle(()=>{
                    RoomServer.leaveRoom(()=>{
                        RoomServer.match(GameMsgHandler.getArea());
                    });
                }, 1500 , {trailing: false} ) ;
            }
            this.funcChangeTable();
        },












// /**
//  * << onEnterState >> 
//  * 
//  * RoomState = 'default' : 0 , 'WAIT': 1, 'BANKER': 2, 'FIRST_DEAL': 3, 'BID': 4, 'SECOND_DEAL': 5, 'PLAY': 6 , 'RESULT': 7
//  */
// logic.onEnterState = function( state ){        
//     cc.log('enter state :' + state );        
//     switch( state ){
//         case 0 : 
//             break;
//         case 1 :
//             break;
//         case 2 :
//             break;
//         case 3 :
//             break;
//         case 4 :
//             break;
//         case 5 :
//             break;
//         case 6 :
//     }
// }


});