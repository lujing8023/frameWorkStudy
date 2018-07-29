/**
 * ROOM
 * 
 * canSit , rounds: 10, timesMode: 1, bankerMode: 1, id: 724535, state{banker,result,round,type}
 * seats: [ hand{ cards , formation } , index , hosting ,
 *          state{ finalScore , played , banker,bid,nnTimes,noTimes,payAllTimes,ready,result,takeAllTimes,winTimes}, 
 *          user{ gold,head,id,ip,nick} ]  
 * 
 */

/**
 * exports
 */
var handler = module.exports ;


/**
 * Data
 */
handler.setData = function( msg ){
    $G.gSData.gRoom = msg;

    handler.updateSeatIds();
    handler.setRoomState(msg.state);
};

handler.getData = function(){
    return $G.gSData.gRoom ;
};


handler.resetData = function(){
    handler.updateSeatIds();
    _.each( $G.gSData.gRoom.seats , (seat) => {
        seat.banker          = null  ;
        seat.bid             = null  ;
        seat.played          = false ;
        seat.showed          = false ;
        // seat.sitting   = true  ;
    });
};

// 新的一局开始后重置手牌，区分中途加入的玩家 seat.hand = null ;
handler.resetDataHands = function(){
    _.each( $G.gSData.gRoom.seats , (seat) => {
        seat.hand            = {}  ;
        seat.hand.cards      = seat.user ? ( UserHandler.getId() == seat.user.id ? [] : 0 )  : null ;
        seat.hand.formation  = null ;
    });
}

handler.clearData = function(){
    $G.gSData.gRoom = null ;
};


/**
 * RoomInfo
 */
handler.getRoomInfoNamesByData = function( data , roomId = null ){
    return {
        id : ( roomId ? roomId : data.id ) ,
        // payMode : $G.gCData.CreateRoom_PayModeName[ data.payMode ] ,
        // timesMode :  $G.gCData.CreateRoom_GameModeName[ data.timesMode - 1] ,
        // bankerMode : $G.gCData.CreateRoom_BankerModeName[ data.bankerMode - 1] ,
        baseScore  : ( data.baseScore ? data.baseScore : 1 ),
        // rounds : data.rounds ,
        // canSit : data.canSit ? '允许中途加入' : '禁止中途加入' ,
        // canRub : data.canPlay ? '允许搓牌' : '禁止搓牌'
    }
};

handler.getRoomParamsOneLineByNames = function( data , sign = '、' ){
    let content = `${data.payMode}${sign}${data.baseScore}分${sign}${data.rounds}局${sign}${data.timesMode}${sign}${data.bankerMode}`
    return content ;
}

handler.getRoomInfoNames = function(){
    let data = handler.getData() ;
    return handler.getRoomInfoNamesByData(data) ;
};

handler.getRoomInfos = function(){
    let names = handler.getRoomInfoNames();
    return [    `房号：${ names.id }`,
                `${ names.payMode }`,
                `底注：${ names.baseScore }`,
                `${ names.timesMode }`,
                `${ names.bankerMode }`,
                handler.getRoundInfo()
    ];
};

handler.getRoundInfo = function(){
    return `局数：${handler.getCurrentRound()}/${handler.getRoundLimit()}` ;
};

handler.getCurrentRound = function(){
    return handler.getData().state.round ;
};

handler.getRoundLimit = function(){
    return handler.getData().rounds ;
};

handler.isGameOver = function(){
    return ($G.gCData.gRoomLeaved) || ( handler.getCurrentRound() === handler.getData().rounds );
};

handler.isRoomOwner = function(){
    if( handler.getData() == null ) return false ;
    return (handler.getData().owner === UserHandler.getId());
};

/**
 * RoomState
 */
handler.setRoomState = function( state ){
    handler.getData().state = state ;
};

handler.getRoomState = function(){
    return handler.getData().state ;
};

handler.getRoomStateType = function(){
    return handler.getRoomState().type ;
};

handler.setUserSitting = function( sit ){
    _.each( handler.getSeats() , (seat)=>{
        if( seat.id == UserHandler.getId()){
            seat.sitting = sit ;
        }
    });
    cc.log( handler.getSeats() );
};

handler.getArea = function(){
    return handler.getData().area ? handler.getData().area : 1 ;
};

handler.setArea = function( area ){
    handler.getData().area = area ;
};

handler.couldSit = function(){
    // if( !handler.getData().canSit ) return false ;

    // let sitting = handler.getSeatByCid(0).sitting ;
    // if( sitting ) return false ;

    let count        = 0 ;
    let isSitAndWait = false ; 
    _.each( handler.getSeats() , (seat)=>{
        if( seat.user ){
            count ++ ;
            if( seat.user.id == UserHandler.getId() ){
                isSitAndWait = true ;
            }
        }
    });
    if( isSitAndWait ) return false ;

    return true ;
};

// 是否已坐下正式开始游戏，旁观和站立都返回false
handler.isSelfPlaying = function(){
    return handler.isPlayerPlaying( UserHandler.getId() ) ;
};

// 是否已坐下正式开始游戏，旁观和站立都返回false
handler.isPlayerPlaying = function( id ){
    let isPlaying = false ; 
    _.each( handler.getSeats() , (seat,sid)=>{
        if( seat.user ){
            if( seat.user.id == id ){
                // let sitting = seat.sitting ;
                isPlaying = seat.hand != null ;
            }
        }
    });
    return isPlaying ;
    // return true ;
};

/**
 * Seats
 */
handler.getSeats = function(){
    return handler.getData().seats ;
};

handler.getSeatBySid = function( sid ){
    return handler.getSeats()[sid] ;
};

handler.getSeatByCid = function( cid ){
    return handler.getSeatBySid( handler.getSid( cid ) );
};

handler.setSeatBySid = function( sid , seat ){
    handler.getData().seats[sid] = seat ;
    cc.log( handler.getData() );
};

//key : played,banker,bid,nnTimes,noTimes,payAllTimes,ready,showed
handler.getSeatStateBySid = function( sid , key ){
    return handler.getSeatBySid(sid)[key] ;
};

handler.getSeatStateByCid = function( cid , key ){
    return handler.getSeatStateBySid( handler.getSid(cid) , key );
};

handler.setSeatStateBySid = function( sid , key , value ){
    handler.getSeatBySid(sid)[key] = value ;
};


/**
 * User
 */
handler.getUserBySid = function( sid ){
    if( !handler.getSeats() ) return null ;
    if( !handler.getSeatBySid(sid) ) return null ;
    if( !handler.getSeatBySid(sid).user ) return null ;
    return handler.getSeatBySid(sid).user ;
};

handler.getUserByCid = function( cid ){
    return handler.getUserBySid( handler.getSid( cid ) );
};

handler.setUserBySid = function( sid , user ){
    handler.getSeatBySid(sid).user = user ;
};

//key : gold,head,id,ip,nick
handler.getUserStateBySid = function( sid , key ){
    return handler.getUserBySid(sid)[key] ;
};

handler.setUserStateBySid = function( sid , key , value ){
    handler.getUserBySid(sid)[key] = value ;
};

handler.getBankerSid = function(){
    return handler.getData().state.banker;
};


/**
 * Hand
 */
handler.getHandBySid = function(sid){
    // if( handler.getSeatBySid( sid ).hand == null ) handler.getSeatBySid( sid ).hand = { cards:[] , formation:{} } ;
    return handler.getSeatBySid( sid ).hand ;
};

handler.getCardsByCid = function(cid){
    return handler.getHandBySid( handler.getSid(cid) ).cards ;
};

handler.setCardsBySid = function(sid,cards){
    handler.getHandBySid(sid).cards = cards ;
};

handler.pushCardsBySid = function(sid,cards){
    handler.getHandBySid(sid).cards = handler.getHandBySid(sid).cards.concat(cards)
    // _.each( cards , (card)=> handler.getSeatBySid( sid ).hand.cards.push(card) );
};

/**
 * Formation - 自行维护 - PLAYER_PLAY时添加
 */
handler.getCardTypeBySid = function( sid ){
    return handler.getHandBySid(sid).formation ;
}

handler.getCardTypeByCid = function( cid ){
    return handler.getCardTypeBySid( handler.getSid(cid) );
}

handler.setCardTypeBySid = function( sid , formation ){
    handler.getHandBySid(sid).formation = formation ;
}



/***
 * updateSeatIds
 * 
 * gSids[ cid ] = 客户端座位号为cid的玩家在服务器上的座位index，每个玩家在客户端上的座位号都为0
 * gCids[ sid ] = 服务器座位号为sid的玩家在客户端上的座位index
 */
handler.updateSeatIds = function(){
    $G.gSData.gSids    = [];
    $G.gSData.gCids    = [];

    let mySid = 0 ;
    let len   = _.size( handler.getSeats() );

    for( let i = 0 ; i < len ; i++ ){
        if( !handler.getSeatBySid(i) ) continue ;
        if( !handler.getUserBySid(i) ) continue ;
        if( handler.getUserBySid(i).id === UserHandler.getId() ){
            mySid = i ; 
            break;
        }
    }
    _.times( len , function(i){
        $G.gSData.gSids[ i ] = ( mySid + i ) % len ;
        $G.gSData.gCids[ ( mySid + i ) % len ] = i ;
    });
}

handler.getSid = function( cid ){
    return $G.gSData.gSids[ cid ] ;
}

handler.getCid = function( sid ){
    return $G.gSData.gCids[ sid ] ;
}

/**
 * getStateResult
 */
handler.getStateResult = function(){
    return handler.getData().result ? handler.getData().result.seats : null ;
}

/**
 * getStateResult
 */
handler.setStateResult = function( result ){
     handler.getData().result = result ;
}

/**
 * RoomResult
 */
handler.setRoomResult = function( results ){
    let seats = handler.getSeats();
    _.each( results , (result,index) => {
        if( result === null ) return ;
        seats[index].takeAllTimes = result.takeAllTimes;
        seats[index].payAllTimes = result.payAllTimes;
        seats[index].nnTimes = result.nnTimes;
        seats[index].noTimes = result.noTimes;
        seats[index].winTimes = result.winTimes;
        seats[index].finalScore = result.changedGold;
    });
}

handler.setRoomCost = function( costs ){
    handler.getData().roomCosts = costs ;
}

// map : [ id,cost ]
handler.getRoomCost = function(){
    return handler.getData().roomCosts ;
}

//判断玩家是否已经showHand
handler.isPlayerShowHandOver = function(){
    let bPlayerShowHandOver = false;
    bPlayerShowHandOver = _.find( handler.getSeats() , ( seat,sid )=>{ 
        if( seat && seat.user){
            let isPlaying = handler.isPlayerPlaying( seat.user.id );
            if(isPlaying){
                let _bPlayerShowHandOver = handler.getSeatStateBySid( sid , 'played' );
                return _bPlayerShowHandOver == false;

            }
        }
    })

    return bPlayerShowHandOver ? false : true;
}

// 是否允许搓牌
handler.canRubCard = function(){
    return handler.getData().canPlay ;
}





