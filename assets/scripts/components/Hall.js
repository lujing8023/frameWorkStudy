var Net = require("Net")
var Global = require("Global")
cc.Class({
    extends: cc.Component,

    properties: {
        lblName:cc.Label,
        lblMoney:cc.Label,
        lblGems:cc.Label,
        lblID:cc.Label,
        spHead:cc.Sprite,
        lblNotice:cc.Label,
        joinGameWin:cc.Node,
        createRoomWin:cc.Node,
        settingsWin:cc.Node,
        helpWin:cc.Node,
        xiaoxiWin:cc.Node,
        btnJoinGame:cc.Node,
        btnReturnGame:cc.Node,
        sprHeadImg:cc.Sprite,
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    
    initNetHandlers:function(){
        var self = this;
    },
    
    onShare:function(){
        cc.vv.anysdkMgr.share("天天麻将","天天麻将，包含了血战到底、血流成河等多种四川流行麻将玩法。");   
    },

    // use this for initialization
    onLoad: function () {

        //初始化游戏监听
        GamesMgr.initGame("nn");
        // window.DataHelper = require('DataHelper').initHelper();
        this._ntf = this.addComponent('ComNotify');
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
        }
        this.initPlayer();
        
        if(cc.vv.gameNetMgr.roomId == null){
            this.btnJoinGame.active = true;
            this.btnReturnGame.active = false;
        }
        else{
            this.btnJoinGame.active = false;
            this.btnReturnGame.active = true;
        }
        
        //var params = cc.vv.args;
        var roomId = cc.vv.userMgr.oldRoomId 
        if( roomId != null){
            cc.vv.userMgr.oldRoomId = null;
            cc.vv.userMgr.enterRoom(roomId);
        }
        
        // var imgLoader = this.sprHeadImg.node.getComponent("ImageLoader");
        // imgLoader.setUserID(cc.vv.userMgr.userId);
        cc.vv.utils.addClickEvent(this.sprHeadImg.node,this.node,"Hall","onBtnClicked");
        
        
        this.addComponent("UserInfoShow");
        
        this.initButtonHandler("Canvas/right_bottom/btn_shezhi");
        this.initButtonHandler("Canvas/right_bottom/btn_help");
        this.initButtonHandler("Canvas/right_bottom/btn_xiaoxi");
        this.helpWin.addComponent("OnBack");
        this.xiaoxiWin.addComponent("OnBack");
        
        // if(!cc.vv.userMgr.notice){
        //     cc.vv.userMgr.notice = {
        //         version:null,
        //         msg:"数据请求中...",
        //     }
        // }
        
        // if(!cc.vv.userMgr.gemstip){
        //     cc.vv.userMgr.gemstip = {
        //         version:null,
        //         msg:"数据请求中...",
        //     }
        // }
        // cc.log("......................",cc.vv.userMgr.notice.msg);
        // this.lblNotice.string = cc.vv.userMgr.notice.msg;
        
        // this.refreshInfo();
        // this.refreshNotice();
        // this.refreshGemsTip();
        
        cc.vv.audioMgr.playBGM("bgMain.mp3");

        cc.vv.utils.addEscEvent(this.node);
        let OnAction = ServerRouters.OnAction_FKNN ;
        this._ntf.register( OnAction.PLAYER_ENTER_ROOM , ()=>{
            // if( $G.gGroupId ) GroupServer.unlistenGroupMatch( $G.gGroupId );
            cc.director.loadScene("GameScene_NN");
        });
    },
    
    refreshInfo:function(){
        var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                if(ret.gems != null){
                    this.lblGems.string = ret.gems;    
                }
            }
        };
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
        };
        // cc.vv.http.sendRequest("/get_user_status",data,onGet.bind(this));
    },
    
    refreshGemsTip:function(){
        var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                cc.vv.userMgr.gemstip.version = ret.version;
                cc.vv.userMgr.gemstip.msg = ret.msg.replace("<newline>","\n");
            }
        };
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            type:"fkgm",
            version:cc.vv.userMgr.gemstip.version
        };
        // cc.vv.http.sendRequest("/get_message",data,onGet.bind(this));
    },
    
    refreshNotice:function(){
        var self = this;
        var onGet = function(ret){
            ret.msg = "地瓜啤酒工作室出品，必属精品";
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                cc.vv.userMgr.notice.version = ret.version;
                cc.vv.userMgr.notice.msg = ret.msg;
                cc.log("22222222222222222",ret.msg)
                this.lblNotice.string = ret.msg;
            }
        };
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            type:"notice",
            version:cc.vv.userMgr.notice.version
        };
        // cc.vv.http.sendRequest("/get_message",data,onGet.bind(this));
    },
    
    initButtonHandler:function(btnPath){
        var btn = cc.find(btnPath);
        cc.vv.utils.addClickEvent(btn,this.node,"Hall","onBtnClicked");        
    },
    
    
    
    initPlayer:function(){
        let info = cc.sys.localStorage.getItem("userInfo");
        info = JSON.parse(info);
        // cc.log("【消息消息。。。】",info.nickname , info.sex);
        if(info){
            this.lblName.string = info.nickname;
            let id = UserHandler.getId();
            cc.log("本地消息打印",id);
            this.lblID.string = "ID:" + UserHandler.getId();
            let head = info.headimgurl;
            this._showHead(head);
            this.lblGems.string =  UserHandler.getRoomCardsAll();
        }else{
            this.lblName.string = "测试账号"
            this.lblID.string = "ID:" + UserHandler.getId();
            this.lblGems.string =  UserHandler.getRoomCardsAll();
            this._showHead();
        }
    },
    //head 为地址获取后需要转换为img格式
    _showHead:function(Head){
        // cc.log("【头像地址】",Head);
        Head = "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6SE29G1caIYkbbc8aLeTEYlibxj8O9PibKseNd7gpHtfFlQPK2r0VGPBAL7qYGl4lluzRUYMLwLrw/132";
        cc.loader.load({ url :Head  , type : "png"} , (err, img) => {
            if (err) return cc.log(err);
            let spriteFrame = new cc.SpriteFrame();
            spriteFrame.setTexture(img);
            // cc.sys.localStorage.setItem("userHead", spriteFrame);
            this.spHead.spriteFrame = spriteFrame;
        })
    },
    
    onBtnClicked:function(event){
        AudioMgr_Game.playButton();
        if(event.target.name == "btn_shezhi"){
            this.settingsWin.active = true;
        }   
        else if(event.target.name == "btn_help"){
            this.helpWin.active = true;
        }
        else if(event.target.name == "btn_xiaoxi"){
            this.xiaoxiWin.active = true;
        }
        else if(event.target.name == "head"){
            cc.vv.userinfoShow.show(cc.vv.userMgr.userName,cc.vv.userMgr.userId,this.sprHeadImg,cc.vv.userMgr.sex,cc.vv.userMgr.ip);
        }
    },
    
    onJoinGameClicked:function(){
        AudioMgr_Game.playButton();
        this.joinGameWin.active = true;
    },
    
    onReturnGameClicked:function(){
        cc.vv.wc.show('正在返回游戏房间');
        cc.director.loadScene("mjgame");  
    },
    
    onBtnAddGemsClicked:function(){
        cc.vv.alert.show("提示",cc.vv.userMgr.gemstip.msg,function(){
            this.onBtnTaobaoClicked();
        }.bind(this));
        // this.refreshInfo();
    },
    
    onCreateRoomClicked:function(){
        AudioMgr_Game.playButton();
        // if(cc.vv.gameNetMgr.roomId != null){
        //     cc.vv.alert.show("提示","房间已经创建!\n必须解散当前房间才能创建新的房间");
        //     return;
        // }
        // console.log("onCreateRoomClicked");
        // // this.createRoomWin.active = true; 
        // let msg = {baseScore: 10, scoreMin: 1000}
        // RoomServer.createRoom( msg, ()=>{
        //     cc.director.loadScene("GameScene_NN");
        // })
        this.createRoomWin.active = true
    },
    
    onBtnTaobaoClicked:function(){
        cc.sys.openURL('https://shop596732896.taobao.com/');
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var x = this.lblNotice.node.x;
        x -= dt*100;
        if(x + this.lblNotice.node.width < -1000){
            x = 500;
        }
        this.lblNotice.node.x = x;
        
        if(cc.vv && cc.vv.userMgr.roomData != null){
            cc.vv.userMgr.enterRoom(cc.vv.userMgr.roomData);
            cc.vv.userMgr.roomData = null;
        }
    },

    onButtonClick:function(event , custom){
        AudioMgr_Game.playButton();
        switch(custom){
            case "line":
                MsgHelper.pushToast('该功能暂未开放');
                break;
            case "turn":
                MsgHelper.pushToast('该功能暂未开放');
                break;
            case "share":
                MsgHelper.pushToast('该功能暂未开放');
                // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/wxShare",
                // "share",
                // "(Ljava/lang/String;)V",
                // "this is a message from js");
                // this._sendInfo();
                break;
            case "invite":
                MsgHelper.pushToast('该功能暂未开放');
                break;
            case "activity":
                MsgHelper.pushToast('该功能暂未开放');
                break;
        }
    },
});
