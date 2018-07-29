cc.Class({
    extends: cc.Component,

    properties: {
        couldShowBankerAction       : false ,
        count                       : 12    ,   // 数组个数
        startTime                   : 0.05  ,   // 起始时间
        interval                    : 0.075   ,   // 时间间隔
    },

    onLoad : function(){
        // this._ctl = this.node.getComponent('$G.gCDatatl');
    },

    onDestroy : function(){

    },

    reset : function(){
        this.couldShowBankerAction = false ;
    },

    enableBankerAction : function( enable ){
        this.couldShowBankerAction = enable ;
    },

    _getBankerList : function(){
        let PlayerPlayingArr = [];
        let bankerIndexes = [];
        //找出参与游戏的玩家列表  PlayerPlayingArr  以及抢庄的玩家列表  bankerIndexes
        _.each( GameMsgHandler.getSeats() , (seat,index)=>{
            let cid = GameMsgHandler.getCid( index );
            if(seat && seat.user){
                let isPlaying = GameMsgHandler.isPlayerPlaying( seat.user.id );
                if( isPlaying ){
                    PlayerPlayingArr.push(index);
                    if(seat.banker == 1){
                    bankerIndexes.push(index);
                    }
                }
            }
        });
        //抢庄列表大小 = 1的时候不执行动画返回null
        //抢庄列表大小 = 0的时候按照所有人抢庄处理
        let len = _.size(bankerIndexes);
        if(len == 1){
            return null;
        }else if(len == 0){
        bankerIndexes = PlayerPlayingArr;
        len = _.size(bankerIndexes);
        }
        return bankerIndexes;
    },
    getBankerList : function(){
        return RandomListHelper.getListFromArray( GameMsgHandler.getBankerSid() , 15 , this._getBankerList );
    },
    getTimeList : function(){
        return RandomListHelper.getTimeList( 15 , 0.05 , 0.1 );
    },

});