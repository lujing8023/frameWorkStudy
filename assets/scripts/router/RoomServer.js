/**
 * exports
 */
var server = module.exports;

/***
 * getZone
 * 
 * return { id : 1 区间id , params : {} 区间参数 - 比如GCoin范围 房间底注等 ， users : 0 在线玩家数 }
 */
server.getZone = function( cb , cbError ){
    let req = ServerRouters.RqGroup_YTNN.getZone;
    SocketHelper.request( req , {} , function ( msg ) {
        if( cb ) cb(msg);
    },()=>{
        if( cbError ) cbError();
    } );
};

/***
 * match
 * 
 * Param {area} area 匹配区间id
 * 
 */
server.match = function( areaId , cb ){
    let req = ServerRouters.RqGroup_YTNN.match ;
    SocketHelper.request( req , { area : areaId } , function ( msg ) {
        if( cb ) cb();
    },true );
};

/***
 * create
 * 
 * baseScore  底分   scoreMin   最低带入
 */
server.createRoom = function( params , cb ){
    let req = ServerRouters.RqRoom.createRoom ;
    // params.game = 'nn' ;
    SocketHelper.request( req , params , function ( msg ) {
        if( cb ) cb();
    },true );
};


/***
 * join
 * 
 */
server.joinRoom = function( areaType = 0 , roomId , cb ){
    // let req = areaType == 0 ? ServerRouters.RqRoom.joinRoom : ServerRouters.RqGroup.joinRoom ;
    let req = ServerRouters.RqRoom.joinRoom ;
    SocketHelper.request( req, { id : roomId }, 
    function ( msg ) {
        if( cb ) cb();
    },
    ( data )=>{
        if( data.code == 10007 ){
            // 游戏中 - 询问旁观？
            PBHelper.addNode( 'DlgViewRoom' , null , (dlgnode)=>{
                dlgnode.getComponent('DlgViewRoom').init( areaType , roomId );
            },10000);
            return ;
        }
        // let info = data.msg + ' (error:' + data.code + ')';
        let info = data.msg ;
        MsgHelper.pushToast( info );
    },
    true);
};


/**
 * viewRoom 旁观
 * 
 * areaType : 0 normal  1 group 普通  2 公会
 */
server.viewRoom = function( areaType ,roomId , cb ){
    let req = areaType == 0 ? ServerRouters.RqRoom.viewRoom : ServerRouters.RqGroup.viewRoom ;
    SocketHelper.request( req, { id : roomId }, function ( msg ) {
        if( cb ) cb();
    },true);
};

/***
 * reconnectRoom
 */
server.reconnectRoom = function(){
    GamesMgr.initGame( cc.currentGame , false );
    SocketHelper.request( ServerRouters.RqRoom.reconnectRoom , {} , 
    (msg)=>{
        
    },true);
};


/***
 * leaveRoom
 * 
 * 在游戏半途退出房间的时候发，游戏结束不用发
 */
server.leaveRoom = function( cb ){
    SocketHelper.request( ServerRouters.RqRoom.leaveRoom , {}, cb , true );
};

/***
 * dismissRoom
 * 
 */
server.dismissRoom = function( cb ){
    SocketHelper.request( ServerRouters.RqRoom.dismissRoom , {}, cb , true );
};



/***
 * DISMISS_START
 * 
 */
server.dismissStart = function( cb ){
    SocketHelper.request( ServerRouters.RqGame_TWMJ.sendDismiss , {}, cb , true );
};


/***
 * dismissVote
 * 
 */
server.dismissVote = function( agree = true , cb ){
    SocketHelper.request( ServerRouters.RqGame_TWMJ.dismissVote , { vote:agree }, cb , true );
};



