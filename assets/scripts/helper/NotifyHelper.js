/**
 * exports
 */
module.exports = new cc.EventTarget();
var helper     = module.exports;


/**
 * 临时修复CCC重复监听的bug
 * CCC1.8已修复
 */
helper.checkError = function( name ){
    // return ( !this._bubblingListeners ) || ( !this._bubblingListeners._callbackTable[name] )
}
helper.debugLog = function( name ){
    // if( this.checkError( name ) ) return ;
    // cc.log( '##NTF ' + name + ' | count : '  +  _.size( this._bubblingListeners._callbackTable[name] ) );
}
helper.clearAll = function(){
    // if( !this._bubblingListeners ) return ;
    // if( !this._bubblingListeners._callbackTable ) return ;
    // _.each( this._bubblingListeners._callbackTable , (item,key)=>{
    //     cc.log( '## NTFHelper OFF : ' + key)
    //     this.off( key );
    // });
    // this._bubblingListeners._callbackTable  = {};
}




/**
 * register
 * 
 * @return:cb
 */
helper.register = function( name = '' , cb = null ){
    this.on( name , cb );
    this.debugLog( name );
}


/**
 * registerOnce
 * 
 * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
 */
helper.registerOnce = function( name = '' , cb = null ){
    this.once( name , cb );
}


/**
 * notify
 */
helper.notify = function( name = '' , detail = null ){
    cc.log( name );
    this.emit( name , detail );
}


/**
 * remove
 * 
 * examples:
 * var cb = helper.register( 'shit' , cb );
 * helper.remove( name , cb );
 *
 * cc.log( _.size( this._bubblingListeners._callbackTable.NOTIFY_GROUP_ADD ) )
 */
helper.remove = function( name = '' , cb = null ){
    this.off( name , cb );    
}

