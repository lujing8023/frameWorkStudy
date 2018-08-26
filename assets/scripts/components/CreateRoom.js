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
        _leixingxuanze: null,
        _gamelist: null,
        _currentGame: null,
        ndBtnsOfRoomType      : {
            default         : [] ,
            type            : cc.Node 
        },
        ndBtnsOfRoomPay      : {
            default         : [] ,
            type            : cc.Node 
        },
        lb12Round      : {
            default         : [] ,
            type            : cc.Label 
        },
        lb30Round      : {
            default         : [] ,
            type            : cc.Label 
        },
    },

    // use this for initialization
    onLoad: function () {

        // this._gamelist = this.node.getChildByName('game_list');

        // this._leixingxuanze = [];
        // var t = this.node.getChildByName("leixingxuanze");
        // for (var i = 0; i < t.childrenCount; ++i) {
        //     var n = t.children[i].getComponent("RadioButton");
        //     if (n != null) {
        //         this._leixingxuanze.push(n);
        //     }
        // }
        //默认第一个选项
        this.chooseRoomType(null , 0);

        //默认检查房间
        this._checkRoomType();

        //默认选择房主付
        this.chooseRoomPay(null , 0);

        //房间配置
        this._initRoomData();
    },

    _initRoomData:function(){
        this.roomData = [
            {capacity : 4 , rounds : 12 },
            {capacity : 5 , rounds : 12 },
            {capacity : 6 , rounds : 12 },
            {capacity : 7 , rounds : 12 },
            {capacity : 4 , rounds : 30 },
            {capacity : 5 , rounds : 30 },
            {capacity : 6 , rounds : 30 },
            {capacity : 7 , rounds : 30 },
        ]
    },

    onBtnBack: function () {
        this.node.active = false;
    },

    onBtnOK: function () {
        // var usedTypes = ['xzdd', 'xlch'];
        // var type = this.getType();
        // if (usedTypes.indexOf(type) == -1) {
        //     return;
        // }

        // this.node.active = false;
        this.createRoom();
    },

    getType: function () {
        var type = 0;
        for (var i = 0; i < this._leixingxuanze.length; ++i) {
            if (this._leixingxuanze[i].checked) {
                type = i;
                break;
            }
        }
        if (type == 0) {
            return 'xzdd';
        }
        else if (type == 1) {
            return 'xlch';
        }
        return 'xzdd';
    },

    getSelectedOfRadioGroup(groupRoot) {
        console.log(groupRoot);
        var t = this._currentGame.getChildByName(groupRoot);

        var arr = [];
        for (var i = 0; i < t.children.length; ++i) {
            var n = t.children[i].getComponent("RadioButton");
            if (n != null) {
                arr.push(n);
            }
        }
        var selected = 0;
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].checked) {
                selected = i;
                break;
            }
        }
        return selected;
    },

    createRoom: function () {
        let type = this._checkRoomType();
        //根据类型获取房间的数据
        let data = this.roomData[type];

        //创建房间数据格式  {baseScore : 0 , capacity : 4 , round : 12}
        this._send({capacity : 2 , rounds : 2 });
        // RoomServer.match(4 , ()=>{
        //     cc.director.loadScene("GameScene_NN");
        // });
        var self = this;
        // var onCreate = function (ret) {
        //     if (ret.errcode !== 0) {
        //         cc.log("创建房间失败回调里回调过来的信息",ret);
        //         cc.vv.wc.hide();
        //         //console.log(ret.errmsg);
        //         if (ret.errcode == 2222) {
        //             cc.vv.alert.show("提示", "钻石不足，创建房间失败!");
        //         }
        //         else {
        //             cc.vv.alert.show("提示", "创建房间失败,错误码:" + ret.errcode);
        //         }
        //     }
        //     else {
        //         cc.log("创建房间成功回调里回调过来的信息",ret);
        //         cc.vv.gameNetMgr.connectGameServer(ret);
        //     }
        // };

        // var type = this.getType();
        // var conf = null;
        // if (type == 'xzdd') {
        //     conf = this.constructSCMJConf();
        // }
        // else if (type == 'xlch') {
        //     conf = this.constructSCMJConf();
        // }
        // conf.type = type;

        // var data = {
        //     account: cc.vv.userMgr.account,
        //     sign: cc.vv.userMgr.sign,
        //     conf: JSON.stringify(conf)
        // };
        // console.log(data);
        // cc.vv.wc.show("正在创建房间");
        // cc.vv.http.sendRequest("/create_private_room", data, onCreate);
    },

    _send : function( params ){
        RoomServer.createRoom( params , (msg)=>{
            cc.director.loadScene("GameScene_NN");
            // MsgHelper.pushToast('创建成功');
            // let store = gLocalData.roomChoices[ cc.currentGame ];
            // store[0] = this.baseScoreIdx ;
            // store[1] = this.scoreMinIdx  ;
            // DataHelper.saveAllData();
            // this.onCloseDlg();
        } )
    },

    constructSCMJConf: function () {

        var wanfaxuanze = this._currentGame.getChildByName('wanfaxuanze');
        var huansanzhang = wanfaxuanze.children[0].getComponent('CheckBox').checked;
        var jiangdui = wanfaxuanze.children[1].getComponent('CheckBox').checked;
        var menqing = wanfaxuanze.children[2].getComponent('CheckBox').checked;
        var tiandihu = wanfaxuanze.children[3].getComponent('CheckBox').checked;

        var difen = this.getSelectedOfRadioGroup('difenxuanze');
        var zimo = this.getSelectedOfRadioGroup('zimojiacheng');
        var zuidafanshu = this.getSelectedOfRadioGroup('zuidafanshu');
        var jushuxuanze = this.getSelectedOfRadioGroup('xuanzejushu');
        var dianganghua = this.getSelectedOfRadioGroup('dianganghua');
        
        var conf = {
            difen:difen,
            zimo:zimo,
            jiangdui:jiangdui,
            huansanzhang:huansanzhang,
            zuidafanshu:zuidafanshu,
            jushuxuanze:jushuxuanze,
            dianganghua:dianganghua,
            menqing:menqing,
            tiandihu:tiandihu,   
        };
        return conf;
    },


    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    //     var type = this.getType();
    //     if (this.lastType != type) {
    //         this.lastType = type;
    //         for (var i = 0; i < this._gamelist.childrenCount; ++i) {
    //             this._gamelist.children[i].active = false;
    //         }

    //         var game = this._gamelist.getChildByName(type);
    //         if (game) {
    //             game.active = true;
    //         }
    //         this._currentGame = game;
    //     }
    },
    //选房间类型的按钮
    chooseRoomType:function(Event , custom){
        let type = parseInt(custom)
        _.each(this.ndBtnsOfRoomType , (node , index)=>{
            if(type == index){
                node.active = true;
            }else{
                node.active = false;
            }
        })
    },

    //检查房间类型
    _checkRoomType:function(){
        let type = "";
        cc.log("【房间按钮】",this.ndBtnsOfRoomType);
        _.each(this.ndBtnsOfRoomType , (node , index)=>{
            if(node.active){
                type = index
                cc.log("【type】")
            }
        })
        return type;
    },

    //选择房间支付类型
    chooseRoomPay:function(Event , custom){
        let type = parseInt(custom)
        _.each(this.ndBtnsOfRoomPay , (node , index)=>{
            if(type == index){
                node.active = true;
            }else{
                node.active = false;
            }
        })
        this._changePayNum(type);
        
    },

    //改变房卡数量
    _changePayNum:function(type){
       if(type == 0){
           _.each(this.lb12Round , (lb , index)=>{
               lb.string = `${4+index}人（12局）房卡x${4+index}`;
           })
           _.each(this.lb30Round , (lb , index)=>{
                lb.string = `${4+index}人（30局）房卡x${8+index*2}`;
           })
       }else{
            _.each(this.lb12Round , (lb , index)=>{
                lb.string = `${4+index}人（12局）房卡x${1}`;
            })
            _.each(this.lb30Round , (lb , index)=>{
                lb.string = `${4+index}人（30局）房卡x${2}`;
            })
       }

    }
});