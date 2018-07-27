/**
 * 带 NoodPool 的 Prefab 管理辅助
 * NPHelper -> NoodPoolHelper
 * 
 * 在创建缓冲池时，可以传入一个包含 unuse, reuse 函数的组件类型用于节点的回收和复用逻辑。
 */


/** 
 * 需要放进NPool中管理的对象的路径信息
 * Key  / Value , Name / Path
 * Path['Key'] = Value ;
 */
var Paths   = {
    PbToast     : 'hall/prefabs/NodePools/pbToast'          ,  //@注意：‘pb’的大小写
    PbTopInfo   : 'hall/prefabs/NodePools/pbTopInfo'        ,
    PbLoading   : 'hall/prefabs/NodePools/pbLoading'        ,
    PbCard      : 'hall/prefabs/NodePools/pbCard'           ,
    PbTouchMask : 'hall/prefabs/NodePools/pbTouchMask'      , 
    ComChatSF   : 'hall/prefabs/NodePools/ComChatSF'        , 
};

// pool
var ndPoolList          = {} ;
var ndNodeBackup        = {} ;  // 备份node实例，避免子游戏get的时候cc.loader找不到路径

// DEBUG
function testLog(){
    let info = '';
    _.each( ndPoolList , (pool,i)=>{
        info += i + ' :';
        info += pool._pool.length;
        info += ' '
    });
    info = '@@ POOL: ' + info ;
    cc.log(info);
};

/**
 * initHelper
 */
function initHelper( cb ){
    let loaded = 0 ;
    _.each( Paths , function( value , key ){
            CCLoaderHelper.getRes( value , cc.Prefab , function (err, prefab) { 
            cc.log( '@ NPHelper: <' + key + '> is loaded' );
            loaded ++ ;
            ndNodeBackup[ key ] = cc.instantiate( prefab );
            if( loaded >= _.size( Paths ) ){
                _initPool();
                if( cb ) cb();
                return ;
            }
        }); 
    });
};

// _initPool
function _initPool () {
    // cc.log('@ _initPool');
    for(let name in Paths){  
        ndPoolList[ name ] = new cc.NodePool( name );
        ndPoolList[ name ].put( getNode( name ) );
    } 
};


/**
 * clearPool
 */
function clearPool( name = null ){
    if( name === null ){
        for(let name in Paths){  
            _clearAPool( name );
        } 
    }else{
        _clearAPool( name );
    } 
};

function _clearAPool( name ){
    let pool = ndPoolList[ name ] ;
    if( pool === null ) return ;  

    // 源自NodePool.js源码的clear()方法，但是额外保留了一个node
    var count = pool._pool.length;
    if( count <= 1 ) return ;

    for (var i = 1; i < count ; ++i) {
        pool._pool[i].destroy();
    }
    pool._pool.length = 1;
};
    

/**
 * putNode
 */
function putNode( name , node ){
    // node.cleanup();
    ndPoolList[name].put( node ) ;
};

/**
 * getNode
 */
function getNode( name = 'PbCard' ){
    //debug
    testLog();

    try{
        let item = ndPoolList[name].get();
        if ( !item ) {
            // item = cc.instantiate( cc.loader.getRes( Paths[name] ) ); 
            item = cc.instantiate( ndNodeBackup[name] ) ;
        }
        item.x = 0 ;
        item.y = 0 ;
        item.scale = 1 ;
        item.skewY = 0 ;
        item.skewX = 0 ;
        return item ;
    }catch(err){
        cc.log( '@ NPHelper Error! err : ' + name );
        cc.log( err );
        return module.exports.getNode( name );
    }
};


module.exports = {
    testLog     : testLog      ,

    initHelper  : initHelper   ,
    getNode     : getNode      ,
    putNode     : putNode      ,

    clearPool   : clearPool    ,
};
