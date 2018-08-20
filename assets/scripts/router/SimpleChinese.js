
// 使用范例： $G.gStrings.Mahjong.FormationSpecific.ALL_TOUCH()
let strings    = module.exports            = {};
let constants  = require('Constants');

// 通用词
strings.Common                          = {};
strings.Common.tai                      = '台' ;
strings.Common.lastMj                   = '剩余牌数' ;
strings.Common.success                  = '成功';
strings.Common.copy                     = '复制';
strings.Common.remove                   = '移除';
strings.Common.operate                  = '操作';
strings.Common.found                    = '创建';
strings.Common.modify                   = '修改';
strings.Common.extraction               = '取出';
strings.Common.deposit                  = '存入';
strings.Common.set                      = '设置';
strings.Common.quit                     = '退出';
strings.Common.tiren                    = '踢人';
strings.Common.upgrade                  = '升级';
strings.Common.downgrade                = '降级';
strings.Common.dontPass                 = '以内';
strings.Common.nick                     = '昵称';
strings.Common.remarks                  = '备注';
strings.Common.noRemarks                = '无备注';
strings.Common.totalCalc                = '总计';
strings.Common.wait                     = '等待';
strings.Common.around                   = '圈';
strings.Common.score                    = '分';
strings.Common.base                     = '底' ;
strings.Common.second                   = '秒';
strings.Common.noLimit                  = '无限制';
strings.Common.roomId                   = '房号';
strings.Common.room                     = '房间';
strings.Common.number                   = '号';
strings.Common.player                   = '玩家';
strings.Common.code                     = '码';
strings.Common.recordCode               = '回放码';
strings.Common.downUrl                  = '下载地址';
strings.Common.door                     = '门';
strings.Common.bindAgent                = '绑定代理' ;
strings.Common.roomCard                 = 'GCoin' ;

// 房间相关
strings.Room                            = {} ;
strings.Room.names                      = [ '羊毛场','韭菜场','币民场','大佬场','V神场','中本聪' ];

strings.States                          = {} ;
strings.States.wfeeStates                = { '-1' : '排队重发'  , '0' : '排队提交'  , '1' : '等待发送'  , '2' : '等待发送'  , '3' : '等待发送'  , '4' : '发送成功'  , '5' : '已确认'  , '11' : '排队中'  , '12' : '排队打款'  };

strings.Reasons                         = {} ;
strings.Reasons.reason                  = { '1' : '提wfee' , '2' : '充wfee' , '3' : 'wfee换GCoin' , '4' : 'GCoin换wfee' ,'5' : '提币取消' } ;

strings.Dealer                          = {} ;
strings.Dealer.Speaks                   = [ 
    ['不要怂，就是干！',
     '全梭哈！梭哈！梭哈！！',
     '赢了会所嫩模，输了下海干活！',
     '不要跟我说什么技术分析！',
     '老夫玩币都是一把梭！',
     '老夫玩了几十年牌，少扯有的没的！',
     '告诉你们玩牌就是一把梭！',
     '老夫都是一把梭，没怂过！',
     '一把梭下去，一点压力都没有！',
     '钱不多，一把梭！',
     '听我的，一把梭，梭完了你就等涨吧！',
     '两眼一闭，随便梭！梭完就涨停！',
     '不用考虑，一个字，梭！',
     '今天你梭哈了吗！',
     '想要逆袭吗，一把梭！',
     '一把梭，集中赢！',
     '一把梭哈轻松多了！',
     '玩把梭哈！你有胆量吗？',
     '一把梭哈，谁怂谁吃亏！',
     '拼一拼，搏一搏，单车变摩托！',
     '一把梭！玩的就是心跳！',
     '任性起来一把梭哈！',
     '一币一嫩模，一币一別墅！',
     '瀑布算个球，富贵险中求！',
     '玩币我只知道梭哈，一梭到底!',
     '没有梭哈的人生是不完整的!',
    ],
    ['没有韭菜，就没有社区！',
    '没有社区，就没有行业！',
    '没有行业，大家没饭吃！',
    '韭菜不能割！韭菜要勤施肥!',
    '培养未来新韭菜，使劲浇水！',
    '欢迎来韭菜庄园做客',
    '韭菜们还在门口站着',
    '还有无数人准备踏足而入',
    '买一个比特币留给孩子',
    '等你孩子结婚的时候送他一个比特币',
    '有生之年比特币不到100万美金，我直播吃鸡鸡！',
    '希望大家记住我是一个‘三俗’分子',
    '我是只知道挣钱的那种人',
    '我只对一个事情感兴趣，那就是挣钱',
    '在币圈你不用崇拜任何人',
    '记住我”暴发户”的草根形象',
    '总而言之，买比特币就对了',
    '记住！我们的目标是睡遍全世界！',
    '我们的目标是再造新中国！',
    '去购买一个比特币吧，一个就够了',
    '最好的挣钱方式是持有赌场的股份',
    '事儿都是勇敢者干出来的',
    '这是一个勇敢者的游戏',
    '亏了赚了不说，重要的是参与过了',
    '醒醒！起来割韭菜了！',
    ],
    ['比特币现金有自己独立的路线',
     '对前景和未来，要有不同的理解',
     '要么赔光，要么赚一百倍！',
     '钱只能投一次，不成功就倾家荡产了！',
     '区块链是一种低成本构建信任关系的工具',
     '区块链能构建一个很权威的信任机制',
     '区块链的功能正在快速迭代和发展',
     '区块链将来会被应用到很多方面',
     '推动币价上涨最好的方法就是多烧几柱香啦！',
     '比特币是从一个社区开始成长',
     '比特币比Q币会得到更广泛的承认',
     '比特币是无国界的',
     '比特币在100多个国家都有流通和兑换',
     '比特币是人类历史中没有过的金融创新',
     '投资比特币是在对抗潜在的通货膨胀风险',
     '比特币是集成电路的一个细分行业',
     '我把比特币当做风险投资实践',
     '社区会变得更加经济理性',
     '比特币还需要在用户普及上做更多努力',
    ],
    ['不要相信运气',
     '更不要相信“机不可失，时不再来！”',
     '打造人脉不如打造自己！',
     '妄图想要当庄的“庄”，其实都他妈的是“装”',
     '我们是没有办法回到没有比特币的世界',
     '我并没有把比特币当作钱',
     '比特币是一个伟大的社会实验',
     '我把比特币当作一个美丽的主意',
     '每天做思考，做验证，其乐无穷！',
     '但愿更多的投资者能够听懂',
     '本来是想吃肉，别到市场转一圈，剩下骂娘了！',
    ],
    ['我们是编写代码的推动者',
     '这是观察事物的不同的方式',
     '当前是社会对区块链有着极大关注的时代',
     '一切都有可能会发生天翻地覆的改变',
     '如今只是刚刚开始',
     '未来将会是一个去中心化的世界',
     '区块链构建的是充满效率和信任的世界',
     '我们要创造一种可以探索的科技',
     '我们要创造很多有趣的事物',
     '我们要创造自己想象的未来',
     '以太坊就是一个通用的区块链',
     '世界上许多政府都对以太坊感兴趣',
     '区块链是完全开放的系统',
     '区块链人人可参与',
     '参与区块链还有很多不用的途径',
    ],
    ['传统货币最根本的问题在于信任',
     '中央银行必须让人信任它不会让货币贬值',
     '银行无法让人确信它能管理好钱财', 
     '银行会用货币来制造信贷泡沫',
     '中央银行不让货币贬值的可信度是不存在的',
     '比特币诞生于英国财政大臣纾解银行危机之时',          
     '比特币这样的系统从理论上是可行的',
    ],
    ['我们炒币的可以要饭，但是不能卖币！',
     '未来的一切都可能被改变',
     '或许将来货币的流通方式会被改变',
     '不可能真正禁止比特币',
     '一定要重视区块链',
     '未来区块链有可能和互联网一样伟大',
     '区块链的火爆并非“一时兴起”',
     '区块链技术将有颠覆性的应用',
     '区块链的应用值得期待',
     '解决实际问题，加速行业变革',
     '比特币是一场关于可行性的实验',
     '区块链不再限于货币了，是价值在利用它',
     '保障合约将是区块链的下一步发展',
     '本是要创造新货币，结果创造了新商业',
     '区块链将颠覆金融世界的规则',
     '我相信我们正迈向一个新的时代',
    ] ];

// 麻将相关
strings.Mahjong                         = {};
strings.Mahjong.East                    = '东';
strings.Mahjong.South                   = '南';
strings.Mahjong.West                    = '西';
strings.Mahjong.North                   = '北';
strings.Mahjong.Dirs                    = [ strings.Mahjong.East , strings.Mahjong.South , strings.Mahjong.West , strings.Mahjong.North  ]
strings.Mahjong.Wind                    = '风';
strings.Mahjong.RoundBanker             = '局';
strings.Mahjong.payModeRoom             = '房主付' ;
strings.Mahjong.payModeAA               = 'AA付' ;
strings.Mahjong.payModeZiMo             = '自摸付' ;
strings.Mahjong.eightPair               = '呖咕呖咕';
strings.Mahjong.drawPing                = '自摸平胡';
strings.Mahjong.tianListening           = '天听';
strings.Mahjong.diListening             = '地听';
strings.Mahjong.sevenFlower             = '七抢一';



// 快捷聊天
strings.Chats                           = [
    '你太牛啦',
    '哈哈！手气真好',
    '快点出牌呦',
    '今天真高兴',
    '这个吃的好',
    '你放炮，我不胡',
    '你家里是开银行的吧',
    '不好意思，我有事要先走一步啦',
    '你的牌打的太好了',
    '大家好很高兴见到各位',
    '怎麽又断线啦，网络怎麽这麽差呀',
];


// 通用短语
strings.CommonTips                      = {} ;
strings.CommonTips.copySuccess          ='已复制';
strings.CommonTips.BreakRoom            ='该房间已被房主解散';
strings.CommonTips.BuySuccess           ='购买成功';
strings.CommonTips.ToastSuccess         ='34张GCoin已到您帐护';
strings.CommonTips.NoMail               ='您没有邮件';
strings.CommonTips.InputNum             ='请随便输入一个6位长度的帐号';
strings.CommonTips.RemindCheck          ='请检查遗漏的开房选项';
strings.CommonTips.GiveSuccess          ='赠送成功';
strings.CommonTips.LastPage             ='当前已是第一页或最后一页';
strings.CommonTips.InputId              ='请先输入邀请人ID';
strings.CommonTips.BindSuccess          ='绑定成功';
strings.CommonTips.ApplySuccess         ='申请成功';
strings.CommonTips.RemindFill           ='请填写完信息再提交';
strings.CommonTips.InputMoney           ='请填写金额';
strings.CommonTips.ScreenShot           ='截图生成完毕:';
strings.CommonTips.GiveUpPeng           ='放弃碰';
strings.CommonTips.GiveUpHu             ='放弃胡';
strings.CommonTips.InputInviterId       ='请先输入邀请人ID';
strings.CommonTips.BindSuccessCard      ='绑定成功';
strings.CommonTips.ReceiveItems         ='请先领取邮件物品';
strings.CommonTips.AlreadyReceive       ='已经领取';
strings.CommonTips.CanNotLotteryDraw    ='抽奖次数不足';
strings.CommonTips.CanNotRoomCard       ='GCoin不足';
strings.CommonTips.RefuseApply          ='已拒绝该玩家的入会申请';
strings.CommonTips.AgreeApply           ='已同意该玩家的入会申请';
strings.CommonTips.InputPlus            ='必须填写正数';
strings.CommonTips.InputName            ='名称不能为空';
strings.CommonTips.CanNotPhone          ='手机号不能为空';
strings.CommonTips.CanNotEmpty          ='输入不能为空';
strings.CommonTips.CanNotNick           ='昵称不能为空';
strings.CommonTips.CanNotPassWord       ='密码不能为空';
strings.CommonTips.CanNotCaptcha        ='验证码不能为空';
strings.CommonTips.SidnInOk             ='注册成功';
strings.CommonTips.InputToastNum        ='请填入GCoin数量';
strings.CommonTips.SendApplication      ='已发送申请，等待审批中...';
strings.CommonTips.WithoutMan           ='无此成员';
strings.CommonTips.President            ='仅会长可以操作';
strings.CommonTips.NoSet                ='设置未变动';
strings.CommonTips.copySuccessAndShare  ='复制成功，快分享给好友吧';
strings.CommonTips.pasteRoomTips        ='複製此文字后贴上房号即可加入该房间';
strings.CommonTips.viewRecordTips       ='复制本消息-点击战绩-查看他人回放-贴入即可';
strings.CommonTips.shareRecord          ='分享了游戏录像，快来查看吧！' ;
strings.CommonTips.shareGame            ='邀请你来最好玩的麻将游戏';
strings.CommonTips.letsFight            ='快来战到天亮吧！' ;
strings.CommonTips.phoneCodeSended      ='验证码已发送，请耐心等待' ;
strings.CommonTips.adminDissRoom        ='您的房间已被管理员解散' ;
strings.CommonTips.noData               ='没有数据' ;

// 错误提示
strings.Error                           = {};
strings.Error.CanNotPlay                = '不允许打本张牌' ;
strings.Error.CanNotWin                 = '不允许胡' ;
strings.Error.CanNotGroup               = '不允许鸣牌' ;
strings.Error.dismissStop               = '解散房间失败' ;
strings.Error.StillClose                = '该功能即将开放' ;
strings.Error.UnableWin                 = '当前牌型无法胡牌' ;
strings.Error.RefuseAndroid             = '暂不支持android' ;
strings.Error.AccountError              = '您的帐号已被别人登录';
strings.Error.LoadingNet                = '您的网络太差，请稍后再试';
strings.Error.NetError                  = '网络似乎已断开';
strings.Error.CanNotBind                = '不能邦定您自己的邀请码';
strings.Error.CanNotRepetBind           = '不能重复邦定邀请码';
strings.Error.InputError                = '您输入的邀请码有误，请重新输入';
strings.Error.CanNotGive                = '不能赠送给自己';
strings.Error.NoPaste                   = '剪贴板是空的哦';
strings.Error.NoNumbers                 = '没有数字可供复制';


// 德州牌型
// strings.DZ                                                                     = {};
// strings.DZ.Formation                                                         = {};
// strings.DZ.Formation[ constants.DZ.Formation.NONE() ]                         = '高牌';           // 高牌
// strings.DZ.Formation[ constants.DZ.Formation.PAIR() ]                         = '对子';           // 对子
// strings.DZ.Formation[ constants.DZ.Formation.TWO_PAIR() ]                     = '两对';           // 两对
// strings.DZ.Formation[ constants.DZ.Formation.TRIPLE() ]                       = '三条';           // 三条
// strings.DZ.Formation[ constants.DZ.Formation.SEQUENCE() ]                     = '顺子';           // 顺子
// strings.DZ.Formation[ constants.DZ.Formation.SUIT() ]                         = '同花';           // 同花
// strings.DZ.Formation[ constants.DZ.Formation.TRIPLE_PAIR() ]                  = '葫芦';           // 葫芦
// strings.DZ.Formation[ constants.DZ.Formation.BOMB() ]                         = '四条';           // 四条
// strings.DZ.Formation[ constants.DZ.Formation.SUIT_SEQUENCE() ]                = '同花顺';         // 同花顺
// strings.DZ.Formation[ constants.DZ.Formation.SUIT_SEQUENCE_ACE() ]            = '皇家同花顺';      // 皇家同花顺


// 德州牌型
// strings.ZJH                                                                     = {};
// strings.ZJH.Formation                                                           = {};
// strings.ZJH.Formation[ constants.ZJH.Formation.SPECIAL() ]                      = '特殊';           // 特殊
// strings.ZJH.Formation[ constants.ZJH.Formation.HIGH() ]                         = '单张';           // 单张
// strings.ZJH.Formation[ constants.ZJH.Formation.PAIR() ]                         = '对子';           // 对子
// strings.ZJH.Formation[ constants.ZJH.Formation.SEQUENCE() ]                     = '顺子';           // 顺子
// strings.ZJH.Formation[ constants.ZJH.Formation.SUIT() ]                         = '金花';           // 金花
// strings.ZJH.Formation[ constants.ZJH.Formation.BOMB() ]                         = '豹子';           // 豹子
// strings.ZJH.Formation[ constants.ZJH.Formation.SUIT_SEQUENCE() ]                = '顺金';           // 顺金