/**
 * 
 * Game全局Helper
 * 
 */




/**
 * exports
 */
var helper = module.exports;

/**
 * initHelper
 */
helper.initHelper = function(){
    // EVENT_SHOW & EVENT_HIDE
    cc.game.on( cc.game.EVENT_SHOW , helper.gameShow );
    cc.game.on( cc.game.EVENT_HIDE , helper.gameHide );

    // KEY
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, helper.onKeyDown );

    return helper ;
};

/**
 * gameShow
 */
helper.gameShow = function(){
    cc.log( '@@ $G SHOW' );
    NotifyHelper.notify('NOTIFY_GAME_IN');
}


/**
 * gameHide
 */
helper.gameHide = function(){
    cc.log( '@@ $G HIDE' );
    NotifyHelper.notify('NOTIFY_GAME_OUT');
}

/**
 * onKeyDown
 */
helper.onKeyDown = function(event) {
    switch(event.keyCode) {
        case cc.KEY.back:
            //TODO 切换场景操作
            NotifyHelper.notify('NOTIFY_KEY_BACK');
            break;
    }
}

/**
 * return to Hall 
 */


/**
 * 检查是不是在审核中
 */
helper.isIOSReviewing = function(){
    // 一定判断版本，不然审核隐藏功能时会影响老用户
    if( cc.sys.os === cc.sys.OS_IOS ){
        if( HttpHandler.getConfig('IOSReviewBuild') == Configs.IOSReviewBuild ){
            return HttpHandler.getConfig('IOSReviewing') ;
        }
    }
    return false ;
}


/**
 * autoLogin
 */
helper.autoLogin = function(){
    // browser
    // if (!cc.sys.isNative || Configs.PACKAGE_NAME == Configs.PACKAGE_NAME_DEBUG){
    //     let name = ( gLocalData.userInfo.account == '') ? _.random(1000000,9999999) + '' : gLocalData.userInfo.account ;
    //     UserServer.guestLogin( name );
    //     return ;
    // }

    //native
    // let account = gLocalData.userInfo.account ;
    // if( account && _.size(account)>0 ){
    //     UserServer.platformLoginFast( account );
    // }else{
    //     PlatformHelper.loginByPlatform( 'line' );
    // }

    // 10游客  11账号密码
    let accountType = UserHandler.getData().type ;
    let account     = gLocalData.userInfo.account ;
    let phone       = gLocalData.userInfo.phone ;
    let pass        = gLocalData.userInfo.password ;
    if( accountType == 10 ){
        if( account && _.size(account)>0 ){
            // let name = ( gLocalData.userInfo.account == '') ? _.random(1000000,9999999) + '' : gLocalData.userInfo.account ;
            UserServer.guestLogin( account );
            return ;
        }
    }else{
        if( phone && _.size(phone)>0 && pass && _.size(pass)>0 ){
            UserServer.authLogin( gLocalData.userInfo.areaCode + phone , pass );
            return ;
        }
    }
    MsgHelper.pushToast('重连失败，请重新登录');
}



/**
 * 
 */
helper.onClipboard = function( msg , node = null ){
    FuncHelper.addFunc( ()=>{
        let appname = StringHelper.pickString( msg.detail , 0 , '【' );
        if( appname == Configs.APPName ){
            let id = StringHelper.pickString( msg.detail , '号' , '】' );
            if( id != null ){
                PBHelper.addNode( 'DlgJoinRoom2' , node , (dlgnode)=>{
                    dlgnode.getComponent('DlgJoinRoom2').init( id );
                    PlatformHelper.copyToClipboard('');
                });
            }
        }else{
            cc.log('@ not match');
        }
    } , helper.isLogined ); 
}

helper.checkPastedRecordId = function( msg ){
   return StringHelper.pickStringAndCheck( msg , Configs.APPName ,0 , '【' , $G.gStrings.Common.code , '】');
}

helper.checkPastedRoomId = function( msg ){
    return StringHelper.pickStringAndCheck( msg , Configs.APPName ,0 , '【' , $G.gStrings.Common.number , '】');
}


/**
 * 检查是不是已登录状态
*/
helper.isLogined = function(){
    let isLogined = SocketHelper.isConnected() && $G.gCData.gIsLogined ;
    // MsgHelper.pushToast( SocketHelper.isConnected() , 0 );
    // MsgHelper.pushToast( $G.gCData.gIsLogined , 0 );
    return isLogined ;
}


helper.showNotice = function(){
    // if( cc.sys.os === cc.sys.OS_IOS ){
    //     if( HttpHandler.getConfig('IOSReviewBuild') == Configs.IOSReviewBuild ){
    //        return ;
    //     }
    // }
    //（公告）
    NoticeServer.getNotice(()=>{
        let msg = NoticeHandler.getPublicNotice( );
        if(msg.length > 0){
        // 给公告窗口init传一个值（公告窗口判断这个值）
            PBHelper.addNode( 'DlgPublicNotice' ,null , (node)=>{
                node.getComponent("DlgPublicNotice").init(true);
            })
        }else{
            cc.log( 'showNotice' );
            PBHelper.addNode( 'DlgNotice2' );
        }
    })
}

helper.showNoticeAuto = function(){
    cc.log( '##############' + $G.gCData.gNoticeAutoShowed )
    if( !$G.gCData.gNoticeAutoShowed ){
        $G.gCData.gNoticeAutoShowed = true ;
        helper.showNotice();
    }
}


helper.showChargeGroup = function(){
    helper.showChargeHall();
}

helper.showChargeHall = function(){
    // if( Configs.PACKAGE_NAME == Configs.PACKAGE_NAME_HG ){
    //     PBHelper.addNode( 'DlgAgent' );
    // }else{
        // PBHelper.addNode( 'DlgCharge' );
        MsgHelper.pushToast(  $G.gStrings.Error.StillClose );

    // }
}

helper.loadLoginScene = function( cb ){
    cc.director.loadScene('LoginScene', cb );
}

helper.loadHallScene = function( cb ){
    // web || package all
    // if ( Configs.PACKAGE_MODE == Configs.PACKAGE_MODE_ALL || !cc.sys.isNative ){
        let callfunc = ()=>{
            // AudioMgr_Game.playMusic("loadHallScene");
            if(cb)cb();
        }
        cc.director.loadScene('hall', callfunc );
        return ;
    // }

    // var gameName = UpdateHelper.gameType();
    // var storagePath = UpdateHelper.genStoragePath(gameName);
    // cc.log(storagePath);
    // require(storagePath + "/src/dating.js");
    return;
}


helper.loadChooseScene = function( cb ){
    cc.director.loadScene('hall' ,()=>{
       if(cb)cb();
    });
}

helper.loadGameScene = function( cb ){
    // web || package all
    if ( Configs.PACKAGE_MODE == Configs.PACKAGE_MODE_ALL || !cc.sys.isNative ){
        // MsgHelper.pushToast( 'enter game :' + cc.currentGame );
        let callfunc = ()=>{
            if(cb)cb();
            // AudioMgr_Game.playMusic("loadGameScene");
        }
        switch( cc.currentGame ){
            case 'dz' :
                cc.director.loadScene('GameScene_DZ', callfunc );
                break;
            case 'nn' :
                cc.director.loadScene('GameScene_NN', callfunc );
                break;
            case 'bjl' :
                cc.director.loadScene('GameScene_BJL', callfunc );
                break;
            case 'bcbm' :
                cc.director.loadScene('GameScene_BCBM', callfunc );
                break;
            case 'zjh' :
                cc.director.loadScene('GameScene_ZJH', callfunc );
                break;
            case 'lx9' :
                cc.director.loadScene('GameScene_LX9', callfunc );
                break;
            case 'yybf' :
                cc.director.loadScene('GameScene_YYBF', callfunc );
                break;
            case 'slwh' :
                cc.director.loadScene('GameScene_SLWH', callfunc );
                break;
        }
        return;
    }

    // native 
    UpdateHelper.init(cc.currentGame);
    var searchPaths = jsb.fileUtils.getSearchPaths();
    var storagePath = UpdateHelper.storagePath();
    cc.log("storagePath = ", storagePath);
    searchPaths.unshift(storagePath);
    jsb.fileUtils.setSearchPaths(searchPaths);
    helper.resortSearchPaths(cc.currentGame);
    require(storagePath + "/src/main.js");
}

helper.resortSearchPaths = function (topGameName) {
    let searchPaths = jsb.fileUtils.getSearchPaths();
    cc.log("[SearchPaths] 处理之前 = ", searchPaths);

    let newSearchPaths = [];

    for (let path of searchPaths) {
        if (path.indexOf(topGameName) > 0) {
            newSearchPaths.push(path);
            break;
        }
    }
    newSearchPaths.push(searchPaths.pop());

    jsb.fileUtils.setSearchPaths(newSearchPaths);

    // let newSearchPaths = [];
    // for (var i in searchPaths) {
    //     var isExist = false;
    //     for (var j in newSearchPaths) {
    //         if (newSearchPaths[j] == searchPaths[i]) {
    //             isExist = true;
    //             break;
    //         }
    //     }
    //     isExist || newSearchPaths.push(searchPaths[i]);
    // }
    // for (var i in newSearchPaths) {
    //     console.log(newSearchPaths[i]);
    //     if (newSearchPaths[i].indexOf(topGameName) > 0) {
    //         console.log(newSearchPaths[i]);
    //         var temp = newSearchPaths.splice(i, 1)[0];
    //         newSearchPaths.unshift(temp);
    //         console.log(temp);
    //         break;
    //     }
    // }   
    // jsb.fileUtils.setSearchPaths(newSearchPaths);

    // var searchPaths = jsb.fileUtils.getSearchPaths();
    // cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
    
    cc.log("[SearchPaths] 处理之后 = ", newSearchPaths);
},

/**
 * 返回人数
 */
helper.getPlayerCounts = function(){
    let max       = 6 ;
    let dau       = HttpHandler.getConfig('BaseDAU')[ cc.currentGame ];
    dau = dau ? dau : 1000 ;
    let scaleDay  = [ 1.0 , 0.8 , 0.6 , 0.4 , 0.2 , 0.15 , 0.1 , 0.05 , 0.1 , 0.2 , 0.3 , 0.4 ,
                      0.5 , 0.6 , 0.65 , 0.7 , 0.75 , 0.8 , 0.85 , 0.9 , 0.95 , 1.0 , 1.0 , 1.0 ] ;
    let scaleRoom = [ 0.2 , 0.33 , 0.28 , 0.16 , 0.05 , 0.01 ];
    let hour      = new Date().getHours();
    cc.log( 'hour:' + hour );
    let ret       = [];
    _.times( max , (i)=>{
        ret.push( Math.max( 2 , parseInt ( dau * scaleRoom[i] * scaleDay[hour] * _.random( 97 , 103 ) * 0.01 ) ) );
    });
    cc.log( ret );
    return ret ;
}


/**
 * getShareUrl
 * 
 * return : http://s22222.tgeili.com/up/reg.html?r=111
 */
helper.getShareUrl = function(){
    // let range    = HttpHandler.getConfig('ShareUrlRange') ;
    // let urlParts = HttpHandler.getConfig('ShareUrlParts') ;
    // let num   = _.random( range[0] , range[1] );
    // let url   = urlParts[0] + num + urlParts[1] ;
    let url = 'http://' + _.random( 999999 ).toString(32) + '.tgeili.com/up/reg.html' ;
    url += ( '?r=' + UserHandler.getId() ) ;
    cc.log( url );
    return url ;
}

/**
 * getGameRulesUrl
 * return : http://web.tgeili.com/#/gamerules?name=dz
 * return : http://web.tgeili.com/up/gamerules.html?name=dz
 */
helper.getGameRulesUrl = function( game ){
    let host = HttpHandler.getConfig('HttpList')[0].host ;
    let url  = 'http://' + host + '/up/gamerules.html' ;
    if( game ) url += ( '?name=' + game );
    cc.log( url ) ;
    return url ;
}



/**
 * 
 */
helper.addGameRulesView = function( isGame = false ){
    let url = helper.getGameRulesUrl( isGame ? cc.currentGame : null );
    PBHelper.addNode( 'DlgWebView' , null , (node)=>{
        node.getComponent('DlgWebView').init( url );
    });
}