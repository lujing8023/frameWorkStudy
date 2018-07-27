
/**
 * exports
 */
var server = module.exports;

// 屏蔽掉error会显示toast的情况（ -- why: 因为在超时临界值的时候会返回404）
server._send = function( route , param , cb1 = null , cbError = null , showLoading ){
    SocketHelper.request( route , param , cb1 , ()=>{} , false );
}

server.sit = function( cb ){
    // server._send( ServerRouters.RqGame_FKNN.sit , {} , cb );
    SocketHelper.request( ServerRouters.RqGame_FKNN.sit , {} , cb , false );
};

server.ready = function(){
    server._send( ServerRouters.RqGame_FKNN.ready , { name: ServerRouters.OnAction_FKNN.PLAYER_READY } );
};

//null没抢 false不抢 true表示抢
server.callBanker = function( bankerValue ){
    server._send( ServerRouters.RqGame_FKNN.callBanker , { name: ServerRouters.OnAction_FKNN.PLAYER_BANKER, banker: bankerValue } );
};

// null 1 2 3
server.bet = function( bid ){
    server._send( ServerRouters.RqGame_FKNN.bet , { name: ServerRouters.OnAction_FKNN.PLAYER_BID, bid : bid } );
};

server.finish = function(){
    server._send( ServerRouters.RqGame_FKNN.play , { name: ServerRouters.OnAction_FKNN.PLAYER_PLAY } );
};

server.play = function(){
    server._send( ServerRouters.RqGame_FKNN.play , { name: ServerRouters.OnAction_FKNN.PLAYER_SHOW_HAND } );
}

server.chat = function( type , content ){
    if( !this.funcChat ){
        this.funcChat = _.throttle((type,content)=>{
            server._send( ServerRouters.RqGame_FKNN.chat , { name: ServerRouters.OnAction_FKNN.ROOM_CHAT , type : type , content : content } );
        }, 2000 , {trailing: false} ) ;
    }
    
    this.funcChat(type,content);
}


// server.startDismiss = function(){
//     NetServer.request( ServerRouters.RqGame_FKNN.startDismiss , true );
// };

// server.signDismiss = function( sign ){
//     NetServer.request( ServerRouters.RqGame_FKNN.signDismiss , {sign: sign} , true );
// };


