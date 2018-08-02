
cc.Class({
    extends: cc.Component,

    properties: {
        lbCenter    : cc.Label  ,
        pbarLight   : cc.ProgressBar ,
    },

    onLoad : function(){
        this.scheduleActive = false ;

        //debug
        // this.initTime(10);
    },

    onDisable : function(){
        cc.log('@clock disable');
        this.removeSchedule();
    },

    update : function(dt){
        if( this.scheduleActive ){
            this.updateLight(dt);
        }
    },

    initTime : function( time ){
        if( time < 0 ) return ;

        this.timeOri   = time ;
        this.timeInt   = time ;
        this.timeFloat = time ;
        this.lbCenter.string = time ;
        this.scheduleActive  = true ;
    },

    updateTime : function(){
        this.timeInt -- ;
        this.lbCenter.string = this.timeInt ;
        if( this.timeInt == 3 ){
            NotifyHelper.notify( NOTIFY_SHOW_321 );
        }
        if(this.timeInt <= 3 && cc.currentGame == 'bjl'){
            // AudioMgr_Game.gameAlert();
            return
        }
        if( this.timeInt <= 2 ){
            if(cc.currentGame == 'bjl'){
                return
            }
            // AudioMgr_Game.playSpecial('alert');
        } 
    },

    updateLight : function(dt){
        this.timeFloat -= dt ;
        if( this.timeFloat < 0 ){
            this.removeSchedule();
            this.node.active = false ;
            return ;
        }

        // let per = this.timeFloat / this.timeOri ;
        // this.pbarLight.progress = per ;
        let timeInt = Math.ceil( this.timeFloat ); 
        if( timeInt != this.timeInt ){
            this.updateTime();
        }
    },

    removeSchedule : function(){
        this.scheduleActive = false ;
    },

});
