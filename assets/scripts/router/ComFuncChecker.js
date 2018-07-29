cc.Class({
    extends: cc.Component,

    properties: {
        funcList : [] , // [ { cb , checkCb } ]  if( checkCb() ) cb()
    },

    onLoad : function(){
        cc.log('@COM FuncCheck onLoad')
    },

    onDestroy : function(){
        cc.log('@COM FuncCheck DESTROY')
        this.funcList = null ;
    },

    addFunc : function( cb , checkCb ){
        if( !_.isFunction(cb) || !_.isFunction(checkCb) ){
            cc.log( '不是函数' );
            return;
        }
        this.funcList.push( { cb : cb , checkCb : checkCb } );
        this.execute();
    },

    execute : function(){
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
    },

    clear : function(){
        this.funcList = [] ;
    }
});
