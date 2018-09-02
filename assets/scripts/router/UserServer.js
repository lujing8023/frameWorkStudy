/**
 * exports
 */
var server = module.exports;



/***
 * platformLogin
 */
server.platformLogin = function( platformName , game , openid ,  account , head , nick , sex , cb ){
    cc.log('platformLogin:' + account );
    sex = parseInt(sex) ;
    server._sendLogin( ServerRouters.RqUser.platformLogin , { game:cc.currentGame ? cc.currentGame : 'nn' ,openid : openid ,  account : account , head : head , nick : nick , sex : sex } , cb );
};

server.platformLoginFast = function( account , cb ){
    cc.log('platformLoginFast:' + account );
    server._sendLogin( ServerRouters.RqUser.platformLoginFast , { account : account , game:cc.currentGame ? cc.currentGame : 'nn' } , cb );
};

server.guestLogin = function( account , cb ){
    cc.log('guestLogin:' + account );
    server._sendLogin( ServerRouters.RqUser.guestLogin , {  type:0 , account : account , game:cc.currentGame ? cc.currentGame : 'nn' } , cb );
};


server.relogin = function( game ){
    cc.log('@relogin:' + game );
    let router = ServerRouters.RqUser.relogin ;
    SocketHelper.request( router , {game:game} , 
        (msg) => { 
            // MsgHelper.pushToast('切换游戏成功:' + game );
        }
    );
};

/***
 * login
 */
// server.login = function( account , cb ){
//     cc.log('login:' + account );
//     server._sendLogin( ServerRouters.RqUser.login , { account : account , game:cc.currentGame ? cc.currentGame : 'nn' , gps:null } , cb );
// };

/***
 * wxLogin
 */
// server.wxLogin = function( code = '' , cb ){
//     cc.log("wxLogin:" + code );
//     server._sendLogin( ServerRouters.RqUser.wxLogin , { code : code }, cb );
// };

/***
 * wxLogin
 */
// server.wxFastLogin = function( code = '' , cb  ){
//     cc.log("wxFastLogin:" + code );
//     server._sendLogin( ServerRouters.RqUser.wxFastLogin , { openId : code } , cb );
// };

/***
 * sendRegisterCode
 */
server.sendRegisterCode = function( account , cb ){
    cc.log('sendRegisterCode:' + account );
    SocketHelper.request( ServerRouters.RqUser.sendRegisterCode , { account : account } , (msg)=>{
        if(cb)cb(msg)
    } );
};

/***
 * commitRegister
 */
server.commitRegister = function( account , code , password , nick , sex , cb ){
    cc.log('commitRegister:' + account );
    SocketHelper.request( ServerRouters.RqUser.commitRegister , { account : account  , code : code , password : password , nick : nick , sex : sex } , (msg)=>{
        if(cb)cb(msg)
    } );
};


/***
 * authLogin
 */
server.authLogin = function( account , password , cb ){
    cc.log('authLogin:' + account );
    server._sendLogin( ServerRouters.RqUser.authLogin , { game:cc.currentGame ? cc.currentGame : 'nn' , account : account , password : password , gps : null } , cb );
};




/**
 * bindRecommender
 */
server.bindRecommender = function( id , cb ){
    id = parseInt(id);
    SocketHelper.request( ServerRouters.RqUser.bindRecommender , { recommender : id } ,
        ()=>{ 
            if(cb)cb() ;
            // let info = '这是一条测试信息：绑定成功 ' + id ;
            // MsgHelper.pushToast(info,0);
        },
        true
    );
}

/**
 * setHead
 */
server.setHead = function( head , cb ){
    SocketHelper.request( ServerRouters.RqUser.setHead, { head : head } ,
        ()=>{ 
            UserHandler.setHead( head );
            if(cb)cb() ;
            
        },
        true
    );
}


/**
 * applyMoney
 * 
 * money float 、type int、account string、banker string、bankerAccount string、phone string
 */
server.applyMoney = function( money , type , account , banker , bankerAccount , phone , cb ){
    money = parseFloat(money);
    type  = parseInt(type);
    SocketHelper.request( ServerRouters.RqUser.applyMoney , { money : money , type : type , account : account , banker : banker , bankerAccount : bankerAccount , phone : phone } ,
        ()=>{ if(cb)cb(); },
        true
    );
}





/***
 * logout
 * 
 * cb: loadScene('LoginScene');
 */
server.logout = function( cb ){
    SocketHelper.request( ServerRouters.RqUser.logout , {}, 
    function( msg ){
        $G.gCData.gIsLogined = !true ;
        UserHandler.removeNetListeners();
        if( cb ) cb();
    },true);
};




/***
 * _sendLogin
 */
server._sendLogin = function( route , param , cb ){
    // cc.log("【请求头】",route);
    // cc.log("【请求格式】",param);
    SocketHelper.request( route , param , (msg) => { 
            UserHandler.setData( msg );
            server._onLoginSuccess(msg); 
            MsgHelper.initHelper();
            if( cb ) cb();
        } ,
        (action) => { server._onLoginFailed(action); } ,
        true
    );
};

/**
 * _onLoginSuccess
 */
server._onLoginSuccess = function( msg ){
    $G.gCData.gIsLogined = true ;
    // RoomHistoryHandler.setRecording(false);
    UserHandler.setData( msg );
    UserHandler.initNetListeners();
    // GroupServer.listenGroupApplyNotify();
    SocketHelper.onLoginSuccess();
    // MsgHelper.removeLoading();
    // if( !MWHelper.checkAndExecute() ){
    if( UserHandler.shouldReconnect()){
        RoomServer.reconnectRoom();
    }else{
        // if( !gHallScene ) GameHelper.loadHallScene( ()=>{FuncHelper.execute(); });
        if(gGameScene){
            GameHelper.loadHallScene( ()=>{
                // GameHelper.showNoticeAuto();
            });
        }else{
            GameHelper.loadChooseScene( ()=>{
                // GameHelper.showNoticeAuto();
            });
        }
        return ;
    }
    // }
    FuncHelper.execute();
}

/**
 * _onLoginFailed
 */
server._onLoginFailed = function( action ){
    // MsgHelper.pushToast( action.code );

    // 失效 || 未知用户
    // if( action.code == 10004 || action.code == 10009 ){
    if( action.code == 10004 ){
        // gLocalData.userInfo.wxOpenId = '' ;
        // PlatformHelper.wxLogin();

        gLocalData.userInfo.account = '' ;
        PlatformHelper.loginByPlatform( 'line' );
    
        return ;
    }
    // 重连的时候会发送两次登录过去，然后导致第二次404，暂时先这么处理吧
    if( action.code == 404 || action.code == '404'){
        return ;
    }
    // let info = 'Error : ' + action.code + ' ' + action.msg ;
    let info = action.msg ;
    MsgHelper.pushToast( info );
}


/**
 * charge
 */
server.charge = function( type , count ){
    SocketHelper.request( ServerRouters.RqUser.charge , { type:type , count:count }, 
    function( msg ){
        cc.log( msg );
        cc.log( msg.url );
        cc.sys.openURL( msg.url ); 
    },true);
}

/**
 * charge
 */
server.tradeItem = function( target , itemId , count , cbSuccess){
    SocketHelper.request( ServerRouters.RqUser.tradeItem , { target: target ,itemId: itemId , count:count }, 
    function( msg ){
        if(cbSuccess)cbSuccess();
        // cc.log( msg );
        // cc.log( msg.url );
        // cc.sys.openURL( msg.url ); 
    },true);
}

/**
 * setDesp
 */
server.setDesp = function( desp , cbSuccess){
    SocketHelper.request( ServerRouters.RqUser.setDesp , { desp: desp }, 
    function( msg ){
        if(cbSuccess)cbSuccess(msg);
        // cc.log( msg );
        // cc.log( msg.url );
        // cc.sys.openURL( msg.url ); 
    },true);
}

/**
 * setDesp
 */
server.setNick = function( nick , cbSuccess){
    SocketHelper.request( ServerRouters.RqUser.setNick , { nick : nick }, 
    function( msg ){
        if(cbSuccess)cbSuccess(msg);
        // cc.log( msg );
        // cc.log( msg.url );
        // cc.sys.openURL( msg.url ); 
    },true);
}

// GiveDiamondsHistory
server.getGiveDiamondsHistory = function( userId , page = 0 , cbYes , cbDone ){ 
    let url = Configs.http_GiveDiamondsHistory + 'userId=' + userId + '&page=' + page;
    OldHttpServer._getHttpWithLoading( 
        url  , 
        (text) => { 
            UserHandler.setDataGiveDiamondsHistory( JSON.parse(text).msg );
            if( cbYes ) cbYes();
        },
        cbDone );
}

//  发送验证码
server.sendPhone = function( phone , userId , cbYes , cbDone , cbError){
    HttpRouters.RqBind.sendPhoneCode.params.phone  = phone;
    HttpRouters.RqBind.sendPhoneCode.params.userId = userId;
    HttpServer.request(HttpRouters.RqBind.sendPhoneCode , cbYes  ,cbDone , cbError);
};

//  绑定手机号
server.bindPhone = function( userId , phone , code , name , cbYes , cbDone , cbError){
    HttpRouters.RqBind.bindPhone.params.userId    = userId;
    HttpRouters.RqBind.bindPhone.params.phone     = phone;
    HttpRouters.RqBind.bindPhone.params.code      = code;
    HttpRouters.RqBind.bindPhone.params.name      = name;
        HttpServer.request(HttpRouters.RqBind.bindPhone , cbYes ,cbDone , cbError);
};

//  绑定邀请人
server.bindAgent = function( userId , agentId , cbYes , cbDone , cbError){
    HttpRouters.RqBind.bindAgent.params.userId      = userId;
    HttpRouters.RqBind.bindAgent.params.agentId     = agentId;
        HttpServer.request(HttpRouters.RqBind.bindAgent , cbYes ,cbDone , cbError);
};

//  邀请简况
/**
 * return 
 * {
 *  "total": 10, 总邀请人数
 *  "rewarded": 3, 完成游戏任务人数
 *  "charged": 3, 完成首冲任务人数
 * }
 */
server.getThumbnail = function( userId , cbYes , cbDone , cbError){
    HttpRouters.RqRecommender.getThumbnail.params.userId    = userId;
    HttpServer.request(HttpRouters.RqRecommender.getThumbnail , (action)=>{
            if(action.code == 200){
                if(cbYes)cbYes(action.msg);
            }else{
                MsgHelper.pushToast(action.msg);
            }
        }) ;
};

//  邀请详细列表
/**
 * {
 *  "count": 100, 总数
 *  [{
 *   "id": 10000, 玩家id
 *   "play": 3, 游戏局数,
 *   "charge": 3, 充值次数
 * }]
 * }
 */
server.getDetails = function( userId , pindex , psize , cbYes , cbDone , cbError){
    HttpRouters.RqRecommender.getDetails.params.userId    = userId;
    HttpRouters.RqRecommender.getDetails.params.pindex    = pindex;
    HttpRouters.RqRecommender.getDetails.params.psize     = psize;
    HttpServer.request(HttpRouters.RqRecommender.getDetails , (action)=>{
            if(action.code == 200){
                if(cbYes)cbYes(action.msg);
            }else{
                MsgHelper.pushToast(action.msg);
            }
        }) ;
};