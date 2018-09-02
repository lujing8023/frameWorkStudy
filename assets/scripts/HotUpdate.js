
//****************** 私有变量 ******************
var am,                 // AssetsManager
    failCount = 0,
    updating = false,
    canRetry = false,
    lz = {},
    // storagePath = '',
    checkListener,
    updateListener;

// 错误代码 
var ERRCODE = {
    ERROR_NO_LOCAL_MANIFEST: 1, // 未找到本地manifest文件
    ERROR_DOWNLOAD_MANIFEST: 2, // 下载manifest文件失败
    ERROR_PARSE_MANIFEST: 3, // 解析manifest文件失败
    ERROR_DECOMPRESS: 4 // 解压失败
};

//****************** 内部函数 ******************

function init() {
    am = null;
    failCount = 0;
    updating = false;
    canRetry = false;
    // storagePath = '';
    checkListener = null;
    updateListener = null;
};

function fmtBytes(n) {
    return Math.round(n / 10000) / 100 + 'MB'
};

//****************** 组件 ******************
cc.Class({
    extends: cc.Component,

    properties: {
        manifestUrl: cc.RawAsset,
        updatePanel: cc.Node,
        updateInfo: cc.Label,
        updateBar: cc.ProgressBar,
        btnOK: cc.Node
    },


    onLoad: function () {
        // cc.log(this.manifestUrl)
        init();
        this.updatePanel.active = false;
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return
        }
        // TODO: 不同项目要修改这里的路径
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'nn');

        // 版本对比函数
        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        var versionCompareHandle = function (versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };

        am = new jsb.AssetsManager(this.manifestUrl, storagePath, versionCompareHandle);
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            am.retain();
        }

        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        // 文件校验函数
        // am.setVerifyCallback(function (path, asset) {
        //     // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
        //     if (asset.compressed) {
        //         return true;
        //     }
        //     var md5 = md5.hex_md5(path)
        //     if (md5 === asset.md5) {
        //         this.updateInfo.string = '校验文件: ' + path;
        //         return true;
        //     }
        //     return false;
        // });

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // 当并发任务太多时，有些安卓设备可能使下载过程变慢。
            // 以下最大并发任务数值可能不准确，请多测试以找到最适合你游戏的并发数值。
            am.setMaxConcurrentTask(4);
        }

        this.checkUpdate();
    },

    onDestroy: function () {
        if (updateListener) {
            cc.eventManager.removeListener(updateListener);
            updateListener = null;
        }
        if (am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            am.release();
        }
    },

    checkCb: function (event) {
        lz.needUpdate = true;
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_NO_LOCAL_MANIFEST;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_DOWNLOAD_MANIFEST;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_PARSE_MANIFEST;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.updateInfo.string = '已更新到最新版本';
                lz.needUpdate = false;
                this.scheduleOnce(lz.EventCenter.sendMessage("ALREADY_UP_TO_DATE"), 0);
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                // cc.log('发现新版本，请点击更新按钮。');

                this.updateInfo.string = '';
                this.updatePanel.active = true;
                this.updateBar.progress = 0.01;
                this.scheduleOnce(function () {
                    this.hotUpdate();
                }.bind(this), 1);
                // this.hasNewVsn = true;
                break;
            default:
                return;
        }

        cc.eventManager.removeListener(checkListener);
        checkListener = null;
        updating = false;
    },

    updateCb: function (event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_NO_LOCAL_MANIFEST;
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.updateBar.progress = event.getPercentByFile() + 0.01;
                this.updateInfo.string = fmtBytes(event.getDownloadedBytes()) + ' / ' + fmtBytes(event.getTotalBytes());
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_DOWNLOAD_MANIFEST;
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_PARSE_MANIFEST;
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.updateInfo.string = '已更新到最新版本';
                // this.hasNewVsn = false;
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.updateInfo.string = '更新完成。 ' + event.getMessage();
                needRestart = true;
                // this.hasNewVsn = false;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.updateInfo.string = '更新失败, 正在重试。 ' + event.getMessage();
                updating = false;
                canRetry = true;
                this.retry();
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.updateInfo.string = '资源更新错误: ' + event.getAssetId() + ', ' + event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.updateInfo.string = '更新失败 : ' + ERRCODE.ERROR_DECOMPRESS;
                break;
            default:
                break;
        }

        if (failed) {
            cc.eventManager.removeListener(updateListener);
            updateListener = null;
            updating = false;
        }

        if (needRestart) {
            cc.eventManager.removeListener(updateListener);
            updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));

            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },

    retry: function () {
        if (!updating && canRetry) {
            failCount++;
            this.updateInfo.string = '正在进行第' + failCount + '次重试...';
            if (failCount > 3) {
                this.updateInfo.string = '重试失败!';
                return
            }
            canRetry = false;
            am.downloadFailedAssets();
        }
    },

    checkUpdate: function () {
        if (updating) {
            this.updateInfo.string = 'Checking or updating ...';
            return;
        }
        if (am.getState() === jsb.AssetsManager.State.UNINITED) {
            am.loadLocalManifest(this.manifestUrl);
        }
        if (!am.getLocalManifest() || !am.getLocalManifest().isLoaded()) {
            this.updateInfo.string = 'Failed to load local manifest ...';
            return;
        }
        checkListener = new jsb.EventListenerAssetsManager(am, this.checkCb.bind(this));
        cc.eventManager.addListener(checkListener, 1);

        am.checkUpdate();
        updating = true;
    },

    hotUpdate: function () {
        if (am && !updating) {
            this.btnOK.active = false;
            updateListener = new jsb.EventListenerAssetsManager(am, this.updateCb.bind(this));
            cc.eventManager.addListener(updateListener, 1);

            if (am.getState() === jsb.AssetsManager.State.UNINITED) {
                am.loadLocalManifest(this.manifestUrl);
            }

            failCount = 0;
            am.update();

            updating = true;
        }
    },
});