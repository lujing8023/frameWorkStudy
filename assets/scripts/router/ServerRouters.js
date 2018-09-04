
/***
 * Request - User
 */
module.exports.RqUser                   = {} ;
module.exports.RqUser.login             = 'connector.authorizationHandler.login'                ;  // game:tm gps:null
module.exports.RqUser.relogin           = 'connector.authorizationHandler.relogin'              ; 
module.exports.RqUser.logout            = 'user.userHandler.logout'                             ;
module.exports.RqUser.bindRecommender   = 'user.userHandler.bindRecommender'                    ;
module.exports.RqUser.applyMoney        = 'user.userHandler.applyMoney'                         ;
module.exports.RqUser.charge            = 'user.userHandler.charge'                             ;  // type=1 支付宝 count 传数量
module.exports.RqUser.tradeItem         = 'user.userHandler.tradeItem'                          ;  // target 对方id itemid 现在只能交易4 count 传数量
module.exports.RqUser.setDesp           = 'user.userHandler.setDesp'                            ;  // desp 0到100个字符
module.exports.RqUser.platformLogin     = 'connector.authorizationHandler.login'                ;  // game:tm gps:null
module.exports.RqUser.platformLoginFast = 'connector.authorizationHandler.fastLogin'            ;
module.exports.RqUser.guestLogin        = 'connector.authorizationHandler.login'                ; 
module.exports.RqUser.sendRegisterCode  = 'connector.authorizationHandler.sendRegister'         ;  // 注册账号发送验证码  Param {string} account 账号
module.exports.RqUser.commitRegister    = 'connector.authorizationHandler.commitRegister'       ;  // 注册账号提交验证码  Param {string} account 账号  {string} code 验证码  {string} password 密码   {string} nick 昵称   {number} sex 性别 男(0) 女(1)
module.exports.RqUser.authLogin         = 'connector.authorizationHandler.auth'                 ;  // 授权登陆模式  Param {string} game 游戏  {string} account 账号  {string} password 密码  {json} gps gps信息
module.exports.RqUser.setHead           = 'user.userHandler.setHead'                            ;  // 设置头像  
module.exports.RqUser.setNick           = 'user.userHandler.setNick'                            ;  // Nick 修改昵称
module.exports.RqUser.setGPS            = 'user.userHandler.setGps'                             ; 




/**
 * OnAction - User
 */
module.exports.OnAction_User                 = {};
// module.exports.OnAction_User.ROUTE           = 'user.property.change'    ;
module.exports.OnAction_User.ROUTE           = 'user.attribute.action'    ;  // Change



/**
 * OnAction - Item
 */
module.exports.OnAction_Item                 = {};
// module.exports.OnAction_Item.ROUTE           = 'user.item.change'        ;
module.exports.OnAction_Item.ROUTE           = 'item.action'        ;   // Change


/**
 * OnAction - Broadcast系统广播
 */
module.exports.OnAction_Broadcast            = {};
// module.exports.OnAction_Broadcast.ROUTE      = 'message.broadcast'    ; // type id nick 和 content
module.exports.OnAction_Broadcast.ACTION            = 'broadcast.action'       ; //    内容格式 还是 name做为广播频道（name :constants.Broadcast.DEFAULT = _.constant('Default');） msg是字符串消息

//公告
module.exports.OnAction_Broadcast.PUBLIC_NOTICE     = 'broadcast.announce'       ;

//email推送
module.exports.OnAction_Broadcast.EMAIL             = 'push.mail.action'       ;


/**
 * OnAction - History
 */
module.exports.OnAction_History              = {};
// module.exports.OnAction_History.ROUTE        = 'user.history.add' ;


/**
 * OnAction - apply
 */
module.exports.OnAction_ApplyNotify                           = {};
module.exports.OnAction_ApplyNotify.ROUTE                     = 'guild.apply.action'  ;
module.exports.OnAction_ApplyNotify.ADD                       = 'ADD'                 ;
module.exports.OnAction_ApplyNotify.REMOVE                    = 'REMOVE'              ;
module.exports.OnAction_ApplyNotify.SUBSCRIBE_ADD             = 'SUBSCRIBE_ADD'       ;
module.exports.OnAction_ApplyNotify.SUBSCRIBE_REMOVE          = 'SUBSCRIBE_REMOVE'    ;



/**
 * OnAction - RoomRecords
 */
module.exports.OnAction_CreatedRecords                              = {};
module.exports.OnAction_CreatedRecords.ROUTE                        = 'room.agent.action' ;
module.exports.OnAction_CreatedRecords.ADD                          = 'ADD'               ;
module.exports.OnAction_CreatedRecords.REMOVE                       = 'REMOVE'            ;
module.exports.OnAction_CreatedRecords.COMMAND                      = 'COMMAND'           ;
module.exports.OnAction_CreatedRecords.COMMAND_CHANGE_PLAYING       = 1                   ; 
module.exports.OnAction_CreatedRecords.COMMAND_CHANGE_PLAYER        = 2                   ; 
module.exports.OnAction_CreatedRecords.COMMAND_CHANGE_PLAYER_READY  = 3                   ; 

/***
 * Request - Charge
 * 
 * type=1 支付宝 count 传数量
 */
module.exports.RqState                    = {} ;

/***
 * Request - Group YTNN
 */
module.exports.RqGroup_YTNN                         = {}                          ;
module.exports.RqGroup_YTNN.getZone                 = 'zone.matchHandler.getZone' ; // return { id : 1 区间id , params : {} 区间参数 - 比如牛币范围 房间底注等 ， users : 0 在线玩家数 }
module.exports.RqGroup_YTNN.match                   = 'zone.matchHandler.match'   ; // Param {area} area 匹配区间id



/***
 * Request - Room
 */
module.exports.RqRoom               = {}  
//baseScore 底分  capacity  人数  round  回合数                             ;
module.exports.RqRoom.createRoom    = 'zone.privateHandler.createRoom'     ;  // "game": "nn" , rounds : 10/20 ,timesMode : 1经典 2疯狂 , bankerMode : 1抢庄 2轮庄 3固定庄
module.exports.RqRoom.joinRoom      = 'zone.privateHandler.enterRoom'      ;  // id
module.exports.RqRoom.viewRoom      = 'zone.privateHandler.viewRoom'       ; 
module.exports.RqRoom.dismissRoom   = 'room.playHandler.dismiss'        ;  // 申请解散房间
module.exports.RqRoom.leaveRoom     = 'room.playHandler.leave'          ;
module.exports.RqRoom.reconnectRoom = 'room.playHandler.reconnect'      ;
module.exports.RqRoom.dismissVote   = 'room.playHandler.dismissVote'    ;//将玩家的请求解散房间状态切换成true或者false



/**
 * Request - Group
 */
module.exports.RqGroup                            = {}                                                ;
module.exports.RqGroup.createRoom                 = 'guild.roomHandler.createRoom'                    ;  // "game": "nn" , rounds : 10/20 ,timesMode : 1经典 2疯狂 , bankerMode : 1抢庄 2轮庄 3固定庄
module.exports.RqGroup.joinRoom                   = 'zone.privateHandler.enterRoom'                     ;  // id
module.exports.RqGroup.viewRoom                   = 'zone.privateHandler.viewRoom'                      ; 
module.exports.RqGroup.dismissRoom                = 'zone.privateHandler.dismissRoom'                   ;  // 解散房间：会长、副会长、助理、房主自己
module.exports.RqGroup.getList                    = 'guild.guildHandler.getGuilds'                    ;
module.exports.RqGroup.createGroup                = 'guild.guildHandler.createGuild'                  ; 
module.exports.RqGroup.joinDirectly               = 'guild.guildHandler.joinGuild'                    ;  // 免申请直接入会，id ，recommender
module.exports.RqGroup.joinApply                  = 'guild.guildHandler.applyGuild'                   ;  // 申请加入公会，id，recommender
module.exports.RqGroup.commitApply                = 'guild.guildHandler.commitApply'                  ;  // 同意or拒绝入会  userId , pass ， id
module.exports.RqGroup.adminCommitApply           = 'guild.guildHandler.commitApply'                  ;  // 助理审批
module.exports.RqGroup.setNotice                  = 'guild.guildHandler.setAnnoucement'               ;  // caption content , id
module.exports.RqGroup.listenGroup                = 'guild.guildHandler.subscribeGuild'               ;  // id 公会id scope监听范围  scope - 1 公会 2 成员列表 3 申请列表 4 自由场 5 比赛场
module.exports.RqGroup.unlistenGroup              = 'guild.guildHandler.unsubscribeGuild'             ; 
module.exports.RqGroup.changeScore                = 'guild.memberHandler.changeScore'                 ;  // userId 用户id score 分数  id公会id
// module.exports.RqGroup.changeScoreByAdmin         = 'guild.administratorHandler.changeScore'          ;  // userId 用户id score 分数
module.exports.RqGroup.changeScoreByPlayer        = 'guild.memberHandler.returnScore'                 ;  // 参数 score 只能正数
module.exports.RqGroup.kickMember                 = 'guild.memberHandler.kickMember'                  ;  // userId 用户id
module.exports.RqGroup.quitGroup                  = 'guild.memberHandler.quitGuild'                   ;  // id
module.exports.RqGroup.levelMember                = 'guild.memberHandler.levelMember'                 ;  // 参数 userId,level - level 1: 普通会员 2 ： 副会长 3：会长
module.exports.RqGroup.setAdnimistrator           = 'guild.memberHandler.setAdministrator'            ;  // administrator = true或者false
module.exports.RqGroup.removeBlacklist            = 'guild.memberHandler.removeBlacklist'             ;  // 参数userId
module.exports.RqGroup.listenGroupApplyNotify     = 'guild.applyHandler.subscribe'                    ;  // 管理员和会长自动监听消息通知的红点
module.exports.RqGroup.unlistenGroupApplyNotify   = 'guild.applyHandler.unsubscribe'                  ;  
module.exports.RqGroup.setAutoCommitApply         = 'guild.guildHandler.setAutoCommitApply'           ;  // autoCommitApply = true或者false(默认false)
module.exports.RqGroup.enterGuild                 = 'guild.guildHandler.enterGuild'                   ;
module.exports.RqGroup.enterArea                  = 'guild.guildHandler.enterArea'                    ;  // id:groupid  area:1/2
module.exports.RqGroup.leaveArea                  = 'guild.guildHandler.leaveArea'                    ;  
module.exports.RqGroup.pushFund                   = 'guild.guildHandler.pushFund'                     ; //参数id - guild 的id  count - 存入数量
module.exports.RqGroup.popFund                    = 'guild.guildHandler.popFund'                      ;
module.exports.RqGroup.setFundBaseLimit           = 'guild.guildHandler.setFundBaseLimit'             ; //参数 id fundBaseLimit




/**
 * OnAction - Group
 */
module.exports.OnAction_Group                   = {};
// module.exports.OnAction_Group.Self              = 'member.property.action'          ;
// module.exports.OnAction_Group.Others            = 'guild.member.action'             ;


/**
 * Room
 */
module.exports.OnAction_ROOM                            = {};
module.exports.OnAction_ROOM.ROUTE                      = 'room.action';


module.exports.OnAction_TWMJ                            = {};
module.exports.OnAction_TWMJ.ROUTE                      = 'room.action';
module.exports.OnAction_TWMJ.PLAYERINVITE               = 'PlayerInvite';
module.exports.OnAction_TWMJ.PLAYER_ENTER_ROOM          = 'PlayerEnterRoom';    // 玩家进入房间
module.exports.OnAction_TWMJ.PLAYER_LEAVE_ROOM          = 'PlayerLeaveRoom';    // 玩家离开房间 ， reason：1房间未开始时离开房间，2强制解散房间，3正常牌局结算和投票解散房间
module.exports.OnAction_TWMJ.PLAYER_READY               = 'PlayerReady';        // 玩家准备
module.exports.OnAction_TWMJ.PLAYER_HOST                = 'PlayerHost';         // 托管
module.exports.OnAction_TWMJ.SEAT_ADD_PLAYER            = 'SeatAddPlayer';      // 新增玩家
module.exports.OnAction_TWMJ.SEAT_REMOVE_PLAYER         = 'SeatRemovePlayer';   // 删除玩家
module.exports.OnAction_TWMJ.ROUND_BEGIN                = 'RoundBegin';         // 小局回合开始
module.exports.OnAction_TWMJ.ROUND_RESULT               = 'RoundResult';        // 小局回合结算
module.exports.OnAction_TWMJ.ROUND_END                  = 'RoundEnd';           // 小局回合结束，暂时没用
module.exports.OnAction_TWMJ.ROOM_CHAT                  = 'Chat';               // 聊天
module.exports.OnAction_TWMJ.ROOM_STATE_ROLL_DICE       = 'RoomStateRollDice';  // 摇塞子定庄
module.exports.OnAction_TWMJ.SEAT_SHUFFLE               = 'SeatShuffle';        // 移动玩家,更新位置时，刷新data里面的index数值
// DRAW（特殊字段after，表示从最后摸的牌，可判断杠开，） 
// PLAY（ draw 是不是正常摸牌，draw false 非正常摸牌，即明杠，吃碰以后没有摸过牌，进入打牌状态，不要显示杠，吃碰以后不能杠 ）
// PLAY ( flowerWin true 显示花胡 ，false 不处理花胡，自己判断自摸 ) 
// AFTER_PLAY 
// RESULT , 传了倒计时time , 一个round只出现一次
module.exports.OnAction_TWMJ.TURN_START                 = 'TurnStart';          
module.exports.OnAction_TWMJ.PLAYER_DEAL                = 'PlayerDeal';         // 发牌
module.exports.OnAction_TWMJ.PLAYER_DEAL_FLOWER         = 'PlayerDealFlower';   // 发牌后补花
module.exports.OnAction_TWMJ.PLAYER_DRAW                = 'PlayerDraw';         // 摸牌
module.exports.OnAction_TWMJ.PLAYER_FLOWER              = 'PlayerFlower';       // 玩家补花 ， 先flower再draw
module.exports.OnAction_TWMJ.PLAYER_GROUP               = 'PlayerGroup';        // 玩家吃碰杠,  吃和碰需要客户端自己右移和刷数据
module.exports.OnAction_TWMJ.PLAYER_LISTEN              = 'PlayerListen';       // 玩家报听
module.exports.OnAction_TWMJ.PLAYER_PLAY                = 'PlayerPlay';         // 玩家打牌
module.exports.OnAction_TWMJ.PLAYER_PASS                = 'PlayerPass';         // 玩家选择弃
module.exports.OnAction_TWMJ.DISMISS_START              = 'DismissStart';       // 解散开始
module.exports.OnAction_TWMJ.DISMISS_VOTE               = 'DismissVote';        // 解散投票
module.exports.OnAction_TWMJ.DISMISS_STOP               = 'DismissStop';        // 解散结束
module.exports.OnAction_TWMJ.ROOM_RESULT                = 'RoomResult';             // 牌局结算
module.exports.OnAction_TWMJ.ROOM_STATE_CHANGE_STATE    = 'RoomStateChangeState';   // 状态变化
module.exports.OnAction_TWMJ.PLAYER_WIN                 = 'PlayerWin';              // 玩家获胜 ，根据客户端效果待定
module.exports.OnAction_TWMJ.ROOM_PLAYING               = 'RoomPlaying';            // 房间游戏中状态变化
module.exports.OnAction_TWMJ.PLAYER_RESET               = 'PlayerReset';            // 玩家重置动作， 吃和碰时发送本消息 ， 可能会取消
module.exports.OnAction_TWMJ.ROOM_STATE_BANKER          = 'RoomStateBanker';        // 庄家变化，现在没发，在roomchangestate的时候已经重设好了





module.exports.RqGame_TWMJ             = {}                             ;
module.exports.RqGame_TWMJ.dismissVote = 'room.playHandler.dismissVote' ;  // vote: true.false
module.exports.RqGame_TWMJ.sendDismiss = 'room.playHandler.dismiss'     ;  // 请求解散
module.exports.RqGame_TWMJ.play        = 'room.playHandler.action'      ; 
module.exports.RqGame_TWMJ.ready       = 'room.playHandler.action'      ; 
module.exports.RqGame_TWMJ.chat        = 'room.playHandler.chat'        ;




/***
 * Request - Game
 */
module.exports.RqGame_FKNN             = {}                             ;
module.exports.RqGame_FKNN.roomAction  = 'room.playHandler.action'      ; // PLAYER_READY
module.exports.RqGame_FKNN.ready       = 'room.playHandler.action'      ;
module.exports.RqGame_FKNN.callBanker  = 'room.playHandler.action'      ;
module.exports.RqGame_FKNN.bet         = 'room.playHandler.action'      ;
module.exports.RqGame_FKNN.finish      = 'room.playHandler.action'      ;
module.exports.RqGame_FKNN.play        = 'room.playHandler.action'      ;
module.exports.RqGame_FKNN.sit         = 'room.playHandler.sit'         ;
module.exports.RqGame_FKNN.chat        = 'room.playHandler.chat'        ; // param: type (1 emoij / 2 format string / 3 custom string) , content( id or string)
//dz
module.exports.RqGame_FKNN.call         = 'room.playHandler.action'      ;

/***
 * Request - Game
 */
module.exports.RqGame_BJL             = {}                             ;
//bjl
module.exports.RqGame_BJL.playerBid             = 'room.playHandler.action'      ;
module.exports.RqGame_BJL.upBanker              = 'room.playHandler.action'      ;
module.exports.RqGame_BJL.downBanker            = 'room.playHandler.action'      ;
module.exports.RqGame_BJL.bankerList            = 'room.playHandler.action'      ;
module.exports.RqGame_BJL.roadList              = 'room.playHandler.action'      ;
module.exports.RqGame_BJL.playerBidRepeat       = 'room.playHandler.action'      ;


/***
 * Request - Game  BCBM
 */
module.exports.RqGame_BCBM             = {}                             ;
//BCBM
module.exports.RqGame_BCBM.playerBid             = 'room.playHandler.action'      ;
module.exports.RqGame_BCBM.upBanker              = 'room.playHandler.action'      ;
module.exports.RqGame_BCBM.downBanker            = 'room.playHandler.action'      ;
module.exports.RqGame_BCBM.bankerList            = 'room.playHandler.action'      ;
module.exports.RqGame_BCBM.roadList              = 'room.playHandler.action'      ;
module.exports.RqGame_BCBM.playerBidRepeat       = 'room.playHandler.action'      ;

/***
 * Request - Game  ZJH
 */
module.exports.RqGame_ZJH             = {}                             ;
module.exports.RqGame_ZJH.roomAction  = 'room.playHandler.action'      ; // PLAYER_READY
module.exports.RqGame_ZJH.ready       = 'room.playHandler.action'      ;
module.exports.RqGame_ZJH.callBanker  = 'room.playHandler.action'      ;
module.exports.RqGame_ZJH.bet         = 'room.playHandler.action'      ;
module.exports.RqGame_ZJH.finish      = 'room.playHandler.action'      ;
module.exports.RqGame_ZJH.play        = 'room.playHandler.action'      ;
module.exports.RqGame_ZJH.sit         = 'room.playHandler.sit'         ;
module.exports.RqGame_ZJH.chat        = 'room.playHandler.chat'        ; // param: type (1 emoij / 2 format string / 3 custom string) , content( id or string)
module.exports.RqGame_ZJH.look        = 'room.playHandler.chat'        ; // 用户通用行为

//dz
module.exports.RqGame_ZJH.call         = 'room.playHandler.action'      ;


/***
 * Request - Game
 */
module.exports.RqGame_YYBF             = {}                             ;
//bjl
module.exports.RqGame_YYBF.playerBid             = 'room.playHandler.action'      ;
module.exports.RqGame_YYBF.upBanker              = 'room.playHandler.action'      ;
module.exports.RqGame_YYBF.downBanker            = 'room.playHandler.action'      ;
module.exports.RqGame_YYBF.bankerList            = 'room.playHandler.action'      ;
module.exports.RqGame_YYBF.roadList              = 'room.playHandler.action'      ;
module.exports.RqGame_YYBF.playerBidRepeat       = 'room.playHandler.action'      ;



/***
 * Request - Game  LX9
 */
module.exports.RqGame_LX9             = {}                             ;
//LX9
module.exports.RqGame_LX9.roomAction            = 'room.playHandler.action'      ; // PLAYER_READY
module.exports.RqGame_LX9.playerBid             = 'room.playHandler.action'      ;
module.exports.RqGame_LX9.upBanker              = 'room.playHandler.action'      ;
module.exports.RqGame_LX9.downBanker            = 'room.playHandler.action'      ;
module.exports.RqGame_LX9.bankerList            = 'room.playHandler.action'      ;
module.exports.RqGame_LX9.roadList              = 'room.playHandler.action'      ;
module.exports.RqGame_LX9.playerBidRepeat       = 'room.playHandler.action'      ;
module.exports.RqGame_LX9.playerOpen            = 'room.playHandler.action'      ;

/***
 * Request - Game
 */
module.exports.RqGame_SLWH             = {}                             ;
//SLWH
module.exports.RqGame_SLWH.playerBid             = 'room.playHandler.action'      ;
module.exports.RqGame_SLWH.upBanker              = 'room.playHandler.action'      ;
module.exports.RqGame_SLWH.downBanker            = 'room.playHandler.action'      ;
module.exports.RqGame_SLWH.bankerList            = 'room.playHandler.action'      ;
module.exports.RqGame_SLWH.roadList              = 'room.playHandler.action'      ;
module.exports.RqGame_SLWH.playerBidRepeat       = 'room.playHandler.action'      ;

/**
 * OnAction - Game - FKNN
 */
module.exports.OnAction_FKNN                        = {};
module.exports.OnAction_FKNN.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_FKNN.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_FKNN.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_FKNN.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
// module.exports.OnAction_FKNN.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
// module.exports.OnAction_FKNN.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
// module.exports.OnAction_FKNN.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
//Game
module.exports.OnAction_FKNN.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_FKNN.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_FKNN.PLAYER_READY           = 'PlayerReady'                  ;
module.exports.OnAction_FKNN.ROOM_BANKER            = 'RoomStateBanker'              ;
module.exports.OnAction_FKNN.PLAYER_BANKER          = 'PlayerBanker'                 ;
module.exports.OnAction_FKNN.PLAYER_BID             = 'PlayerBid'                    ;
module.exports.OnAction_FKNN.PLAYER_ADD_CARDS       = 'PlayerAddCards'               ;
module.exports.OnAction_FKNN.PLAYER_PLAY            = 'PlayerPlay'                   ;
// module.exports.OnAction_FKNN.PLAYER_SHOW_HAND       = 'PlayerShowHand'               ;
module.exports.OnAction_FKNN.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
// module.exports.OnAction_FKNN.ROOM_RESULT            = 'ROOM_RESULT'                  ;
module.exports.OnAction_FKNN.RoundResult            = 'RoundResult'                  ;
module.exports.OnAction_FKNN.PLAYER_HOST            = 'PlayerHost'                   ;
module.exports.OnAction_FKNN.PLAYER_SIT             = 'PlayerSit'  
module.exports.OnAction_FKNN.DISMISS_VOTE           = 'DismissVote'    ;//接收解散房间状态
module.exports.OnAction_FKNN.DISMISS_START          = 'DismissStart'    ;//解散房间开始
module.exports.OnAction_FKNN.DISMISS_STOP           = 'DismissStop'      ; // 解散结束
module.exports.OnAction_FKNN.ROOM_RESULT            = 'RoomResult'      ; // 大结算

// module.exports.OnAction_FKNN.ROUND_BEGIN            = 'RoundBegin'                   ;
// module.exports.OnAction_FKNN.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
// module.exports.OnAction_FKNN.ROUND_END              = 'RoundEnd'                     ;

//DISSMISS
module.exports.OnAction_FKNN.DISMISS_ROOM           = 'DismissRoom'                  ;
//CHAT
module.exports.OnAction_FKNN.ROOM_CHAT              = 'Chat'                         ;

//  YTDZ
module.exports.OnAction_FKNN.PLAYER_DEAL            = 'PlayerDeal'                   ; // 发手牌
module.exports.OnAction_FKNN.ROOM_STATE_DEAL        = 'RoomStateDeal'                ; // 发公共牌
module.exports.OnAction_FKNN.TURN_START             = 'TurnStart'                    ; // 目前倒计时
module.exports.OnAction_FKNN.PLAYER_BID             = 'PlayerBid'                    ; // 玩家下注  
module.exports.OnAction_FKNN.ROOM_PLAYING           = 'RoomPlaying'                  ; // 房间游戏中状态变化
module.exports.OnAction_FKNN.ROUND_BEGIN            = 'RoundBegin'                   ;
module.exports.OnAction_FKNN.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
module.exports.OnAction_FKNN.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
module.exports.OnAction_FKNN.ROUND_END              = 'RoundEnd'                     ;
module.exports.OnAction_FKNN.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
module.exports.OnAction_FKNN.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
module.exports.OnAction_FKNN.PlayerReset            = 'PlayerReset'                  ; // 抽奖入池
module.exports.OnAction_FKNN.RoomStateShowHand      = 'RoomStateShowHand'            ; // 亮牌消息
module.exports.OnAction_FKNN.PLAYER_SHOW_HAND       = 'PlayerShowHand'               ; //  index: 牌的索引, show: 是否展示 玩家独立展示手牌的接口


/**
 * OnAction - Game - BJL
 */
module.exports.OnAction_BJL                        = {};
module.exports.OnAction_BJL.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_BJL.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_BJL.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_BJL.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
//Game
module.exports.OnAction_BJL.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_BJL.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_BJL.PLAYER_PLAY            = 'PlayerPlay'                   ;
module.exports.OnAction_BJL.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
module.exports.OnAction_BJL.PLAYER_HOST            = 'PlayerHost'                   ;

//DISSMISS
module.exports.OnAction_BJL.DISMISS_ROOM           = 'DismissRoom'                  ;
//CHAT
module.exports.OnAction_BJL.ROOM_CHAT              = 'Chat'                         ;

module.exports.OnAction_BJL.ROOM_STATE_DEAL        = 'RoomStateDeal'                ; // 发牌
module.exports.OnAction_BJL.ROOM_PLAYING           = 'RoomPlaying'                  ; // 房间游戏中状态变化
module.exports.OnAction_BJL.ROUND_BEGIN            = 'RoundBegin'                   ;
module.exports.OnAction_BJL.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
module.exports.OnAction_BJL.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
module.exports.OnAction_BJL.ROUND_END              = 'RoundEnd'                     ;
module.exports.OnAction_BJL.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
module.exports.OnAction_BJL.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
module.exports.OnAction_BJL.PlayerReset            = 'PlayerReset'                  ; // 抽奖入池
module.exports.OnAction_BJL.RoomStateShowHand      = 'RoomStateShowHand'            ; // 亮牌消息
module.exports.OnAction_BJL.PLAYER_BID             = 'PlayerBid'                    ; // 玩家下注  
module.exports.OnAction_BJL.PLAYER_MY_SCORE        = 'PlayerMyScore'                ; // 我自己的筹码变动  

module.exports.OnAction_BJL.BankerList             = 'BankerList'                   ; // 上庄列表 
module.exports.OnAction_BJL.UpBanker               = 'UpBanker'                     ; // 上庄 
module.exports.OnAction_BJL.DownBanker             = 'DownBanker'                   ; // 下庄 

module.exports.OnAction_BJL.RoadList               = 'RoadList'                     ; // 大路单 
module.exports.OnAction_BJL.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注 

module.exports.OnAction_BJL.RoomStateBet           = 'RoomStateBet'                 ; // 下注集合 
module.exports.OnAction_BJL.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注


/**
 * OnAction - Game - BCBM
 */
module.exports.OnAction_BCBM                        = {};
module.exports.OnAction_BCBM.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_BCBM.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_BCBM.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_BCBM.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
//Game
module.exports.OnAction_BCBM.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_BCBM.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_BCBM.PLAYER_PLAY            = 'PlayerPlay'                   ;
module.exports.OnAction_BCBM.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
module.exports.OnAction_BCBM.PLAYER_HOST            = 'PlayerHost'                   ;

//DISSMISS
module.exports.OnAction_BCBM.DISMISS_ROOM           = 'DismissRoom'                  ;
//CHAT
module.exports.OnAction_BCBM.ROOM_CHAT              = 'Chat'                         ;

module.exports.OnAction_BCBM.ROOM_STATE_DEAL        = 'RoomStateDeal'                ; // 发牌
module.exports.OnAction_BCBM.ROOM_PLAYING           = 'RoomPlaying'                  ; // 房间游戏中状态变化
module.exports.OnAction_BCBM.ROUND_BEGIN            = 'RoundBegin'                   ;
module.exports.OnAction_BCBM.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
module.exports.OnAction_BCBM.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
module.exports.OnAction_BCBM.ROUND_END              = 'RoundEnd'                     ;
module.exports.OnAction_BCBM.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
module.exports.OnAction_BCBM.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
module.exports.OnAction_BCBM.PlayerReset            = 'PlayerReset'                  ; // 抽奖入池
module.exports.OnAction_BCBM.RoomStateShowHand      = 'RoomStateShowHand'            ; // 亮牌消息
module.exports.OnAction_BCBM.PLAYER_BID             = 'PlayerBid'                    ; // 玩家下注  
module.exports.OnAction_BCBM.PLAYER_MY_SCORE        = 'PlayerMyScore'                ; // 我自己的筹码变动  

module.exports.OnAction_BCBM.BankerList             = 'BankerList'                   ; // 上庄列表 
module.exports.OnAction_BCBM.UpBanker               = 'UpBanker'                     ; // 上庄 
module.exports.OnAction_BCBM.DownBanker             = 'DownBanker'                   ; // 下庄 

module.exports.OnAction_BCBM.RoadList               = 'RoadList'                     ; // 大路单 
module.exports.OnAction_BCBM.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注 

module.exports.OnAction_BCBM.RoomStateBet           = 'RoomStateBet'                  ; // 下注集合 



/**
 * OnAction - Game - FKNN
 */
module.exports.OnAction_ZJH                        = {};
module.exports.OnAction_ZJH.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_ZJH.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_ZJH.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_ZJH.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
// module.exports.OnAction_ZJH.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
// module.exports.OnAction_ZJH.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
// module.exports.OnAction_ZJH.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
//Game
module.exports.OnAction_ZJH.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_ZJH.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_ZJH.PLAYER_READY           = 'PlayerReady'                  ;
module.exports.OnAction_ZJH.ROOM_BANKER            = 'RoomStateBanker'              ;
module.exports.OnAction_ZJH.PLAYER_BANKER          = 'PlayerBanker'                 ;
module.exports.OnAction_ZJH.PLAYER_BID             = 'PlayerBid'                    ;
module.exports.OnAction_ZJH.PLAYER_ADD_CARDS       = 'PlayerAddCards'               ;
module.exports.OnAction_ZJH.PLAYER_PLAY            = 'PlayerPlay'                   ;
// module.exports.OnAction_ZJH.PLAYER_SHOW_HAND       = 'PlayerShowHand'               ;
module.exports.OnAction_ZJH.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
module.exports.OnAction_ZJH.ROOM_RESULT            = 'ROOM_RESULT'                  ;
module.exports.OnAction_ZJH.RoundResult            = 'RoundResult'                  ;
module.exports.OnAction_ZJH.PLAYER_HOST            = 'PlayerHost'                   ;
module.exports.OnAction_ZJH.PLAYER_SIT             = 'PlayerSit'                    ;
// module.exports.OnAction_ZJH.ROUND_BEGIN            = 'RoundBegin'                   ;
// module.exports.OnAction_ZJH.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
// module.exports.OnAction_ZJH.ROUND_END              = 'RoundEnd'                     ;

//DISSMISS
module.exports.OnAction_ZJH.DISMISS_ROOM           = 'DismissRoom'                  ;
//CHAT
module.exports.OnAction_ZJH.ROOM_CHAT              = 'Chat'                         ;

//  ZJH
module.exports.OnAction_ZJH.PLAYER_DEAL            = 'PlayerDeal'                   ; // 发手牌
module.exports.OnAction_ZJH.ROOM_STATE_DEAL        = 'RoomStateDeal'                ; // 发公共牌
module.exports.OnAction_ZJH.TURN_START             = 'TurnStart'                    ; // 目前倒计时
module.exports.OnAction_ZJH.PLAYER_BID             = 'PlayerBid'                    ; // 玩家下注  
module.exports.OnAction_ZJH.ROOM_PLAYING           = 'RoomPlaying'                  ; // 房间游戏中状态变化
module.exports.OnAction_ZJH.ROUND_BEGIN            = 'RoundBegin'                   ;
module.exports.OnAction_ZJH.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
module.exports.OnAction_ZJH.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
module.exports.OnAction_ZJH.ROUND_END              = 'RoundEnd'                     ;
module.exports.OnAction_ZJH.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
module.exports.OnAction_ZJH.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
module.exports.OnAction_ZJH.PlayerReset            = 'PlayerReset'                  ; // 抽奖入池
module.exports.OnAction_ZJH.PlayerLook             = 'PlayerLook'                   ; // 有人看牌的消息
module.exports.OnAction_ZJH.RoomStateShowHand      = 'RoomStateShowHand'            ; // 玩家自己亮牌消息
module.exports.OnAction_ZJH.PLAYER_SHOW_HAND       = 'PlayerShowHand'               ; //  index: 牌的索引, show: 是否展示 玩家独立展示手牌的接口
module.exports.OnAction_ZJH.PlayerCompare          = 'PlayerCompare'                ; // 主动比牌结果的消息
module.exports.OnAction_ZJH.RoomStateOpen          = 'RoomStateOpen'                ; // 牌局比牌的消息 返回给我个数组由左到右、由大到小的座位号
module.exports.OnAction_ZJH.RoundChange            = 'RoundChange'                  ; // 当前轮数改变

module.exports.OnAction_ZJH.PlayerAction           = 'PlayerAction'                 ; // 用户通用行为

module.exports.OnAction_ZJH.PlayerActionTypeLook        = 1000                      ; // 看牌Constants.ZJH.PlayerAction.LOOK()
module.exports.OnAction_ZJH.PlayerActionTypeShowHand    = 1001                      ; // 看牌onstants.ZJH.PlayerAction.SHOW_HAND()



/**
 * OnAction - Game - LX9
 */
module.exports.OnAction_LX9                        = {};
module.exports.OnAction_LX9.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_LX9.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_LX9.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_LX9.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
//Game
module.exports.OnAction_LX9.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_LX9.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_LX9.PLAYER_PLAY            = 'PlayerPlay'                   ;
module.exports.OnAction_LX9.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
module.exports.OnAction_LX9.PLAYER_HOST            = 'PlayerHost'                   ;

module.exports.OnAction_LX9.PLAYER_MY_SCORE        = 'PlayerMyScore'                ; // 我自己的筹码变动  
module.exports.OnAction_LX9.PlayerOpen             = 'PlayerOpen'                   ;


/**
 * OnAction - Game - YYBF
 */
module.exports.OnAction_YYBF                        = {};
module.exports.OnAction_YYBF.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_YYBF.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_YYBF.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_YYBF.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
//Game
module.exports.OnAction_YYBF.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_YYBF.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_YYBF.PLAYER_PLAY            = 'PlayerPlay'                   ;
module.exports.OnAction_YYBF.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
module.exports.OnAction_YYBF.PLAYER_HOST            = 'PlayerHost'                   ;

//DISSMISS
module.exports.OnAction_YYBF.DISMISS_ROOM           = 'DismissRoom'                  ;
//CHAT
module.exports.OnAction_YYBF.ROOM_CHAT              = 'Chat'                         ;

module.exports.OnAction_YYBF.ROOM_STATE_DEAL        = 'RoomStateDeal'                ; // 发牌
module.exports.OnAction_YYBF.ROOM_PLAYING           = 'RoomPlaying'                  ; // 房间游戏中状态变化
module.exports.OnAction_YYBF.ROUND_BEGIN            = 'RoundBegin'                   ;
module.exports.OnAction_YYBF.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
module.exports.OnAction_YYBF.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
module.exports.OnAction_YYBF.ROUND_END              = 'RoundEnd'                     ;
module.exports.OnAction_YYBF.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
module.exports.OnAction_YYBF.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
module.exports.OnAction_YYBF.PlayerReset            = 'PlayerReset'                  ; // 抽奖入池
module.exports.OnAction_YYBF.RoomStateShowHand      = 'RoomStateShowHand'            ; // 亮牌消息
module.exports.OnAction_YYBF.PLAYER_BID             = 'PlayerBid'                    ; // 玩家下注  
module.exports.OnAction_YYBF.PLAYER_MY_SCORE        = 'PlayerMyScore'                ; // 我自己的筹码变动  

module.exports.OnAction_YYBF.BankerList             = 'BankerList'                   ; // 上庄列表 
module.exports.OnAction_YYBF.UpBanker               = 'UpBanker'                     ; // 上庄 
module.exports.OnAction_YYBF.DownBanker             = 'DownBanker'                   ; // 下庄 

module.exports.OnAction_YYBF.RoadList               = 'RoadList'                     ; // 大路单 
module.exports.OnAction_YYBF.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注 

module.exports.OnAction_YYBF.RoomStateBet           = 'RoomStateBet'                 ; // 下注集合 
module.exports.OnAction_YYBF.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注


/**
 * OnAction - Game - SLWH
 */
module.exports.OnAction_SLWH                        = {};
module.exports.OnAction_SLWH.ROUTE                  = 'room.action'                  ;
//Room      
module.exports.OnAction_SLWH.PLAYER_ENTER_ROOM      = 'PlayerEnterRoom'              ;
module.exports.OnAction_SLWH.LEAVE_ROOM             = 'PlayerLeaveRoom'              ;
module.exports.OnAction_SLWH.CHANGE_ROOM            = 'CHANGE_ROOM'                  ;
//Game
module.exports.OnAction_SLWH.ADD_PLAYER             = 'SeatAddPlayer'                ;
module.exports.OnAction_SLWH.REMOVE_PLAYER          = 'SeatRemovePlayer'             ;
module.exports.OnAction_SLWH.PLAYER_PLAY            = 'PlayerPlay'                   ;
module.exports.OnAction_SLWH.PLAYER_SHOW_CARDS      = 'PlayerShowCards'              ; // 旁观消息，msg = 发牌数
module.exports.OnAction_SLWH.PLAYER_HOST            = 'PlayerHost'                   ;

//DISSMISS
module.exports.OnAction_SLWH.DISMISS_ROOM           = 'DismissRoom'                  ;
//CHAT
module.exports.OnAction_SLWH.ROOM_CHAT              = 'Chat'                         ;

module.exports.OnAction_SLWH.ROOM_STATE_DEAL        = 'RoomStateDeal'                ; // 发牌
module.exports.OnAction_SLWH.ROOM_PLAYING           = 'RoomPlaying'                  ; // 房间游戏中状态变化
module.exports.OnAction_SLWH.ROUND_BEGIN            = 'RoundBegin'                   ;
module.exports.OnAction_SLWH.ROOM_CHANGE_STATE      = 'RoomStateChangeState'         ;
module.exports.OnAction_SLWH.PlayerScore            = 'PlayerScore'                  ; // 消息格式 {id: 用户id, change: 变动, score: 剩余}
module.exports.OnAction_SLWH.ROUND_END              = 'RoundEnd'                     ;
module.exports.OnAction_SLWH.RoomStateTimerStart    = 'RoomStateTimerStart'          ;
module.exports.OnAction_SLWH.RoomStateTimerStop     = 'RoomStateTimerStop'           ;
module.exports.OnAction_SLWH.PlayerReset            = 'PlayerReset'                  ; // 抽奖入池
module.exports.OnAction_SLWH.RoomStateShowHand      = 'RoomStateShowHand'            ; // 亮牌消息
module.exports.OnAction_SLWH.PLAYER_BID             = 'PlayerBid'                    ; // 玩家下注  
module.exports.OnAction_SLWH.PLAYER_MY_SCORE        = 'PlayerMyScore'                ; // 我自己的筹码变动  

module.exports.OnAction_SLWH.BankerList             = 'BankerList'                   ; // 上庄列表 
module.exports.OnAction_SLWH.UpBanker               = 'UpBanker'                     ; // 上庄 
module.exports.OnAction_SLWH.DownBanker             = 'DownBanker'                   ; // 下庄 

module.exports.OnAction_SLWH.RoadList               = 'RoadList'                     ; // 大路单 
module.exports.OnAction_SLWH.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注 

module.exports.OnAction_SLWH.RoomStateBet           = 'RoomStateBet'                 ; // 下注集合 
module.exports.OnAction_SLWH.PlayerBidRepeat        = 'PlayerBidRepeat'              ; // 重复下注

module.exports.RoomAction = {};
// constants.RoomAction.ROUTE               = _.constant('room.action');
// constants.RoomAction.CHAT                = _.constant("Chat");
// constants.RoomAction.DISMISS_START       = _.constant("DismissStart");
module.exports.RoomAction.DISMISS_VOTE      = "DismissVote";
// constants.RoomAction.DISMISS_STOP        = _.constant("DismissStop");
// constants.RoomAction.PLAYER_ADD_CARDS    = _.constant('PlayerAddCards');
// constants.RoomAction.PLAYER_BANKER       = _.constant('PlayerBanker');
// constants.RoomAction.PLAYER_BID          = _.constant('PlayerBid');
// constants.RoomAction.PLAYER_DEAL         = _.constant('PlayerDeal');
// constants.RoomAction.PLAYER_DEAL_FLOWER  = _.constant('PlayerDealFlower');
// constants.RoomAction.PLAYER_DRAW         = _.constant('PlayerDraw');
// constants.RoomAction.PLAYER_ENTER_ROOM   = _.constant('PlayerEnterRoom');
// constants.RoomAction.PLAYER_FLOWER       = _.constant('PlayerFlower');
// constants.RoomAction.PLAYER_FOLD         = _.constant('PlayerFold');
// constants.RoomAction.PLAYER_FORBIDDEN_TAKE   = _.constant('PlayerForbiddenTake');
// constants.RoomAction.PLAYER_FORBIDDEN_TOUCH  = _.constant('PlayerForbiddenTouch');
// constants.RoomAction.PLAYER_GROUP            = _.constant('PlayerGroup');
// constants.RoomAction.PLAYER_HOST             = _.constant('PlayerHost');
// constants.RoomAction.PLAYER_INVITE           = _.constant('PlayerInvite');
// constants.RoomAction.PLAYER_LEAVE_ROOM       = _.constant('PlayerLeaveRoom');
// constants.RoomAction.PLAYER_LISTEN           = _.constant('PlayerListen');
// constants.RoomAction.PLAYER_OVER             = _.constant('PlayerOver');
// constants.RoomAction.PLAYER_PLAY             = _.constant('PlayerPlay');
// constants.RoomAction.PLAYER_PLAY_DRAW        = _.constant('PlayerPlayDraw');
// constants.RoomAction.PLAYER_PLAY_HAND        = _.constant('PlayerPlayHand');
// constants.RoomAction.PLAYER_PASS             = _.constant('PlayerPass');
// constants.RoomAction.PLAYER_READY            = _.constant('PlayerReady');
// constants.RoomAction.PLAYER_REPORT           = _.constant('PlayerReport');
// constants.RoomAction.PLAYER_RESET            = _.constant('PlayerReset');
// constants.RoomAction.PLAYER_SHOW_HAND        = _.constant('PlayerShowHand');
// constants.RoomAction.PLAYER_WIN              = _.constant('PlayerWin');
// constants.RoomAction.ROOM_PLAYING            = _.constant("RoomPlaying");
// constants.RoomAction.ROOM_RESULT             = _.constant("RoomResult");
// constants.RoomAction.ROOM_STATE_ANTI_CHEAT   = _.constant('RoomStateAntiCheat');
// constants.RoomAction.ROOM_STATE_BANKER       = _.constant("RoomStateBanker");
// constants.RoomAction.ROOM_STATE_BANKER_CARD  = _.constant("RoomBankerCard");
// constants.RoomAction.ROOM_STATE_CHANGE_FLOW  = _.constant("ChangeFlow");
// constants.RoomAction.ROOM_STATE_CHANGE_STATE = _.constant("RoomStateChangeState");
// constants.RoomAction.ROOM_STATE_DEAL         = _.constant("RoomStateDeal");
// constants.RoomAction.ROOM_STATE_ROLL_DICE    = _.constant('RoomStateRollDice');
// constants.RoomAction.ROUND_BEGIN             = _.constant("RoundBegin");
// constants.RoomAction.ROUND_RESULT            = _.constant("RoundResult");
// constants.RoomAction.ROUND_END               = _.constant("RoundEnd");
// constants.RoomAction.SEAT_ADD_PLAYER         = _.constant('SeatAddPlayer');
// constants.RoomAction.SEAT_REMOVE_PLAYER      = _.constant('SeatRemovePlayer');
// constants.RoomAction.SEAT_SHUFFLE            = _.constant('SeatShuffle');
// constants.RoomAction.TURN_START              = _.constant("TurnStart");























