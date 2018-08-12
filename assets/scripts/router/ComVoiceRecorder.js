
// const LZString    = require("LZString");

/**
 * 录音组件，将该组件挂在发起语音的按钮上
 */
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    onLoad : function() {
        this._recordName      = 'record.amr' ;
        this._maxVoiceSeconds = 8 ;    // 允许的最大录音长度
        this._minVoiceSeconds = 1 ;  // 允许的最小录音长度
        this._recordStartTime = null ; // null的时候表示录音尚未开始，其他情况为Date.now()
        this._isAlertShowed   = false ;
        this._lastTouchY      = 0 ;
        this._minTouchCancel  = 6 ;  //手指移动取消的最小有效单位
        this._minTouchResume  = 3 ;  //手指移动恢复的最小有效单位


        VoiceNative.init();
        this.init();
    },

    /**
     * NOTIFY_VOICE_RECORD_START 
     * NOTIFY_VOICE_RECORD_END
     * NOTIFY_VOICE_RECORD_CANCEL
     * NOTIFY_VOICE_PLAY_START   // msg : { sid : 0 , data : [11] } 
     * NOTIFY_VOICE_PLAY_END 
     */
    init : function() {
        if (this.node.active == true) {
            this.node.on(cc.Node.EventType.TOUCH_START  , this.onRecordStart.bind(this) );
            this.node.on(cc.Node.EventType.TOUCH_END    , this.onRecordEnd.bind(this) );
            this.node.on(cc.Node.EventType.TOUCH_CANCEL , this.onRecordEnd.bind(this) );
            this.node.on(cc.Node.EventType.TOUCH_MOVE   , this.onMoved.bind(this) );
        } else {
            this.node.off(cc.Node.EventType.TOUCH_START , this.onRecordStart.bind(this) );
            this.node.off(cc.Node.EventType.TOUCH_END   , this.onRecordEnd.bind(this) );
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onRecordEnd.bind(this) );
            this.node.on(cc.Node.EventType.TOUCH_MOVE   , this.onMoved.bind(this) );
        }
    },


    onRecordStart : function( event ){
        cc.log("GameManager micBtn event down");
        this._lastTouchY = event.touch.getLocation().y;

        NotifyHelper.notify('NOTIFY_VOICE_RECORD_START' , { max : this._maxVoiceSeconds });
        this._recordStartTime = Date.now();
        VoiceNative.prepare(this._recordName);
    },

    onRecordEnd : function(){
        cc.log("GameManager micBtn event up");

        if( this._recordStartTime == null ) return ; // 超时
        if ( Date.now() - this._recordStartTime < this._minVoiceSeconds * 1000 ) {
            NotifyHelper.notify('NOTIFY_VOICE_RECORD_TOOSHORT');
            VoiceNative.cancel();
        } else {
            if (this._recordStartTime != null) {
                if( this._isAlertShowed ){
                    this._recordCancel() ;
                }else{
                    this._recordSuccess();
                }
            }
        }
        this._recordStartTime = null ;
    },

    _recordCancel: function(){
        cc.log("GameManager micBtn event cancel");
        this._recordStartTime = null ;
        NotifyHelper.notify( NOTIFY_VOICE_RECORD_CANCEL );
        VoiceNative.cancel();
    },

    _recordSuccess : function(){
        // 录音结束
        VoiceNative.release();
        // 录音时间
        let time = Date.now() - this._recordStartTime;
        
        cc.log("现在时间。。。。。  " + Date.now());
        cc.log("开始时间。。。。。  " + this._recordStartTime);
        cc.log("录音时间。。。。。  " + time);
        
        
        // 读取录音文件
        let msgStr = VoiceNative.getVoiceData(this._recordName);
        let enc    = VoiceNative.getDataString( msgStr );
        // let lzenc  = LZString.compress(LZString.compressToBase64(enc));
        // let lzenc  = LZString.compress( enc );
        NotifyHelper.notify( 'NOTIFY_VOICE_RECORD_END' , enc );

        //debug
        // NotifyHelper.notify( 'NOTIFY_VOICE_RECORD_END' , 'voice test' );
        // cc.log( enc );
        // let lzenc  = LZString.compress( enc );
        // let ulzenc = LZString.decompress( lzenc );
        // cc.log( ulzenc == enc );
    },

    onMoved : function(event){
        if( this._recordStartTime == null ) return ;
        var pos     = event.touch.getLocation();
        // var offset  = pos.y - this.node.parent.convertToWorldSpaceAR( this.node ).y ;
        var offset  = pos.y - this._lastTouchY ;
        this._lastTouchY = pos.y ;
        if( offset > this._minTouchCancel ){
            if( this._isAlertShowed ) return ;
            NotifyHelper.notify( NOTIFY_VOICE_RECORD_CANCEL_ALERT );
            this._isAlertShowed   = true ;
        }else if( offset < ( -1 * this._minTouchResume ) ){
            if( !this._isAlertShowed ) return ;
            this._isAlertShowed   = false ;
            NotifyHelper.notify( NOTIFY_VOICE_RECORD_START , { max : parseInt(( Date.now() - this._recordStartTime)/1000) });
        }
    },

    update: function (dt) {
        if( this._recordStartTime != null ){
            if( Date.now() > this._recordStartTime + this._maxVoiceSeconds * 1000 ){
                // 超过最长时间
                NotifyHelper.notify( NOTIFY_VOICE_PLAY_END);
                this._recordSuccess();
            }
        }
    },
});