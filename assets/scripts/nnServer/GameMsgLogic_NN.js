/**
 * exports
 */
var handler  = module.exports;

/***
 * onHandleMsg_Data
 */
handler.onHandleMsg_Data = function( action ){
    let OnAction = ServerRouters.OnAction_FKNN ;
    let name = action.name ;


    cc.log( '@FKNN :【 ' + name + '】' + TimeHelper.getCTime() );
    cc.log( action.msg ) ;

    /**
     * << ENTER_ROOM >> 
     * 
     * rounds: 10, timesMode: 1, bankerMode: 1, id: 724535, owner :1,state{played,banker,result,round,type}
     * seats: [ hand , index , hosting ,
     *          state{ banker,bid,nnTimes,noTimes,payAllTimes,ready,result,takeAllTimes,winTimes , formation(自行维护) }, 
     *          user{ gold,head,id,ip,nick} ]  
     * 
     */
    if( name === OnAction.PLAYER_ENTER_ROOM ){
        GameMsgHandler.setData( action.msg );
        $G.gCData.gRoomLeaved = false ;
        return ;        
    }

    

    /**
     * << LEAVE_ROOM >> 
     * reason：1房间未开始时离开房间，2强制解散房间，3正常牌局结算和投票解散房间
     */
    if( name === OnAction.LEAVE_ROOM ){
        UserHandler.getData()['room'] = null ;
        // ChatHandler.clearMessages();
        $G.gCData.gRoomLeaved = true ;

        if( action.msg == 7 ){
            
        }
        return;
    }

    /**
     * << DISMISS_ROOM >>
     */
    if( name === OnAction.DISMISS_ROOM ){
        UserHandler.getData()['room'] = null ;
        $G.gCData.gRoomLeaved = true ;
        return;
    }

    // if( name === OnAction.DISMISS_ROOM ){
    //     UserHandler.getData()['room'] = null ;
    //     $G.gCData.gRoomLeaved = true ;
    //     return;
    // }
    

    /**
     * << CHANGE_ROOM >> 
     * 
     */
    if( name === OnAction.CHANGE_ROOM ){
        // GameDataHandler.leaveRoom();
        return;
    }

    
    /***
     * << ROOM_CHANGE_STATE >>
     * 
     * 'default' : 0 , 'WAIT': 1, 'FIRST_DEAL': 2, 'BANKER': 3, 'BID': 4, 'SECOND_DEAL': 5, 'PLAY': 6 , 'RESULT': 7
     * 
     * {round: 1, type: 2, banker: 1, result: null , time : 1000 }
     * {round: 1, type: 3, banker: 1, result: null}
     * {round: 1, type: 4, banker: 1, result: null}
     * {round: 1, type: 5, banker: 1, result: null}
     * {round: 1, type: 7, banker: 1, result: null}
     * {round: 2, type: 1, banker: 1, result: { seats[ 1 , -1 , 2 , -2] }}}
     */
    if( name === OnAction.ROOM_CHANGE_STATE ){
        GameMsgHandler.setRoomState( action.msg );

        let type = action.msg.type ;

        switch( type ){
            case 1 :
                // 由 ENTER_ROOM 里面一起发了 或者 单局结束后下一局发
                GameMsgHandler.resetData();
                break;
            case 2 :
                break;
            case 3 :
                break;
            case 4 :
                break;
            case 5 :
                break;
            case 6 :
                break;
            case 7 :
                // _.each( action.msg.result.seats , (score,sid)=>{
                //     if( score == null ) return ;
                //     let user = GameMsgHandler.getUserBySid( sid );
                //     if(user){
                //         user.gold += parseFloat(score) ;
                //         // user.gold = user.gold.toFixed(3) ;
                //     } 
                // });
                break;
        }
        return;
    }

    /**
     * << RoomStateTimerStart >>
     * 
     * {seat: 0, hosting: true}
     */
    if( name === OnAction.RoomStateTimerStart ){
        GameMsgHandler.getData().state.timer = action.msg ;
        return;
    }

    /**
     * << RoomStateTimerStop >>
     * 
     * {seat: 0, hosting: true}
     */
    if( name === OnAction.RoomStateTimerStop ){
        GameMsgHandler.getData().state.timer = action.msg ;
        return;
    }

    /**
     * << PLAYER_HOST >>
     * 
     * {seat: 0, hosting: true}
     */
    if( name === OnAction.PLAYER_HOST ){
        GameMsgHandler.getSeatBySid( action.msg.seat ).hosting = action.msg.hosting ;
        return;
    }

    /**
     * << ADD_PLAYER >> 
     * 
     * {index: 2, hand: null, state: Object, user: Object, hosting: false}
     */
    if( name === OnAction.ADD_PLAYER ){
        GameMsgHandler.setSeatBySid( action.msg.index , action.msg );
        // GameMsgHandler.updateSeatIds(); //debug
        return;
    }

    /**
     * << REMOVE_PLAYER >> 
     * 
     * 0
     */
    if( name === OnAction.REMOVE_PLAYER ){
        GameMsgHandler.setUserBySid( action.msg , null );
        return;
    }

    /**
     * << PLAYER_READY >> 
     * 
     * Object {seat: 0, ready: true}
     * 
     */
    if( name === OnAction.PLAYER_READY ){
        GameMsgHandler.setSeatStateBySid( action.msg.seat , 'ready' , action.msg.ready );
        return;
    }

    /**
     * << PLAYER_BANKER >> 
     * 
     * PLAYER_BANKER设置 seat.state.banker
     * 
     * seat: 0, banker: 0/1 , 普通模式：null/0/1/2/3
     */
    if( name === OnAction.PLAYER_BANKER ){
        GameMsgHandler.setSeatStateBySid( action.msg.seat , 'banker' , action.msg.banker );
        return;
    }

    /**
     * << ROOM_BANKER >> 
     * 
     * ROOM_BANKER 设置的是 room.state.banker的
     * 0
     */
    if( name === OnAction.ROOM_BANKER ){
        GameMsgHandler.getData().state.banker = action.msg ;
        return;
    }

    /**
     * << PLAYER_BID >> 
     * 
     * seat: 1, bid: 1
     */
    if( name === OnAction.PLAYER_BID ){
        GameMsgHandler.setSeatStateBySid( action.msg.seat , 'bid' , action.msg.bid );
        return;
    }


    /**
     * << PLAYER_ADD_CARDS >> 
     * 
     * [ card , card, card, card] or [card]
     */
    if( name === OnAction.PLAYER_ADD_CARDS ){
        GameMsgHandler.pushCardsBySid( GameMsgHandler.getSid(0) , action.msg );
        return;
    }

    /**
     * << PLAYER_PLAY >> 
     * 
     * {seat: 0, played}
     */
    if( name === OnAction.PLAYER_PLAY ){
        GameMsgHandler.setSeatStateBySid( action.msg.seat , 'played' , action.msg.played );
        return;
    }

    /**
     * << PLAYER_SHOW_HAND >>
     * 
     * [ formation: { type ,value,cards },{ type ,value,cards },{ type ,value,cards } ]
     */
    if( name === OnAction.PLAYER_SHOW_HAND ){
        let formations = action.msg ;

        _.each( formations , (formation,sid)=>{
            if( formation ){
                GameMsgHandler.setSeatStateBySid( sid , 'showed' , true);
                GameMsgHandler.setCardTypeBySid( sid , formation );
                GameMsgHandler.setCardsBySid( sid , formation.cards );
            }
        });
        return;
    }
    

    /**
     * << ROOM_RESULT >> 
     * 
     * { seats[ {takeAllTimes payAllTimes nnTimes noTimes winTimes gold}]}
     * 
     * 
     */
    if( name === OnAction.ROOM_RESULT ){
        GameMsgHandler.setRoomResult( action.msg.seats );
        GameMsgHandler.setRoomCost( action.msg.meter );
        return;
    }

    /**
     * << RoundResult >> 
     * 
     * { seats[ {{roundScore: 1, totalScore: -49}]}
     * 
     * 
     */
    if( name === OnAction.RoundResult ){
        GameMsgHandler.setStateResult(action.msg);
        return;
    }

    /**
     * << ROOM_CHAT >>
     * 
     * seat , type , content
     */
     if( name === OnAction.ROOM_CHAT ){
        // GameMsgHandler.setRoomResult( action.msg.seats );
        ChatHandler.addChatMessage( action.msg.seat , action.msg.type , action.msg.content )
        return;
    }


    /**
     * << PLAYER_SIT >>
     * 仅自己收到，sit时为false，下一局state1时为true
     */
    if( name === OnAction.PLAYER_SIT ){
        if( action.msg == false ) return ;
        GameMsgHandler.setUserSitting( action.msg );
        return;
    }


    /**
     * << ROUND_BEGIN >>
     * 0-10
     */
    if( name === OnAction.ROUND_BEGIN ){
        GameMsgHandler.getData().state.round = action.msg ;
        GameMsgHandler.resetDataHands();
        return;
    }
    

    /**
     * << PlayerScore >>
     * 消息格式 {id: 用户id, change: 变动, score: 剩余}
     */
    if( name === OnAction.PlayerScore ){
        _.each( GameMsgHandler.getData().seats , (seat,sid)=>{
            if( seat.user == null ) return ;
            if(seat.user.id == action.msg.id){
                seat.user.score = action.msg.score ;
            } 
        });
        return;
    }


};


