

cc.Class({
    extends: cc.Component,

    properties: {
       ndList       : cc.Node,
       ndItem       : cc.Node,
    },

    onLoad () {
        this.init();
    },


    init:function(){
        this.comNodePool        = this.addComponent('ComNodePool');
        this._removeChild();
        this._initPlayerInfo();
    },

    //移除玩家
    _removeChild:function(){
        if(this.ndList.children){
            let  ndList_children= this.ndList.children;
            while(ndList_children.length > 0 ){
                this.comNodePool.putNode(ndList_children[0]);
            }
        }
    },

    //添加玩家
    _initPlayerInfo:function(){
        let result = GameMsgHandler.getRoomResult();
        _.each(result , (player , index)=>{
            this._addItem(player);
        })
    },

    //初始化玩家信息
    _addItem:function(){
        let ndItem = this.comNodePool.getNode(this.ndItem);
        this.ndList.addChild(ndItem);
        let msg = GameMsgHandler.getRoomResult();
        cc.log("【大结算里的 消息。。。。】",msg)
    },

    //按钮
    onButtonClick:function(){
        RoomServer.leaveRoom(()=>{
            GameLogic.leaveRoom();
        });
    }

});
