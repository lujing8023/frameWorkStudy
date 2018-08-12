let constants   = module.exports = {};
let _           = require('underscore');

/**
 * Room Clear Reason
 */
constants.ClearReason                             = {};
constants.ClearReason.NONE                        = _.constant(0);
constants.ClearReason.RESULT                      = _.constant(1);  // 正常结束
constants.ClearReason.OWNER_DISMISS               = _.constant(2);  // 无论公会内外，房主直接解散
constants.ClearReason.VOTE_DISMISS                = _.constant(3);  // 投票解散
constants.ClearReason.REQUEST                     = _.constant(4);  // 自己退出房间
constants.ClearReason.REMATCH                     = _.constant(5);  // GCoin场
constants.ClearReason.KICK_HOSTING_USER           = _.constant(6);  // 
constants.ClearReason.KICK_NOT_ENOUGH_GOLD_USER   = _.constant(7);
constants.ClearReason.ADMIN                       = _.constant(8);  // 管理员解散


/**
 * Poker
 */
constants.Poker                               = {};

constants.Poker.CardSuit                      = {};
constants.Poker.CardSuit.DIAMOND              = _.constant(1);
constants.Poker.CardSuit.CLUB                 = _.constant(2);
constants.Poker.CardSuit.HEART                = _.constant(3);
constants.Poker.CardSuit.SPADE                = _.constant(4);
constants.Poker.CardSuit.JOKER                = _.constant(5);

constants.Poker.CardPoint                     = {};
constants.Poker.CardPoint.ACE                 = _.constant(1);
constants.Poker.CardPoint.KING                = _.constant(13);
constants.Poker.CardPoint.SUB_JOKER           = _.constant(14);
constants.Poker.CardPoint.MAIN_JOKER          = _.constant(15);


/**
 * DZ
 */
constants.DZ                                           = {};

constants.DZ.Bid                                       = {};
constants.DZ.Bid.NONE                                  = _.constant(0);
constants.DZ.Bid.ADD                                   = _.constant(1);
constants.DZ.Bid.ALLIN                                 = _.constant(2);
constants.DZ.Bid.FOLD                                  = _.constant(3);
constants.DZ.Bid.FOLLOW                                = _.constant(4);
constants.DZ.Bid.PASS                                  = _.constant(5);
constants.DZ.Bid.SBLIND                                = _.constant(6);
constants.DZ.Bid.BBLIND                                = _.constant(7);
constants.DZ.Bid.LEAVE                                 = _.constant(8);

constants.DZ.Formation                                 = {};
constants.DZ.Formation.NONE                            = _.constant(1);    //  高牌
constants.DZ.Formation.HIGH                            = _.constant(2);    //  高牌
constants.DZ.Formation.PAIR                            = _.constant(3);    //  对子
constants.DZ.Formation.TWO_PAIR                        = _.constant(4);    //  两对
constants.DZ.Formation.TRIPLE                          = _.constant(5);    //  三条
constants.DZ.Formation.SEQUENCE                        = _.constant(6);    //  顺子
constants.DZ.Formation.SUIT                            = _.constant(7);    //  同花
constants.DZ.Formation.TRIPLE_PAIR                     = _.constant(8);    //  葫芦
constants.DZ.Formation.BOMB                            = _.constant(9);    //  四条
constants.DZ.Formation.SUIT_SEQUENCE                   = _.constant(10);   //  同花顺
constants.DZ.Formation.SUIT_SEQUENCE_ACE               = _.constant(11);   //  皇家同花顺

/**
 * BJL
 */
constants.BJL                                          = {};

//  下注区域
constants.BJL.RoomBetArea                               = {};
constants.BJL.RoomBetArea.PLAY                          = _.constant(0);
constants.BJL.RoomBetArea.BANK                          = _.constant(1);
constants.BJL.RoomBetArea.PLAY_KING                     = _.constant(2);
constants.BJL.RoomBetArea.BANK_KING                     = _.constant(3);
constants.BJL.RoomBetArea.PLAY_PAIR                     = _.constant(4);
constants.BJL.RoomBetArea.BANK_PAIR                     = _.constant(5);
constants.BJL.RoomBetArea.TIE                           = _.constant(6);
constants.BJL.RoomBetArea.TIE_SAME_POINT                = _.constant(7);

/**
 * BCBM
 */
constants.BCBM                                          = {};
//  下注区域
constants.BCBM.RoomBetArea                               = {};
constants.BCBM.RoomBetArea.Bet0                = _.constant(0);
constants.BCBM.RoomBetArea.Bet1                = _.constant(1);
constants.BCBM.RoomBetArea.Bet2                = _.constant(2);
constants.BCBM.RoomBetArea.Bet3                = _.constant(3);
constants.BCBM.RoomBetArea.Bet4                = _.constant(4);
constants.BCBM.RoomBetArea.Bet5                = _.constant(5);
constants.BCBM.RoomBetArea.Bet6                = _.constant(6);
constants.BCBM.RoomBetArea.Bet7                = _.constant(7);
/**
 * 房间开奖配置
 */
constants.BCBM.RoomOpenConfigs = [
    0, 3, 4, 6, 2, 7, 5, 1, 6, 5, 4, 3, 7, 6, 4, 2, 3, 5, 7,
    0, 3, 4, 6, 2, 7, 5, 1, 6, 5, 4, 3, 7, 6, 4, 2, 1, 5, 7
];


/**
 * ZJH
 */
constants.ZJH                                           = {};

constants.ZJH.Bid                                       = {};
constants.ZJH.Bid.NONE                                  = _.constant(0);        //      
constants.ZJH.Bid.ADD                                   = _.constant(1);        //  加注
constants.ZJH.Bid.ALLIN                                 = _.constant(2);        //  孤注一掷
constants.ZJH.Bid.FOLD                                  = _.constant(3);        //  弃牌
constants.ZJH.Bid.FOLLOW                                = _.constant(4);        //  跟注
constants.ZJH.Bid.BASE                                  = _.constant(5);        //  底注
constants.ZJH.Bid.COMPARE                               = _.constant(6);        //  比牌
constants.ZJH.Bid.LOOK                                  = _.constant(7);        //  看牌
constants.ZJH.Bid.LEAVE                                 = _.constant(8);        //  离开

constants.ZJH.Formation                                 = {};
constants.ZJH.Formation.SPECIAL                         = _.constant(1);    //  235
constants.ZJH.Formation.HIGH                            = _.constant(2);    //  高牌
constants.ZJH.Formation.PAIR                            = _.constant(3);    //  对子
constants.ZJH.Formation.SEQUENCE                        = _.constant(6);    //  顺子
constants.ZJH.Formation.SUIT                            = _.constant(7);    //  同花
constants.ZJH.Formation.BOMB                            = _.constant(9);    //  三条
constants.ZJH.Formation.SUIT_SEQUENCE                   = _.constant(10);   //  同花顺

constants.ZJH.PlayerAction                              = {
    LOOK:_.constant(1000),
    SHOW_HAND:_.constant(1001)
};
/**
 * LX9
 */
constants.LX9                                           = {};
constants.LX9.BetConfig = [5,20,50,100,500,1000,10000,100000];


/**
 * SLWH
 */
constants.SLWH                                          = {};

//  下注区域倍数
constants.SLWH.RoomBetArea                               = {};
constants.SLWH.RoomBetArea.Bet0                          = _.constant(46)   ;   //  红色狮子
constants.SLWH.RoomBetArea.Bet1                          = _.constant(23)   ;   //  红色熊猫
constants.SLWH.RoomBetArea.Bet2                          = _.constant(13)   ;   //  红色猴子
constants.SLWH.RoomBetArea.Bet3                          = _.constant(8)    ;   //  红色兔子
constants.SLWH.RoomBetArea.Bet4                          = _.constant(35)   ;   //  绿色狮子
constants.SLWH.RoomBetArea.Bet5                          = _.constant(17)   ;   //  绿色熊猫
constants.SLWH.RoomBetArea.Bet6                          = _.constant(10)   ;   //  绿色猴子
constants.SLWH.RoomBetArea.Bet7                          = _.constant(6)    ;   //  绿色兔子
constants.SLWH.RoomBetArea.Bet8                          = _.constant(28)   ;   //  黄色狮子
constants.SLWH.RoomBetArea.Bet9                          = _.constant(14)   ;   //  黄色熊猫
constants.SLWH.RoomBetArea.Bet10                         = _.constant(8)    ;   //  黄色猴子
constants.SLWH.RoomBetArea.Bet11                         = _.constant(4)    ;   //  黄色兔子


//  下注区域
constants.SLWH.RoomBetArea.Area0                         = _.constant(0)   ;   //  红色狮子
constants.SLWH.RoomBetArea.Area1                         = _.constant(1)   ;   //  红色熊猫
constants.SLWH.RoomBetArea.Area2                         = _.constant(2)   ;   //  红色猴子
constants.SLWH.RoomBetArea.Area3                         = _.constant(3)   ;   //  红色兔子
constants.SLWH.RoomBetArea.Area4                         = _.constant(4)   ;   //  绿色狮子
constants.SLWH.RoomBetArea.Area5                         = _.constant(5)   ;   //  绿色熊猫
constants.SLWH.RoomBetArea.Area6                         = _.constant(6)   ;   //  绿色猴子
constants.SLWH.RoomBetArea.Area7                         = _.constant(7)   ;   //  绿色兔子
constants.SLWH.RoomBetArea.Area8                         = _.constant(8)   ;   //  黄色狮子
constants.SLWH.RoomBetArea.Area9                         = _.constant(9)   ;   //  黄色熊猫
constants.SLWH.RoomBetArea.Area10                        = _.constant(10)  ;   //  黄色猴子
constants.SLWH.RoomBetArea.Area11                        = _.constant(11)  ;   //  黄色兔子

/**
 * 房间开奖颜色
 */ 
constants.SLWH.RoomOpenColor                            = {};
constants.SLWH.RoomOpenColor.RED                        = _.constant(0);    //  红色
constants.SLWH.RoomOpenColor.GREEN                      = _.constant(1);    //  绿色
constants.SLWH.RoomOpenColor.YELLOW                     = _.constant(2);    //  黄色

/**
 * 房间开奖动物
 */ 
constants.SLWH.RoomOpenAnimal                            = {};
constants.SLWH.RoomOpenAnimal.LION                       = _.constant(0);    //  狮子
constants.SLWH.RoomOpenAnimal.PANDA                      = _.constant(1);    //  熊猫
constants.SLWH.RoomOpenAnimal.MONKEY                     = _.constant(2);    //  猴子
constants.SLWH.RoomOpenAnimal.RABBIT                     = _.constant(3);    //  兔子

/**
 * 房间开奖配置
 */
constants.SLWH.RoomOpenConfigs = [
    0,1,2,3,0,1,2,3,0,1,2,3,
    0,1,2,3,0,1,2,3,0,1,2,3
];