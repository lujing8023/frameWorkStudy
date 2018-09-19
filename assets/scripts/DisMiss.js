

cc.Class({
    extends: cc.Component,

    properties: {
        ndCancel   :   cc.Node , 
        ndSure     :   cc.Node , 
    },

    onLoad () {
        this.init();
    },
    init:function(){
        let dis = GameMsgHandler.getDismiss();
        let seat = GameMsgHandler.getSid(0);
        if(seat == dis.seat){
            this.ndCancel.active = false;
            this.ndSure.active = false;
        }
    },

    onButtonClock:function(event , custom){
        switch( custom ){
            case 'sure' :
                RoomServer.dismissRoom(()=>{
                    RoomServer.dismissVote(true);
                });
                // this._ui.ndDisRoom.active = true;
                this.ndCancel.active = false;
                this.ndSure.active = false;
                break;
            case 'cancel' :
                RoomServer.dismissVote(false);
                this.node.destroy();
                break;
        }
    }

});
