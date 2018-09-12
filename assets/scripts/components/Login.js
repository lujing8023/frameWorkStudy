String.prototype.format = function(args) { 
    if (arguments.length>0) { 
        var result = this; 
        if (arguments.length == 1 && typeof (args) == "object") { 
            for (var key in args) { 
                var reg=new RegExp ("({"+key+"})","g"); 
                result = result.replace(reg, args[key]); 
            } 
        } 
        else { 
            for (var i = 0; i < arguments.length; i++) { 
                if(arguments[i]==undefined) { 
                    return ""; 
                } 
                else { 
                    var reg=new RegExp ("({["+i+"]})","g"); 
                    result = result.replace(reg, arguments[i]); 
                } 
            } 
        } 
        return result; 
    } 
    else { 
        return this; 
    } 
};

let APPID = 'wxf909a05e2c5ff4df';
let SECRET = 'df413b579789857f3765749f5e105429';
 
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _mima:null,
        _mimaIndex:0,
        ebAccount  : cc.EditBox ,  // login

        icon : cc.Sprite,
        nickName : cc.Label ,
    },

    // use this for initialization
    onLoad: function () {
        let OnAction = ServerRouters.OnAction_FKNN ;
        this._ntf = this.addComponent('ComNotify');
        this._ntf.register( OnAction.PLAYER_ENTER_ROOM , ()=>{
            GameHelper.loadGameScene();
        });
        cc.nn = {};
        cc.nn.callback = this.cbCode.bind(this);
        // this.label.string = this.text;
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
        }
        // cc.vv.http.url = cc.vv.http.master_url;
        // cc.vv.net.addHandler('push_need_create_role',function(){
        //     console.log("onLoad:push_need_create_role");
        // });
        // cc.director.loadScene("createrole");
        
        cc.vv.audioMgr.playBGM("bgMain.mp3");
        
        this._mima = ["A","A","B","B","A","B","A","B","A","A","A","B","B","B"];
        
        if(!cc.sys.isNative || cc.sys.os == cc.sys.OS_WINDOWS){
            cc.find("Canvas/down/btn_yk").active = true;
            cc.find("Canvas/down/btn_weixin").active = false;
        }
        else{
            cc.find("Canvas/down/btn_yk").active = false;
            cc.find("Canvas/down/btn_weixin").active = true;
        }
        //初始化输入框

        if(gLocalData.userInfo.openid){
            this.ebAccount.string  = gLocalData.userInfo.openid ;
        }
        cc.nn = {};
        cc.nn.callback = this.cbCode.bind(this);
    },
    
    start:function(){
        var account =  cc.sys.localStorage.getItem("wx_account");
        var sign = cc.sys.localStorage.getItem("wx_sign");
        if(account != null && sign != null){
            var ret = {
                errcode:0,
                account:account,
                sign:sign
            }
            cc.vv.userMgr.onAuth(ret);
        }   
    },
    
    onBtnQuickStartClicked:function(){
        // let account = _.random( 100000,999999 ) + "";
        // let guestLogin        = 'connector.authorizationHandler.login';
        // let param             = {  type:0 , account : account , game:cc.currentGame ? cc.currentGame : 'nn' }
        // // let obj = {  type:0 , account : account , game:cc.currentGame ? cc.currentGame : 'nn' }
        // cc.log("【初次請求發送的消息】",param)
        // SocketHelper.request( guestLogin , param , 
        //     (msg) => { 
        //         // cc.log('111');
        //         UserHandler.setData(msg);
        //         // cc.log("【获取玩家ID】",UserHandler.getId());
        //         cc.director.loadScene("hall");
        //         // server._onLoginSuccess(msg); 
        //         // if( cb ) cb();
        //         //为了快速登录用
        //         gLocalData.userInfo.account = UserHandler.getData().account ;
        //         DataHelper.saveAllData();
        //     } ,
        //     // (action) => { server._onLoginFailed(action); } ,
        //     true
        // );
        // // cc.vv.Net.send(guestLogin , obj);
    },
    
    onBtnWeichatClicked:function(){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/wxLogin",
        "login",
        "(Ljava/lang/String;)V",
        "this is a message from js");
        // this._sendInfo();
    },
    
    onBtnMIMAClicked:function(event){
        if(this._mima[this._mimaIndex] == event.target.name){
            this._mimaIndex++;
            if(this._mimaIndex == this._mima.length){
                cc.find("Canvas/btn_yk").active = true;
            }
        }
        else{
            console.log("oh ho~~~");
            this._mimaIndex = 0;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    //随机登录里的随机账号
    randomLogin:function(){
        UserServer.guestLogin( _.random( 100000,999999 ) + '' , (event)=>{
            // cc.director.loadScene("hall");
            gLocalData.userInfo.openid = UserHandler.getData().openid ;
            DataHelper.saveAllData();
        });
    },

    //随机登录里面的账号登录
    debugLogin:function(){
        // if( this.ebAccountL.string.length > 5 )
        //     UserServer.guestLogin( this.ebAccountL.string , (event)=>{
        //         // cc.director.loadScene("hall");
        //         gLocalData.userInfo.account = UserHandler.getData().id ;
        //         DataHelper.saveAllData();
        // });

        if( this.ebAccount.string.toString().length > 5 )
                    UserServer.guestLogin( this.ebAccount.string + "" , (event)=>{
                        gLocalData.userInfo.openid = UserHandler.getData().openid ;
                        DataHelper.saveAllData();
                });
                else
                    MsgHelper.pushToast($G.gStrings.CommonTips.importAccount);
    },


    // onButtonClick: function () {
    //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/wxLogin",
    //         "login",
    //         "(Ljava/lang/String;)V",
    //         "this is a message from js");
    // },

    cbCode(code) {
        // this.label.string = code;
        // cc.log('Js code --- ' + code);
        this.getAccessToken(code);
    },

    getAccessToken(code) {
        let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?' +
        'appid=' + APPID +
        '&secret=' + SECRET +
        '&code=' + code +
        '&grant_type=authorization_code';
        this.getUrl(url , (data) => {
            data = JSON.parse(data);
            // cc.sys.localStorage.setItem('', data);
            this.getUserInfo(data);
            
        })
    },

    getUserInfo(data) {
        let openid = data.openid;
        let access_token = data.access_token;
        let url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+
        access_token + '&openid='+ openid;
        this.getUrl(url, (data) => {
            data = JSON.parse(data);
            cc.sys.localStorage.setItem("userInfo", JSON.stringify(data));
            this.head = data.headimgurl;
            // this.nickName.string = data.nickname;
            this.showIcon(this.head, this.icon);
            this._sendInfo(data);
        })
    },

    showIcon(url, sprite) {
        cc.loader.load({url: url, type: 'png'}, (err, img) => {
            if (err) return cc.log(err);
            let spriteFrame = new cc.SpriteFrame();
            spriteFrame.setTexture(img);
            cc.sys.localStorage.setItem("userHead", JSON.stringify(spriteFrame));
            // sprite.spriteFrame = spriteFrame;
        })
    },

    getUrl(url, cb) {
        cc.log('Req --- ' + url);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let data = xhr.responseText;
                cc.log('Reseponse ---- ' + data);
                cb(data);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },

    //将获取的数据发给服务器  platformName , game , openid ,  account , head , nick , sex , cb
    _sendInfo:function(data){
        let info = data;
        let game = "nn";
        cc.log("【openID】",info.openid);
        let openid = info.openid;
        let account = null;
        let head = info.headimgurl;
        let nick = info.nickname;
        let sex = info.sex;
        // if(sex == 1){
        //     sex = 0;
        // }else{
        //     sex = 1;
        // }

        // let game = "nn";
        // let openid = "oi72NuC26zNunBVvUxjfqycR8ZFI";
        // let account = null;
        // let head = "https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419317851&token=&lang=zh_CN";
        // let nick = "猪猪侠";
        // let sex = 1;
        // cc.log("【点击发送按钮】");
        // cc.log("【game】",game)
        // cc.log("【openid】",openid)
        // cc.log("【account】",account)
        // cc.log("【head】",head)
        // cc.log("【nick】",nick)
        // cc.log("【sex】",sex)
        UserServer.platformLogin( null , game , openid , account , head , nick , sex , (event)=>{
            cc.log("【登录成功】",1111111111);
            gLocalData.userInfo.openid = UserHandler.getData().openid ;
            DataHelper.saveAllData();
            cc.director.loadScene("hall");
        });
    },
});
