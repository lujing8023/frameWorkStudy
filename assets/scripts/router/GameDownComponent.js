cc.Class({
    extends: cc.Component,

    properties: {
        gameType            : ''   ,

        _update             : null ,
        _updateState        : 0    ,
        _checked            : false ,
        _clicked            : false ,
        _isDownloading      : false ,
    },

    onLoad() {
        // ui
        this._ui = this.node.addComponent('ComChooseGameState');

        // update
        cc.log( '检查全局状态：' ,  $G.gCData.gameChecked);
        

        // start
        this._ui.showCouldDownload( !this._checkDownloaded() );
        this._ui.showDownloading( false );
    },

    /**
     * onButtonClicked
     */
    onButtonClicked: function (event, customEventData) {
        cc.log('GameDown clicked:' + customEventData);

        if( $G.gCData.gIsGameDownloading ){
            MsgHelper.pushToast('游戏正在下载中，请稍候片刻');
            return ;
        }

        this._clicked   = true ;
        cc.currentGame  = customEventData ;
        // web || package all
        if ( Configs.PACKAGE_MODE == Configs.PACKAGE_MODE_ALL || !cc.sys.isNative ) {
            this.enterGame();
        }else{
            this._checkGameState( false , false );
            this._checked = true ;
        }
    },

    /**
     * enterGame
     */
    enterGame: function () {
        $G.gCData.gIsGameDownloading = false ;
        $G.gCData.gameChecked[ cc.currentGame ] = true ;
        GamesMgr.initGame(cc.currentGame);
        cc.director.loadScene('HallScene');
    },

    /**
     * 检查子游戏是否有更新
     */
    _checkDownloaded : function(){
        if ( !cc.sys.isNative ) {
            return true ;
        } else {
            return UpdateHelper.isDownloaded(this.gameType);
        } 
    },

    _checkGameState : function( showDlg = true , onlyCheckDownload = false ){
        // 如果子游戏更新过一次就不再更新了
        if( $G.gCData.gameChecked[ cc.currentGame ] ){
            cc.log('游戏已经更新过')
            this.enterGame();
            return;
        }

        // 如果检查过一次状态，就不再检查
        if( this._updateState != 0 ){
            cc.log('游戏已经check过')
            this.checkUpDateHandler( this._updateState );
            return ;
        }

        // 正常检查流程
        if ( !cc.sys.isNative ) {
            this.alreadyGameView();
        } else {
            if( !$G.gCData.gameChecked[ cc.currentGame ] ){
                this._update = this.node.addComponent('UpdateComponent');
                this._update.initUI( this );
                this._update.initCheckUpDate( this.checkUpDateHandler.bind(this) , this.gameType );
            }
            if (this._update) {
                cc.log('进入native判断流程')
                var isLoadedFlag = UpdateHelper.isDownloaded(this.gameType);
                if (!isLoadedFlag) {
                    cc.log('还未下过', this.gameType);
                    if(this._checked) this.needDownLoadView( showDlg );
                } else {
                    this.alreadyGameView();
                }
            }
            if( !this._checked ){
                cc.log('开始第一次check')
                this._update.checkVersionUpdate();
            } 
        }
    },

    /**
     * 游戏下载过
     */
    alreadyGameView: function () {
        console.log('游戏已经下载过');
        $G.gCData.gIsGameDownloading = false ;
        this._ui.showCouldDownload( false );
        this._ui.showDownloading( false );
        if( this._checked && this._clicked ) this.enterGame();
    },

    /**
     * 需要下载的界面
     */
    needDownLoadView: function ( showDlg = true ) {
        this._ui.showCouldDownload( true );
        this._ui.showDownloading( false );

        if( showDlg ){
            let self = this ;
            PBHelper.addNode('DlgGameNeedDownload' , null , (node)=>{
                node.getComponent('DlgGameNeedDownload').initCb(()=>{
                    $G.gCData.gIsGameDownloading = true ;
                    self._update.startVerionUpdate();
                });
            });
        }
    },

    /**
     * 下载中的界面
     */
    downloadingView: function ( per = 0 ) {
        console.log('游戏下载中');
        this._ui.showCouldDownload( false );
        this._ui.showDownloading( true , per );
    },

    /**
     * 检测更新回调
     * @updateState  更新状态 1需要下载 2需要更新  3 已经下载没有需要更新的文件  4下载失败
     */
    checkUpDateHandler: function (updateState) {
        this._updateState = updateState;

        if (updateState == 1) {
            this.needDownLoadView();
        }
        else if (updateState == 2) {
            this.downloadingView();
        }
        else if (updateState == 3) {
            this.alreadyGameView();
        } else if (updateState == 4) {
            //下载失败
            var isLoadedFlag = UpdateHelper.isDownloaded(this.gameType);
            if (isLoadedFlag) {
                this.alreadyGameView();
                return;
            }
            cc.log('下载失败', this.gameType);
            this.needDownLoadView();
        }
    },

    /**
     * 开始下载
     */
    clickDownHandler: function (sender, data) {
        cc.log('开始下载:' + this._updateState);

        if (this._updateState == 4) {
            MsgHelper.pushToast('请确认游戏下载更新地址是否正确！' + this._update.m_verUrlPath);
            copyData(this._update.m_verUrlPath);
            return;
        }

    
        if (this._update && this._updateState == 1) {
            if (cc.sys.isNative) {
                this.downloadingView();
                this._updateState = 2;
                this._update.startVerionUpdate();
            }
        }

        if (!cc.sys.isNative) {
            MsgHelper.pushToast('请前往手机或模拟器下载玩游戏！');
        }
    },

});
