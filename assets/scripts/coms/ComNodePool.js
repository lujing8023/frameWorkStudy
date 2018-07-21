/**
 * 对象池工具
 */
cc.Class({
    extends: cc.Component,

    properties: {
        nodePool : null         ,
    },

    onLoad : function(){
        cc.log('ComPagePool');
        this._initPool();
    },
    
    onDestroy : function(){
        this.clearPool();
    },

    // 初始化对象池
    _initPool : function (){
        if(this.nodePool == null)this.nodePool = new cc.NodePool();
        return;
    },

    //清理对象池
    clearPool : function(){
        if(this.nodePool)this.nodePool.clear();
    },

    //放回对象池
    putNode : function (node){
        this.nodePool.put(node);
    },
    
    //获取对象池中对象
    getNode : function ( node ){
        this._initPool();
        let item = this.nodePool.get();
        if ( item === null ) {
            this.nodePool.put(cc.instantiate(node));
            item = this.nodePool.get();
        }
        return item;
    },
});