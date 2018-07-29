/**
 * exports
 */
var handler = module.exports ;

handler.setData = function( msg ){
    $G.gSData.gCData = msg;

    if( handler.getData().account ){
        gLocalData.userInfo.account = handler.getData().account ;
        DataHelper.saveAllData();
    }
};

handler.getData = function(){
    return $G.gSData.gCData ;
};

handler.getId = function() {
    return handler.getData().id ? handler.getData().id : 0 ;
};

handler.getRecommender = function(){
    return handler.getData().agentId ;
};

handler.getAgentId = function(){
    return handler.getData().agentId;
};

handler.getAgentNick = function(){
    return handler.getData().agentNick ;
};

handler.getPhone = function(){
    return handler.getData().phone;
};

handler.getName = function(){
    return handler.getData().name ;
};

//  eth变动记录
handler.setDataRecordAll = function( recordAll ){
    handler.getData().recordAll = recordAll ;
};

handler.getDataRecordAll = function(){
    return handler.getData().recordAll;
};

//  充币记录
handler.setDataRecordIn = function( recordIn ){
    handler.getData().recordIn = recordIn ;
};

handler.getDataRecordIn = function(){
    return handler.getData().recordIn;
};

//  提币记录
handler.setDataRecordOut = function( recordOut ){
    handler.getData().recordOut = recordOut ;
};

handler.getDataRecordOut = function(){
    return handler.getData().recordOut;
};

//  地址
handler.setAddress = function( address ){
    handler.getData().address = address ;
};

handler.getAddress = function(){
    return handler.getData().address;
};

//  airdrop
handler.setVairdropType = function( VairdropType ){
    handler.getData().VairdropType = VairdropType ;
};

handler.getVairdropType = function(){
    return handler.getData().VairdropType;
};

//  eth
handler.setEth = function( eth ){
    handler.getData().eth = eth ;
};

handler.getEth = function(){
    return handler.getData().eth;
};

//  金币（ GCoin ）
handler.setGold = function( Gold ){
    handler.getData().Gold = Gold ;
};

handler.getGold = function(){
    return handler.getData().Gold;
};

//  提币手续费( wei )
handler.setFee = function( Fee ){
    handler.getData().Fee = Fee ;
};

handler.getFee = function(){
    return handler.getData().Fee;
};

handler.setRecommender = function(id){
    handler.getData().agentId = id;
};

handler.getToken = function(){
    return handler.getData().token ;
};

handler.getWxOpenID = function() {
    if( handler.getData().wx ){
        if( handler.getData().wx.openId ){
            return handler.getData().wx.openId ;
        }
    }
    return null;
};

handler.getIP = function() {
    return handler.getData().ip ? handler.getData().ip : 'no ip';
};

handler.getDesp = function() {
    return handler.getData().desp ? handler.getData().desp : '' ;
};

handler.setDesp = function(desp) {
    handler.getData().desp = desp;
};

handler.getNick = function() {
    return handler.getData().nick ? handler.getData().nick : handler.getData().account ;
};

handler.setNick = function(nick) {
    handler.getData().nick = nick ;
};

// 0 man 1 woman
handler.getSex = function(){
    return handler.getData().sex ;
};

// "" || url
handler.setHead = function(head){
    handler.getData().head = head ;
};

// "" || url
handler.getHead = function(){
    return handler.getData().head ;
};

handler.getDiamondsAll = function(){
    let card       = handler.getData().bag[ 4 ] ? handler.getData().bag[ 4 ] : 0;
    let bindedCard = handler.getData().bag[ 5 ] ? handler.getData().bag[ 5 ] : 0;
    let count = card + bindedCard ;
    if( count == undefined || count == null ) count = 0 ;
    count = parseFloat( count.toFixed(3) ) ;
    return count ;
};

// 正常牛币
handler.getScore = function(){
    let count = handler.getData().bag[ 1 ] ? handler.getData().bag[ 1 ] : 0;
    return count ;
}


// 总牛币
handler.getRoomCardsAll= function(){
    let card       = handler.getData().bag[ 2 ] ? handler.getData().bag[ 2 ] : 0;
    let bindedCard = handler.getData().bag[ 3 ] ? handler.getData().bag[ 3 ] : 0;
    let count = card + bindedCard ;
    if( count == undefined || count == null ) count = 0 ;
    return count ;
}

// 正常牛币
handler.getRoomCard = function(){
    let count = handler.getData().bag[ 2 ] ? handler.getData().bag[ 2 ] : 0;
    return count ;
}

// 绑定牛币
handler.getRoomCardBind= function(){
    let count = handler.getData().bag[ 3 ] ? handler.getData().bag[ 3 ] : 0;
    return count ;
}

// 真钻
handler.getDiamond1 = function(){
    let count = handler.getData().bag[ 4 ] ? handler.getData().bag[ 4 ] : 0;
    return parseFloat( count.toFixed(3) ) ;
}

// 绑定钻
handler.getDiamond2 = function(){
    let count = handler.getData().bag[ 5 ] ? handler.getData().bag[ 5 ] : 0;
    return parseFloat( count.toFixed(3) ) ;
}

handler.shouldReconnect = function(){
    if( handler.getData().room != null ) cc.currentGame = handler.getData().room.game ;
    return handler.getData().room != null ;
};

handler.shouldReconnectNow = function(){
    return ( handler.shouldReconnect() && handler.getData().room.playing ) ;
};

handler.getHistory = function(){
    return handler.getData().historys;
};

handler.addHistory = function( item ){
    if( _.size(handler.getHistory()) === 10 ) handler.getHistory().splice(0,1);
    handler.getHistory().push(item);
};

handler.setDataGiveDiamondsHistory = function(msg){
    handler.getData().giveDiamondsHistory = msg;
};

handler.getDataGiveDiamondsHistory = function(){
    return $G.gSData.gCData.giveDiamondsHistory ;
};
//邮件
handler.getDataEmailData = function(){
    handler.getData().redShow;
};



/***
 * init
 */
handler.initNetListeners = function(){
    handler.removeNetListeners();
    SocketHelper.onNetListener( ServerRouters.OnAction_User.ROUTE , handler._onHandleUser );
    SocketHelper.onNetListener( ServerRouters.OnAction_Item.ROUTE , handler._onHandleItem );
    SocketHelper.onNetListener( ServerRouters.OnAction_Broadcast.ROUTE , handler._onHandleBroadcast );
    SocketHelper.onNetListener( ServerRouters.OnAction_Broadcast.ACTION , handler._onBroadcastACTION );
    SocketHelper.onNetListener( ServerRouters.OnAction_History.ROUTE , handler._onHandleHistory );
    //email
    SocketHelper.onNetListener( ServerRouters.OnAction_Broadcast.EMAIL , handler._onEmailReceive );
    RecordsHandler.initNetListeners();
    GroupHandler.initNetListeners();
};


/***
 * remove
 */
handler.removeNetListeners = function(){
    SocketHelper.offNetListener( ServerRouters.OnAction_User.ROUTE , handler._onHandleUser );
    SocketHelper.offNetListener( ServerRouters.OnAction_Item.ROUTE , handler._onHandleItem );
    SocketHelper.offNetListener( ServerRouters.OnAction_Broadcast.ROUTE , handler._onHandleBroadcast );
    SocketHelper.offNetListener( ServerRouters.OnAction_Broadcast.ACTION , handler._onBroadcastACTION );
    SocketHelper.offNetListener( ServerRouters.OnAction_History.ROUTE , handler._onHandleHistory );
    //email
    SocketHelper.offNetListener( ServerRouters.OnAction_Broadcast.EMAIL , handler._onEmailReceive );
    RecordsHandler.removeNetListeners();
    GroupHandler.removeNetListeners();
};


/***
 * _onHandleUser
 */
handler._onHandleUser = function( action ){
    let OnAction = ServerRouters.OnAction_User;

    cc.log('@@@@ OnAction : ' + action );
    cc.log( action );

    // let keys = _.keys( action.msg );
    _.each( action.msg , ( v , k ) =>{
        cc.log(v+k)
        handler.getData()[k] = v ;
    });

};


/***
 * _onHandleItem
 */
 /////////////////////////////////////////////////////////////////////////////////////////
handler._onHandleItem = function( action ){
    cc.log('@@@_onHandleItem : from ' + handler.getData().bag[ action.msg.id ] + ' to ' + action.msg.count );
    cc.log( action );

    //data
    handler.getData().bag[ action.msg.id ] = action.msg.count ;

    NotifyHelper.notify( NOTIFY_UPDATE_ROOMCARD );
};


/***
 * _onHandleBroadcast
 * 
 * id: 170, title: "系统消息", message: "欢迎报名参加比赛", timestamp: 1488461181230, items: Object}
 */
handler._onHandleBroadcast = function( action ){
    cc.log('@@@Broadcast :');
    cc.log( action );
    MsgHelper.pushTopInfo( action.content );
};


/**
 * _onHandleHistory
 * 
 * {room: "45", users: [gold,id,nick], timestamp: 1495095369879}
 */
handler._onHandleHistory = function( action ){
    cc.log('@@@Histroy :');
    cc.log( action );

    UserHandler.addHistory( action );
};

/**
 * _onBroadcastACTION
 * 
 * name做为广播频道 msg是字符串
 */
handler._onBroadcastACTION = function( action ){
    cc.log('@@@Histroy :');
    cc.log( action );

    // UserHandler.addHistory( action );
    MsgHelper.pushTopInfo( action.msg );
};

/***
 * 接收邮件消息  处理消息
 */
 /////////////////////////////////////////////////////////////////////////////////////////
 handler._onEmailReceive = function(){
    handler.getData().redPoint.mail = true;
    NotifyHelper.notify( NOTIFY_UPDATE_EMAIL);
    cc.log("邮件消息收到");
};

