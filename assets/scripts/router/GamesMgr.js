
/**
 * exports
 */
var helper         = module.exports;
var currentLogic   = null ;   
var currentGame    = ''   ;  // nn , dz ....

/**
 * initGame
 */
helper.initGame = function( game = 'nn' , relogin = true ){
    // if( currentGame == game ) return ;

    cc.log( '@ GamesMgr initGame :' + game );
    currentGame = game ;
    helper._initHandler();
    helper._initNetListeners();

    if( relogin ) UserServer.relogin( game );
};

/**
 * exitGame
 */
helper.exitGame = function(){
    cc.log( '@ GamesMgr exitGame :' + currentGame );

    currentGame    = '' ;
    currentLogic   = null ;
    helper._removeNetListeners();
    
};


/***
 * init
 */
helper._initNetListeners = function(){
    helper._removeNetListeners();
    SocketHelper.onNetListener( ServerRouters.OnAction_ROOM.ROUTE , helper._onHandleMsg );
    // SocketHelper.offNetListener( ServerRouters.OnAction_ROOM.ROUTE  , helper._onHandleMsg );
};

/***
 * remove
 */
helper._removeNetListeners = function(){
    SocketHelper.offNetListener( ServerRouters.OnAction_ROOM.ROUTE  , helper._onHandleMsg );
};


/***
 * _onHandleMsg
 */
helper._onHandleMsg = function( action ){
    // check error
    if( currentLogic == null ){
        cc.log('未定义游戏');
        return ;
    }

    // handle data
    currentLogic.onHandleMsg_Data( action );

    // Notify ui
    NotifyHelper.notify( action.name , action.msg ) ;
}


/**
 * _initHandler
 */
helper._initHandler = function(){
    let game = currentGame ;
    switch( game ){
        case 'nn' :
            currentLogic            = require('GameMsgLogic_NN');
            window.GameMsgHandler   = require('GameMsgHandler_NN');
            window.GameMsgServer    = require('GameMsgServer_NN');
            window.GameLogic        = require('GameLogic_NN');
            window.AudioMgr_Game    = require('AudioMgr_NN');
            break;
        // case 'dz' :
        //     currentLogic            = require('GameMsgLogic_DZ');
        //     window.GameMsgHandler   = require('GameMsgHandler_DZ');
        //     window.GameMsgServer    = require('GameMsgServer_DZ');
        //     window.GameLogic        = require('GameLogic_DZ');
        //     window.AudioMgr_Game    = require('AudioMgr_DZ');
        //     break ;
        // case 'bjl' :
        //     currentLogic            = require('GameMsgLogic_BJL');
        //     window.GameMsgHandler   = require('GameMsgHandler_BJL');
        //     window.GameMsgServer    = require('GameMsgServer_BJL');
        //     window.GameLogic        = require('GameLogic_BJL');
        //     window.AudioMgr_Game    = require('AudioMgr_BJL');
        //     break ;
        // case 'bcbm' :
        //     currentLogic            = require('GameMsgLogic_BCBM');
        //     window.GameMsgHandler   = require('GameMsgHandler_BCBM');
        //     window.GameMsgServer    = require('GameMsgServer_BCBM');
        //     window.GameLogic        = require('GameLogic_BCBM');
        //     window.AudioMgr_Game    = require('AudioMgr_BCBM');
        //     break ;
        // case 'zjh' :
        //     currentLogic            = require('GameMsgLogic_ZJH');
        //     window.GameMsgHandler   = require('GameMsgHandler_ZJH');
        //     window.GameMsgServer    = require('GameMsgServer_ZJH');
        //     window.GameLogic        = require('GameLogic_ZJH');
        //     window.AudioMgr_Game    = require('AudioMgr_ZJH');
        //     break ;
        // case 'lx9' :
        //     currentLogic            = require('GameMsgLogic_LX9');
        //     window.GameMsgHandler   = require('GameMsgHandler_LX9');
        //     window.GameMsgServer    = require('GameMsgServer_LX9');
        //     window.GameLogic        = require('GameLogic_LX9');
        //     window.AudioMgr_Game    = require('AudioMgr_LX9');
        //     break ;        
        // case 'yybf' :
        //     currentLogic            = require('GameMsgLogic_YYBF');
        //     window.GameMsgHandler   = require('GameMsgHandler_YYBF');
        //     window.GameMsgServer    = require('GameMsgServer_YYBF');
        //     window.GameLogic        = require('GameLogic_YYBF');
        //     window.AudioMgr_Game    = require('AudioMgr_YYBF');
        //     break ;    
        // case 'slwh' :
        //     currentLogic            = require('GameMsgLogic_SLWH');
        //     window.GameMsgHandler   = require('GameMsgHandler_SLWH');
        //     window.GameMsgServer    = require('GameMsgServer_SLWH');
        //     window.GameLogic        = require('GameLogic_SLWH');
        //     window.AudioMgr_Game    = require('AudioMgr_SLWH');
        //     break ;      
    }
}