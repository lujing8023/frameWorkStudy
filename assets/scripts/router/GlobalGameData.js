/**
 * 定义本地客户端设置
 */
var global = module.exports ;

global.init = function(){
    // Global
    window.$G = {} ;

    // Languages
    // $G.gStrings = require('TraditionalChinese') ;
    $G.gStrings = require('SimpleChinese') ;

    global._initNtfs();
    global._initCData();
    global._initSData();
}

global._initSData = function(){
    window.$G.gSData            = {};
    $G.gSData.gCData            = null ;
    $G.gSData.gRoom             = null ;
    $G.gSData.gRoomResult       = null ;
    $G.gSData.gWallet           = {}   ;
    $G.gSData.gShare            = {}   ;
    $G.gSData.gNotice           = {}   ;
    $G.gSData.gRankList         = {}   ;
    $G.gSData.gRankSelf         = {}   ;
    $G.gSData.gSids             = []   ;
    $G.gSData.gCids             = []   ;
    $G.gSData.gHistory          = null ;  // 房间战绩
    $G.gSData.gGroup            = null ;
}

global._initCData = function(){
    $G.gCData                       = {};

     // COMMON
    $G.gCData.gIsLogined           = false ;
    $G.gCData.gIsGameDownloading   = false ;

    $G.gCData.gameChecked          = {} ; // 子游戏如果更新过一次了，就不再更新了，除非重启

    // { action , value }
    $G.gCData.gMagicWindow         = null ;

    // sys
    $G.gCData.gCurrentMusic        = null ;
    $G.gCData.gNoticeAutoShowed    = false ;
    $G.gCData.gIsVoiceRecordOrPlay = false ;

    $G.gCData.gRoomLeaved   = false ;
    $G.gCData.gIsLogined           = false ;

    // { action , value }
    $G.gCData.gMagicWindow         = null ;

    // sys
    $G.gCData.gCurrentMusic        = null ;
    $G.gCData.gLastUpdateInvite    = 0    ; // time

    // Room
    $G.gCData.gAreaType            = 0 ; // 0 普通场 , 1 group nornal , 2 group match
    $G.gCData.gRoomLeaved          = false ;


    // Game
    $G.gCData.gComPlayers          = [];
    $G.gCData.gSids                = [];
    $G.gCData.gCids                = [];

    //temp
    $G.gCData.gChatType            = 'emoji';  // text , face

    // CFG - 局数，房费，底注，翻倍，坐庄，选项
    $G.gCData.gRoomChoices              = { nn:[ 0 , 0 ] , dz:[ 0 , 0 ] , bjl : [ 0 , 0 ] ,zjh : [ 0 , 0 ]} ; //index , 记住选择，下次就不用重复选了
    $G.gCData.CreateRoom_BaseScore      = {
        nn : [ 10 , 20 , 30 , 50 , 100 , 200 , 300 , 500 , 1000 , 2000 , 3000 , 5000 , 7500 , 10000 , 20000 , 30000 , 50000 , 100000 ] ,
        dz : [ 100 , 200 , 300 , 500 , 1000 , 2000 , 3000 , 5000 , 7500 , 10000 , 20000 , 30000 , 50000 , 100000 ],
        bjl : [ 100 , 200 , 300 , 500 , 1000 , 2000 , 3000 , 5000 , 7500 , 10000 , 20000 , 30000 , 50000 , 100000 ],
        zjh : [ 100 , 200 , 300 , 500 , 1000 , 2000 , 3000 , 5000 , 7500 , 10000 , 20000 , 30000 , 50000 , 100000 ]
    };
    $G.gCData.CreateRoom_MinScore       = { nn:[] , dz:[] , bjl:[] , zjh:[]};
    _.each( $G.gCData.CreateRoom_BaseScore.nn , (score)=>{  $G.gCData.CreateRoom_MinScore.nn.push( score * 100 );  });
    _.each( $G.gCData.CreateRoom_BaseScore.dz , (score)=>{  $G.gCData.CreateRoom_MinScore.dz.push( score * 10 );  });
    _.each( $G.gCData.CreateRoom_BaseScore.bjl , (score)=>{  $G.gCData.CreateRoom_MinScore.bjl.push( score * 10 );  });
    _.each( $G.gCData.CreateRoom_BaseScore.zjh , (score)=>{  $G.gCData.CreateRoom_MinScore.zjh.push( score * 10 );  });
    // head
    $G.gCData.Head_Max          = 12 ;

    // Chat
    $G.gCData.Chat_FaceMax      = 53 ;
    $G.gCData.Chat_TextList     = [
        '伐好意思，刚接了个电话',
        '房间没满，房主在找几个嘛',
        '爆发吧我得小宇宙，这把我要通吃',
        '哥这桩一柱擎天，稳如泰山啊',
        '别磨蹭了，时间就是金钱',
        '哎呦我滴妈，手气有点旺哈哈',
        '把把都是赢，你咋不上天呐',
        '这...这牌，气得我手直抖',
        '四五六七八，嘿嘿，要的就是发',
        '放学别走，我要跟你再战三百回合',
    ];
}

global._initNtfs = function(){
    window.NOTIFY_UPDATE_ROOMCARD  = 'NOTIFY_UPDATE_ROOMCARD'       ;
    window.NOTIFY_UPDATE_EMAIL     = 'NOTIFY_UPDATE_EMAIL'          ;//邮件
    window.NOTIFY_CHECK_EMAIL      = 'NOTIFY_CHECK_EMAIL'           ;//邮件
    window.NOTIFY_MAGIC_WINDOW     = 'NOTIFY_MAGIC_WINDOW'          ;
    window.NOTIFY_GAME_IN          = 'NOTIFY_GAME_IN'               ;
    window.NOTIFY_GAME_OUT         = 'NOTIFY_GAME_OUT'              ;
    window.NOTIFY_ON_CLIPBOARD     = 'NOTIFY_ON_CLIPBOARD'          ;
    window.NOTIFY_KEY_BACK         = 'NOTIFY_KEY_BACK'              ; // 返回键
    window.NOTIFY_LOGINED          = 'NOTIFY_LOGINED'               ; // 登录成功

    /**
     * Records
     */
    window.NOTIFY_RECORDS_ADD                           = 'NOTIFY_RECORDS_ADD'                            ;
    window.NOTIFY_RECORDS_REMOVE                        = 'NOTIFY_RECORDS_REMOVE'                         ;
    window.NOTIFY_RECORDS_COMMAND_CHANGE_PLAYING        = 'NOTIFY_RECORDS_COMMAND_CHANGE_PLAYING'         ;
    window.NOTIFY_RECORDS_COMMAND_CHANGE_PLAYER         = 'NOTIFY_RECORDS_COMMAND_CHANGE_PLAYER'          ;
    window.NOTIFY_RECORDS_COMMAND_CHANGE_PLAYER_READY   = 'NOTIFY_RECORDS_COMMAND_CHANGE_PLAYER_READY'    ;
    window.NOTIFY_GROUP_APPLY_ADD       = 'NOTIFY_GROUP_ADD'                ;
    window.NOTIFY_GROUP_APPLY_REMOVE    = 'NOTIFY_GROUP_APPLY_REMOVE'       ;

    // Hall
    window.NOTIFY_USER_SETHEAD          = 'NOTIFY_USER_SETHEAD'             ;
    window.NOTIFY_ETH_UPDATE            = 'NOTIFY_ETH_UPDATE' 
    window.NOTIFY_CANDY_UPDATE            = 'NOTIFY_CANDY_UPDATE'                 ;

    // Voice 
    window.NOTIFY_VOICE_RECORD_START           = 'NOTIFY_VOICE_RECORD_START'          ; // 开始录音；msg : { max : 10 } 倒计时
    window.NOTIFY_VOICE_RECORD_CANCEL_ALERT    = 'NOTIFY_VOICE_RECORD_CANCEL_ALERT'   ; // 警告如果手指离开范围将取消录音
    window.NOTIFY_VOICE_RECORD_END             = 'NOTIFY_VOICE_RECORD_END'      ; // 录音结束
    window.NOTIFY_VOICE_RECORD_CANCEL          = 'NOTIFY_VOICE_RECORD_CANCEL'   ; // 取消录音
    window.NOTIFY_VOICE_RECORD_TOOSHORT        = 'NOTIFY_VOICE_RECORD_TOOSHORT' ; // 录音太短
    window.NOTIFY_VOICE_PLAY_START             = 'NOTIFY_VOICE_PLAY_START'      ; // 开始播放语音 msg : { cid : 0 , data : [11] } 
    window.NOTIFY_VOICE_PLAY_END               = 'NOTIFY_VOICE_PLAY_END'        ; // 结束播放 - 主动或被动

    // DZ
    window.NOTIFY_CHANGE_FOLLOW                = 'NOTIFY_CHANGE_FOLLOW'         ; // msg{ currentFollow : 100 }
    window.NOTIFY_UPDATE_NICK                  = 'NOTIFY_UPDATE_NICK'           ;

    // BJL
    window.NOTIFY_UPDATE_BANKERBTN             = 'NOTIFY_UPDATE_BANKERBTN'      ; 
    window.NOTIFY_SHOW_321                     = 'NOTIFY_SHOW_321'              ; 
    window.NOTIFY_CLOSE_CHAT                   = 'NOTIFY_CLOSE_CHAT'            ; //关闭聊天（显示或关闭聊天按钮）
    window.PLAYER_MY_BID                       = 'PLAYER_MY_BID'                ; //let msg = {}; msg.area = bidArea; msg.count = bidNum;
}
