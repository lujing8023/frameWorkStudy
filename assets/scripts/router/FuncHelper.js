/**
 * 回调函数检查helper
 * 
 * 某些函数触发需要满足特殊的条件，如果满足才执行，如果不满足需要取消执行，等条件满足后再执行
 * 
 */


 /**
  * FuncHelper
  */
function FuncHelper(){
    this.funcList           = [] ;  // [ { cb , checkCb } ]  if( checkCb() ) cb()
}

/**
 * exports
 */
module.exports = new FuncHelper();


/***
 * addFunc
 */
FuncHelper.prototype.addFunc = function( cb , checkCb ){
    if( !_.isFunction(cb) || !_.isFunction(checkCb) ){
        cc.log( '不是函数' );
        return;
    }
    this.funcList.push( { cb : cb , checkCb : checkCb } );
    this.execute();
};

/***
 * execute
 */
FuncHelper.prototype.execute = function(){
    let len = _.size( this.funcList );
    cc.log( 'funcs :' + len  );
    _.times( len , (i)=>{
        let index = len - i - 1 ;
        let item  = this.funcList[ index ];
        if( item.checkCb() ){
            item.cb();
            cc.log( this.funcList );
            this.funcList.splice( index , 1 );
            cc.log( this.funcList );
        }
    });
};