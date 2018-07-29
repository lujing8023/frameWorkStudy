
// const LZString    = require("LZString");

/**
 * 语音播放组件
 * 
 * 带队列
 */
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    onLoad : function() {
        // 语音队列
        this._voiceList       = []    ;
        this._recordName      = ''    ;
        this._isPlaying       = false ;
        this._recordName      = 'record.amr' ;

        let NTF = this.addComponent('ComNotify');
        NTF.register( NOTIFY_VOICE_PLAY_START , ( msg )=>{
            this.playVoiceByData( msg.data );
        });
        NTF.register( NOTIFY_VOICE_PLAY_END   , ( msg )=>{
            this._isPlaying = false ;
            AudioHelper.resumeAll();
        });
    },

    /**
     * NOTIFY_VOICE_PLAY_START   // msg : { sid : 0 , data : [11] } 
     * NOTIFY_VOICE_PLAY_END 
     */
    init : function( recordName ) {
        this._recordName = recordName ;
    },
    
    playVoiceByData : function( data ){
        // cc.log( data );
        // let dData = LZString.decompress(LZString.decompressFromBase64(data));
        let aData = VoiceNative.getDataArray( data );
        VoiceNative.writeVoice( this._recordName , aData );
        this.playVoiceLocal();  
    },

    playVoiceLocal(){
        cc.log( 'playfile ')
        if( this._isPlaying ) this.stop();
        VoiceNative.play( this._recordName );
        this._isPlaying = true ;
    },

    stop : function(){
        this._isPlaying = false ;
        VoiceNative.stop();
        this.onPlayEnd();
    },

    onPlayEnd : function () {
        NotifyHelper.notify( NOTIFY_VOICE_PLAY_END );
        AudioHelper.resumeAll();
    },


    
});
