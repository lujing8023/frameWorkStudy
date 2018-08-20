

/***
 * log ON / OFF
 */
// var log = function(){};  // OFF
var log = function( info ){   cc.log( info );  }   // ON

var state = {
    INITED       : 0 ,  //  inited          初始化
    CONNECTING   : 1 ,  //  connecting      连接中  
    CONNECTED    : 2 ,  //  connected       已链接
    RECONNECTING : 3 ,  //  reconnecting    再次链接
    REQUESTING   : 4 ,  //  requesting      请求中
    DISCONNECT   : 5 ,  //  disconnect      断开连接
    CLOSED       : 6 ,  //  closed          关闭
    HEARTBEATOUT : 7 ,  //  heartbeatout    心跳 
};

function SocketHelper(){
    this.state          = state.INITED;
    this.host           = null;
    this.port           = null;
    this.timer          = null;
    this.onKicked       = false ;  //如果是kick的，不再自动重连
    this.disconnectSelf = false ;  //如果是自己dis的，不再自动重连
}



/**
 * exports
 */
module.exports = new SocketHelper();


/***
 * initNet
 */
SocketHelper.prototype.initNet = function( cb ){
    this.state = state.INITED ;
    this.serverList = [{
        host: '118.25.176.115',
        port: '31101'
    }];
    this.connect( cb , ()=>{ this.onListeners() } );
};

/**
 * 
 */
SocketHelper.prototype.setAServer = function(){
    let index = 0;
    this.host = this.serverList[ index ].host ;
    this.port = this.serverList[ index ].port ;
    return index ; 
};


/***
 * connect
 */
SocketHelper.prototype.connect = function( cbConnected , cbDone ){
    cc.log( '@ check connecting ');

    // 只有 inited 和 dis 状态允许连接
    if( this.state != state.INITED && this.state != state.DISCONNECT ) return ;
    this.state = state.CONNECTING ;

    // MsgHelper.pushLoading();

    this.setAServer();  // reset a server
    pomelo.init( { host : this.host  , port: this.port } , ()=>{
        this.onConnected();
        if( cbConnected ) cbConnected();
    });
    
    if( cbDone ) cbDone();
    log( "@ connecting host:" + this.host + ' port:' + this.port );
};

SocketHelper.prototype.onListeners = function(){
    pomelo.on( 'close'      , this.onClose.bind(this) );
    pomelo.on( 'disconnect' , this.onDisconnect.bind(this) );
    pomelo.on( 'heartbeat timeout' , this.onHeartbeatTimeout.bind(this) );
    pomelo.on( 'onKick'     , this.onKick.bind(this) );
};


SocketHelper.prototype.onConnected = function(){
    log('@ server connected ') ;
    this.state   = state.CONNECTED ;
    this.clearHandler();
    // MsgHelper.removeLoading();   
};

SocketHelper.prototype.onReConnected = function(){
    // if( this.onKicked || this.disconnectSelf ) return ;
    log('@ server reconnected ') ;
    GameHelper.autoLogin();
};

SocketHelper.prototype.onLoginSuccess = function(){
    log('@ login success ') ;
    this.onKicked = false ;
    // this.disconnectSelf = false ;
};

SocketHelper.prototype.onKick = function(){
    // this.state = state.K ;
    this.onKicked = true ;
    // MsgHelper.pushLoading();
    GameHelper.loadLoginScene( ()=>{MsgHelper.pushToast($G.gStrings.Error.AccountError)} );
}

SocketHelper.prototype.disconnect = function(){
    /**
     * TODO:测试代码需要打苹果包测试，，目前安卓没问题
     */
    // this.disconnectSelf = true ;
    $G.gCData.gIsLogined = false ;
    this.state = state.DISCONNECT ;
    pomelo.disconnect();
}

SocketHelper.prototype.onHeartbeatTimeout = function(){
    cc.log("@ onHeartbeatTimeout") ;
    this.state = state.HEARTBEATOUT ;
    // MsgHelper.pushLoading();
    // this.state = state.DISCONNECT ;
    // this.reconnect();
}

SocketHelper.prototype.onDisconnect = function(){
    cc.log("@ onDisconnect")
    this.state = state.DISCONNECT ;
    this.reconnect();
}

SocketHelper.prototype.onClose = function(){
    log('@ onClose State : ');
    this.state = state.CLOSED ;
    // MsgHelper.pushLoading();
    // this.state = state.DISCONNECT ;
    // this.reconnect();
};

SocketHelper.prototype.clearHandler = function(){
    if( this.timer == null ) return ;
    clearTimeout( this.timer );
    this.timer = null ;
};

SocketHelper.prototype.reconnect = function(){
    if( this.timer != null ) return ;
    this.retryConnect();
    this.timer = setTimeout( this.retryConnect.bind(this) , 1000 );
    // MsgHelper.pushLoading();
};

SocketHelper.prototype.retryConnect = function(){
    cc.log( "@ retry connect ");    
    this.clearHandler();
    this.connect( this.onReConnected.bind(this) );
};

SocketHelper.prototype.isConnected = function(){
    return this.state === state.CONNECTED ;
}


/***
 * < request >
 * 
 * 如果 params || cb1 || cbError 是bool值，则为showloading参数
 */
SocketHelper.prototype.request = function( route , params = {} , cb1 = null , cbError = null , showLoading = null ){
    log("@ prepare to request : " + route + " State: " + this.state );

    // 超时呢
    // if( this.state === state.REQUESTING ){
    //     MsgHelper.pushToast($G.gStrings.Error.LoadingNet) ;
    //     return ;
    // }
    // if( this.state == state.CONNECTED ){  
    //     cc.director.loadScene('LoginScene');
    //     MsgHelper.pushToast($G.gStrings.Error.NetError);
    //     return;
    // }
    if( this.state === state.CONNECTED ){
        this.state = state.REQUESTING ;
    }

    // ShowLoading
    // let show = showLoading ? showLoading : false ;
    // if( showLoading === null ){
    //     let hasBoolean = _.isBoolean( params ) || _.isBoolean( cb1 ) || _.isBoolean( cbError );
    //     if( hasBoolean ){
    //         if( _.isBoolean( params ))  show = params  ;
    //         if( _.isBoolean( cb1 ))     show = cb1     ;
    //         if( _.isBoolean( cbError )) show = cbError ;
    //     }
    // } 
    // if( show ) MsgHelper.pushLoading();
    
    // request
    log("@ request sended : " + route );
    cc.log('params ------- ',  params );
    // let before = TimeHelper.getCTime() ;
    pomelo.request( route, params, (data) => {
        if( this.state === state.REQUESTING ){
            this.state = state.CONNECTED;
            // MsgHelper.removeLoading();
            if( data.code === 200 ){
                // let off = TimeHelper.getCTime() - before;
                // log("@ responsed : " + route + " delay: " + off );
                log( data.msg );
                if( cb1 && _.isFunction(cb1) ) cb1( data.msg );
            }else{
                log("@ request error : " + route + " Error code : " + data.code + ' : ' + data.msg );
                // if( cbError && _.isFunction(cbError) ){
                //     cbError( data );
                // }else{
                //     // let info = data.msg + ' (error:' + data.code + ')';
                //     let info = data.msg ;
                //     // MsgHelper.pushToast( info );
                // }
            }
        }
    });
};


/***
 * < onNetListener >
 */
SocketHelper.prototype.onNetListener = function(route, callback){
    pomelo.on(route, callback); 
};


/***
 * < offNetListener >
 */
SocketHelper.prototype.offNetListener = function(route, callback){
    pomelo.off(route, callback);
};


