
/**
 * PlatformHelper 2.0 
 * 
 * optims with NativeHelper
 * 
 * 2018/2/3
 */

var helper = module.exports ;


/**
 * CONFIGS
 */
var VOID                            = 'void';
var BOOL                            = 'boolean' ;
var INT                             = 'int' ;
var FLOAT                           = 'float' ;
var STRING                          = 'string' ;
var ClassName_Android               = 'com/helper/StaticHelper';
var ClassName_IOS                   = 'StaticHelper';

// Funcs
var Func_SetGLGameState             = 'setGLGameState'      ;
var Func_CopyToClipboard            = 'copyToClipboard'     ;
var Func_GetFromClipboard           = 'getFromClipboard'    ;
var Func_GetBattery                 = 'getBattery'          ;
var Func_GetGPSInfo                 = 'getGPSInfo'          ;
var Func_GetGPSDistance             = 'getGPSDistance'      ;
var Func_LoginByPlatform            = 'loginByPlatform'     ;
var Func_ShareLocalImage            = 'shareLocalImage'     ;
var Func_ShareUrlImage              = 'shareUrlImage'       ;
var Func_ShareText                  = 'shareText'           ;



/**
 * @return web 1 , android 2 , ios 3
 */
helper.getPlatformType = function(){
    if( cc.sys.isBrowser )                  return 1 ;
    if( cc.sys.os === cc.sys.OS_ANDROID )   return 2 ;
    if( cc.sys.os === cc.sys.OS_IOS )       return 3 ;
    if( cc.sys.os === cc.sys.OS_OSX )       return 4 ;
    if( cc.sys.os === cc.sys.OS_WINDOWS )   return 5 ;
    return -1 ;
};

/**
 * isMobile
 */
helper.isMobile = function(){
    let type = helper.getPlatformType();
    return ( type === 2 || type === 3 ) ;
};





/**
 * setGLGameState : 0 还未好 1：已完成初始化
 */
helper.setGLGameState = function( state = '1' ){
    helper._callNative( Func_SetGLGameState , VOID , state );
};


/**
 * 复制文本到粘贴板
 */
helper.copyToClipboard = function( content ){
    helper._callNative( Func_CopyToClipboard , VOID , content );
    if( cc.sys.isBrowser ){
        window.clipboardData = content; // 仅供本地测试，app重启失效，跨标签无效
    }
};

/**
 * 得到剪贴板内容
 */
helper.getFromClipboard = function(){
    if( cc.sys.isBrowser ){
        return window.clipboardData ;// 仅供本地测试，app重启失效，跨标签无效
    }
    return helper._callNative( Func_GetFromClipboard , STRING );    
};

/**
 * 得到电量
 */
helper.getBattery = function(){
    let battery = helper._callNative( Func_GetBattery , FLOAT ); 
    return battery ? battery : 50 ;
};

/**
 * GPS
 */
// 得到已经生成好的gps info ， 一旦有了info就不再生成新的，如果没有就从系统获取
// @return '' or '123|111|上海-浦东-XXX'
helper.getGPSInfo = ()=>{
    let info = helper._callNative( Func_GetGPSInfo , STRING ); 
    return info ; 
};

helper.onGPSSuccess = ( info )=>{
    MsgHelper.pushToast( info );
};

helper.getGPSDistance = ( latitude1 ,longitude1 , latitude2 ,longitude2 )=>{
    let dis = helper._callNative( Func_GetGPSDistance , FLOAT , latitude1 , longitude1 , latitude2 ,longitude2 ); 
};



/**
 * 第三方登录
 * 
 * name: 'line'
 */
helper.loginByPlatform = ( platformName )=>{
    helper._callNative( Func_LoginByPlatform , VOID , platformName );
}

helper.onLoginSuccess = ( uid , nick , head , sex )=>{
    nick = StringHelper.filterString( nick );
    UserServer.platformLogin( 'line' , 'tm' , uid , nick , head , sex );
}


/**
 * 分享文字
 */
helper.shareText = ( platformName , text )=>{
    cc.log( 'shareText: ' + text );
    helper._callNative( Func_ShareText , VOID , platformName , text );
}

/**
 * 分享截图 - 本地
 * 
 * channel
 */
helper.shareLocalImage = function( platformName , path , channel ){
    helper._callNative( Func_ShareLocalImage , VOID , platformName , path , channel );
};










/**
 * _callNative
 */
helper._callNative = function( funcName , retType ){
    let args = Array.prototype.slice.call(arguments)

    if( cc.sys.isBrowser ){
        return ;
    }else if( cc.sys.os === cc.sys.OS_IOS ){
        args.splice(0, 0, ClassName_IOS)
    }else if( cc.sys.os === cc.sys.OS_ANDROID ){
        args.splice(0, 0, ClassName_Android)
    }else{
        return ;
    }
    return NativeHelper.callClz.apply( NativeHelper , args );
};




















// /**
//  * 登录 - wxLogin
//  */
// helper.wxLogin = function( ){
//     if( cc.sys.os === cc.sys.OS_IOS ){
//         _callStaticMethod_ios( ClassName_IOS , Func_WxLogin_IOS , 0 );
//     }else if( cc.sys.os === cc.sys.OS_ANDROID ){
//        cc.log('wxLogin android');
//        _callStaticMethod_android( ClassName_Android , Func_WxLogin_Android , 0 );
//     }else{
//         return ;
//     }
// };


// /**
//  * 登录 - onWxLogin - native -> js
//  */
// helper.onWxLogin = function( openid ){
//     let debugInfo = '微信回调 onWxLogin()-> openid :' + openid ;
//     cc.log( debugInfo);
//     // MsgHelper.pushToast(debugInfo , 0 );
//     $G.gWxCode = openid ;
//     UserServer.wxLogin( openid );
// };


/**
 * 邀请朋友 , channel0 朋友，channel1 朋友圈
 */
helper.wxShareUrl = function( title , content , url , channel = 'friends' ){
    if( cc.sys.os === cc.sys.OS_IOS ){
       cc.log('wxShareUrl ios');
        _callStaticMethod_ios( ClassName_IOS , Func_WxShareUrl_IOS , 4 , title , content , url , channel);
    }else if( cc.sys.os === cc.sys.OS_ANDROID ){
       _callStaticMethod_android( ClassName_Android , Func_WxShareUrl_Android , 4 , title , content , url , channel );
    }
}


/**
 *  魔窗 - onMagicWindow
 *  action 1 : join room , value : roomid
 */
helper.onMagicWindow = function( action , value  ){
    let debugInfo = '微信回调 onMagicWindow()-> value :' + value ;
    cc.log( debugInfo);
    // MsgHelper.pushToast(debugInfo , 0 );

    $G.gCData.gMagicWindow = { action : action , value : value } ;
    NotifyHelper.notify( NOTIFY_MAGIC_WINDOW , $G.gCData.gMagicWindow );
    
};


/**
 * 分享截图 - wxShareImage
 */
helper.wxShareImage = function( path , channel ){
    if( cc.sys.os === cc.sys.OS_IOS ){
       cc.log('wxShareImage ios');
        _callStaticMethod_ios( ClassName_IOS , Func_WxShareImage_IOS , 2 , path , channel );
    }else if( cc.sys.os === cc.sys.OS_ANDROID ){
       cc.log('wxShareImage android');
       _callStaticMethod_android( ClassName_Android , Func_WxShareImage_Android , 2 , path , channel );
    }else{
        return ;
    }
};


/**
 * 支付 PAY
 */
helper.payByName = function( name ) {
    if( cc.sys.os === cc.sys.OS_IOS ){
       cc.log('payByName ios' + name);
        _callStaticMethod_ios( ClassName_IOS , Func_PayByName_IOS , 1 , name );
    }else if( cc.sys.os === cc.sys.OS_ANDROID ){
       MsgHelper.pushToast($G.gStrings.Error.RefuseAndroid)
    }else{
        return ;
    }
};


helper.onPayCallback = function( name ){
    cc.log("CCCC:onMaiCallback:" + name);
    OldHttpServer.addCard( UserHandler.getId() , 34 , ()=>{
        MsgHelper.pushToast( $G.gStrings.CommonTips.BuySuccess , 0 );
        MsgHelper.pushToast( $G.gStrings.CommonTips.ToastSuccess , 0 );
    })
    
    // MsgHelper.pushToast( $G.gStrings.CommonTips.BuySuccess , 0 );
};

// helper.payByWX = function( partnerId , prepayId , thePackage , nonceStr , timeStamp , sign ){
//     timeStamp += '';
//     cc.log("jsjsjs MAIByWX : " + timeStamp )

//     if( cc.sys.os === cc.sys.OS_IOS ){
//        cc.log('MAI ios');
//         _callStaticMethod_ios( ClassName_IOS , "payByWX::::::" , 6 , partnerId , prepayId , thePackage , nonceStr , timeStamp , sign );
//     }else if( cc.sys.os === cc.sys.OS_ANDROID ){
//        cc.log('MAI android');
//        _callStaticMethod_android( ClassName_Android , "payByWX" , 6 , partnerId , prepayId , thePackage , nonceStr , timeStamp , sign );
//     }else{
//         return ;
//     }
// };


