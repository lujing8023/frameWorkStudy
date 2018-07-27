var Crypt = require('CryptUtil').pidCryptUtil;
        
 
/**
 * initHelper
 */
function initHelper(){
    
    // debug - 必查
    // cc.sys.localStorage.removeItem("GameLocalData");

    _initGlobalData();
    _loadLocalData();  

    return module.exports ;
};


/**
 * saveAllData
 */
function saveAllData( ) {
    cc.log("saveAllData");
    
    var gameLocalData = JSON.stringify( gLocalData );
    // gameLocalData     = Crypt.encrypt( gameLocalData , "key" );
    gameLocalData     = Crypt.encodeBase64( gameLocalData , true );
    cc.sys.localStorage.setItem("GameLocalData", gameLocalData);
};


//init 全局变量
function _initGlobalData(){
    cc.log("@@@@@@loadGlobalData") ;

    /**
     * libs
     */
    window._                    = require('underscore');
    // window.BN                   = require('big-number') ;  
    // let qr                      = require('qrcode');
    // window.QRCode               = qr.QRCode ;
    // window.QRErrorCorrectLevel  = qr.QRErrorCorrectLevel ;

    /**
     * Configs
     */
    // window.Configs           = require('Configs');
    window.ServerRouters     = require('ServerRouters');
    // window.HttpRouters       = require('HttpRouters');
    // window.Constants         = require('Constants');
    require('GlobalGameData').init();

    /**
     * Helpers
     */
    // window.ActionHelper      = require('ActionHelper');
    // window.DeviceHelper      = require('DeviceHelper'); //二维码 
    window.NPHelper          = require('NPHelper');
    // window.PBHelper          = require('PBHelper');
    // window.StringHelper      = require('StringHelper');
    // window.StringCheckHelper = require('StringCheckHelper');
    // window.TexHelper         = require('TexHelper');//获取图片资源
    // window.TimeHelper        = require('TimeHelper');
    // window.GameHelper        = require('GameHelper').initHelper();   // @todo？？？？？
    window.NotifyHelper      = require('NotifyHelper');//????
    window.CCLoaderHelper    = require('CCLoaderHelper');
    // window.MathHelper        = require('MathHelper').initHelper();
    window.MsgHelper         = require('MsgHelper').initHelper();
    // window.PlatformHelper    = require('PlatformHelper');//???
    // window.WXHelper          = require('WXHelper');
    // window.MWHelper          = require('MWHelper');
    // window.FuncHelper        = require('FuncHelper');
    // window.RandomListHelper  = require('RandomListHelper');
    // window.NativeHelper      = require('NativeHelper');
    // window.ObjHelper         = require('ObjHelper');
    window.SocketHelper      = require('SocketHelper');
    // window.HttpHelper        = require('HttpHelper');
    // window.EtherHelper       = require('EtherHelper');
    // window.ListAddItemHelper = require('ListAddItemHelper');
    // window.UpdateHelper      = require('UpdateHelper');
    // window.AudioHelper       = require('AudioHelper');
    //temp 废弃废弃废弃废弃  用替代AudioMgr_Game
    // window.AudioMgr_Game    = require('AudioMgr_Game');
    
    /**
     * Handlers
     */
    // window.UserHandler       = require('UserHandler');
    // window.RoomHandler       = require('RoomHandler');
    // window.WalletHandler     = require('WalletHandler');
    // window.NoticeHandler     = require('NoticeHandler');
    // window.RankHandler       = require('RankHandler');
    // window.RankListHandler       = require('RankListHandler');
    // window.RecordsHandler    = require('RecordsHandler');
    window.HttpHandler       = require('HttpHandler');
    // window.GroupHandler      = require('GroupHandler');
    // window.RoomHistoryHandler= require('RoomHistoryHandler');
    // window.MailHandler       = require('MailHandler');
    // window.RoomActionHandler = require('RoomActionHandler');
    // window.ChatHandler       = require('ChatHandler');
    // window.ShareHandler      = require('ShareHandler');
    
    /**
     * Servers
     */
    window.UserServer        = require('UserServer');
    // window.ChatServer        = require('ChatServer');
    window.RoomServer        = require('RoomServer');
    // window.HttpServer        = require('HttpServer');
    // window.ShopServer        = require('ShopServer') ;
    // window.GroupServer       = require('GroupServer') ;
    // window.MailServer        = require('MailServer');
    // window.RoomHistoryServer = require('RoomHistoryServer');
    // window.RoomRecordServer  = require('RoomRecordServer');
    // window.LoginServer       = require('LoginServer');
    // window.EtherServer       = require('EtherServer');
    // window.ShareServer       = require('ShareServer');
    // window.AirdropServer     = require('AirdropServer');
    // window.NoticeServer      = require('NoticeServer');
    // window.RankServer        = require('RankServer');
    // window.RankListServer    = require('RankListServer');
    /**
     * Managers
     */
    // window.JsonMgr           = require('JsonMgr');
    // window.AudioMgr_Hall     = require('AudioMgr_Hall');
    /**
     * Game MGR
     * 定义的全局类有：GameMsgHandler、GameMsgServer、GameLogic、AudioMgr_Game
     */
    window.GamesMgr          = require('GamesMgr');

    /**
     * Logics
     */
    // window.VoiceNative      = require('VoiceNative');

    

    /**
     * Scenes
     */ 
    window.gLoginScene       = null ;
    window.gChooseScene      = null ;
    window.gHallScene        = null ;
    window.gGameScene        = null ;

};

//从本地读取数据
function _loadLocalData() {
    
    cc.log("@@@@@@loadLocalData") ;

    let _isNull = function( newParam ){
        return ( newParam == undefined || newParam == null );
    }

    let defaultData = {   
        dataVersion : 2 ,
        userInfo : 
        { 
            platform    : ''            ,  // line/wx/fb...
            account     : ''            ,
            areaCode    : '86'          ,
            phone       : ''            ,
            password    : ''            ,
            tableBg     : 0             ,
        },
        sysInfo :
        {   
            shouldMusic          : true ,
            shouldEffect         : true ,
            agreeAgreement       : true ,
            rememberPassWord     : true
        },
        roomChoices : {
            nn : [ 0 , 0 ] ,
            dz : [ 0 , 0 ] ,
            bjl: [ 0 , 0 ] ,
            zjh: [ 0 , 0 ]
        }
    };     

    var data  = cc.sys.localStorage.getItem("GameLocalData"); 
    if( data != null ){
        // data = XXTea.xxtea_decrypt( data , "key" );
        data = Crypt.decodeBase64( data , true );
        data = JSON.parse(data); 
    }else{
        data = defaultData ;
    }
    
    _checkVersion( data , defaultData );

    cc.log( data );
    
    window.gLocalData = data;  
};

function _checkVersion( last , current ){
    let lastVersion = last.dataVersion ;
    let currVersion = current.dataVersion ;
    if( currVersion > lastVersion ){
        last.dataVersion = currVersion ;
        // if( currVersion == 2 ){
        //     last.roomChoices = { nn : [ 0 , 0 ] };
        // }
    }
};


module.exports = {
    initHelper      : initHelper  ,
    saveAllData     : saveAllData ,
};