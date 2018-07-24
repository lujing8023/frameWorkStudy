cc.Class({
    extends: cc.Component,

    properties: {
        // notifys : [ [name , cb ]... ]
        _notifys : [] ,
    },

    onLoad : function(){
        cc.log('@COMNTF onLoad')
    },

    onDestroy : function(){
        // MsgHelper.pushToast('COMNTF DESTROY');
        cc.log('@COMNTF DESTROY')
        if( this._notifys.length <= 0 ) return ;
        _.each( this._notifys , ( item ) => { NotifyHelper.remove( item[0] , item[1] ); })
        this._notifys = null ;
    },

    register : function( name = '' , cb = null ){
        this._notifys.push( [ name , cb ] );
        NotifyHelper.register( name , cb );
    },
});
