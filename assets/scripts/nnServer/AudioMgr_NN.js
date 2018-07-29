class AudioMgr_NN {
    constructor() {}
    
    DZPATH = 'resources/games/nn/audios'
    PATH = 'resources/hall/audios'
    NowMusic = ``
    /***
     * playMusic
     */
    playMusic = function(SceneStr = "loadLoginScene"){
        let bgms = ['bg'];
        let randomBgmIndx = _.random(0,_.size(bgms) - 1);
        let file = gGameScene ?`${ this.PATH}/${bgms[randomBgmIndx]}.mp3` :`${this.PATH}/bg2.mp3` ;
        if(SceneStr == "updateMusic"){
        }else{
            //  NowScene = SceneStr;
            if( this.NowMusic  == file && this.NowMusic == `${this.PATH}/bg2.mp3`){
                return;
            }else{
                this.NowMusic  = file;
            }
        }
        
        let loop = true ;
        if( this.NowMusic == `${this.PATH}/bg2.mp3` ){
            AudioMgr_Hall.playMusic(SceneStr);
        }else{
            AudioMgr_Hall.NowMusic = this.NowMusic;
            AudioHelper._playMusicWithoutLoop( this.NowMusic , ()=>{
                this.playMusic(SceneStr)
            } );
        }
    };
    stopMusic = function(){
        AudioHelper.stopMusic()
    }
    // lose/win/start/menu/dispatch/banker/alert
    playSpecial = function( name ){
        let file = `${  this.DZPATH}/Common/${name}.mp3` ;
        AudioHelper._playEffect( file );
    };


    //resources/audios/(FKNN)/PokerType/(Boy)/ox_index.mp3 
    playPokerType = function( index , isBoy = true ){
        this._playBySex( 'PokerType' , 'ox' , index , isBoy );
    };

    //resources/audios/(FKNN)/Chat/(Boy)/Chat_index.mp3 
    playChat = function( index , isBoy = true ){
        this._playBySex( 'Chat' , 'Chat' , index , isBoy );
    };

    playScore = function( index , isBoy = true ){
        if( index === null ) return ;
        this._playBySex( 'CallScore' , 'CallScore' , index , isBoy );
    };

    playRob = function( rob , isBoy = true ){
        let file = `${  this.DZPATH}/Rob/${isBoy?'Boy':'Girl'}/${rob?'rob':'unrob'}.mp3` ;
        AudioHelper._playEffect( file );
    };


    _playBySex = function( folder , filePre , index , isBoy = true ){
        let file = `${  this.DZPATH}/${folder}/${isBoy?'Boy':'Girl'}/${filePre}_${index}.mp3` ;
        AudioHelper._playEffect( file );
    };

    // 按钮声音
    playButton = function(){
        this.playSpecial( 'audio_ui_click' );
    };
}


module.exports = new AudioMgr_NN();

















