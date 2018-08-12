
/**
 * AudioHelper
 * 
 */
module.exports.audioVolume = 0.5;
// module.exports.audioVolume = 0.05;

module.exports.resumeAll = function(){
    cc.log( 'Audio resumeAll ');
    cc.audioEngine.resumeAll();
};

module.exports.pauseAll = function(){
    cc.log( 'Audio pauseAll ');
    cc.audioEngine.pauseAll();
};


module.exports.stopMusic = function(){
    cc.audioEngine.stopMusic();
};

module.exports.pauseMusic = function() {
    cc.audioEngine.pauseMusic();
};

module.exports.resumeMusic = function() {
    if ( !gLocalData.sysInfo.shouldMusic ) return;

    cc.audioEngine.resumeMusic();
};

// temp
module.exports.playButton = function() {
    // if ( !gLocalData.sysInfo.shouldMusic ) return;

    // cc.audioEngine.resumeMusic();
};

/**
 * 播放音效
 * @param: path: "resources/audios/GameName/../SubFolder/name.mp3"
 */
module.exports._playEffect = function( path ){
    if( !gLocalData.sysInfo.shouldEffect ) return ;
    if( $G.gCData.gIsVoiceRecordOrPlay ) return ;

    let audioID = cc.audioEngine.play( cc.url.raw( path ), false );
    cc.audioEngine.setVolume(audioID , module.exports.audioVolume );

    return audioID;
}  
module.exports._stopEffect = function( audioID ){
    
    cc.audioEngine.stopEffect(audioID);
} 

/**
 * 播放音乐    【注意：该接口以后会取消，注意替换成最新api】
 * @param: path: "resources/audios/GameName/../SubFolder/name.mp3"
 */
module.exports._playMusic = function( path , loop = true ){
    if( !gLocalData.sysInfo.shouldMusic ) return ;

    let audioID = cc.audioEngine.playMusic( cc.url.raw( path ), loop );
    cc.audioEngine.setVolume(audioID , module.exports.audioVolume );
    if( !gLocalData.sysInfo.shouldMusic ) module.exports.pauseMusic() ;
    return audioID ;
}  

/**
 * 播放音乐，但是不循环播放，音乐播放一遍结束后，执行回调
 * @param {*} path 
 * @param {*} cb 
 */
module.exports._playMusicWithoutLoop = function( path , cb ){
    let audioId = module.exports._playMusic( path , false );
    if( audioId && cb ) cc.audioEngine.setFinishCallback( audioId , cb );
};