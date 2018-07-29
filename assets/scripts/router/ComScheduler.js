// scheduler管理器，解决后台切换前台时，挤压的scheduler会集中执行的问题等

cc.Class({
    extends: cc.Component,

    properties: {
        _maxIndex : 20 ,
    },

    onLoad : function(){
        cc.log("@@ Scheduler onLoad");

        /**
         * _items : {
         *  'key1' : { max : x , current : y , cbs : [ { index , cb } ] },
         * }
         * 
         */
        this._items = {} ;

        // debug
        // this._addItem('fuck');
        // this.once('you', ()=>{ cc.log('1') },2);
        // this.once('you', ()=>{ cc.log('2') },4);
        // this.once('you', ()=>{ cc.log('3') },6);
        // this._removeCb('you',0);
        // this._removeCb('you',1);
        // this._removeCb('you',2);
        // this.once('you',()=>{ this.clear('you');cc.log( this._items ); },3 );
        // cc.log(this._items);
    },

    onDestroy : function(){
        this.clearAll();
        this._items = null ;
    },



    /**
     * once 
     */
    once : function( key , cb , time ){
        let scb  = this._addCb( key , cb );
        this.scheduleOnce( scb.cb , time );
    }, 

    /**
     * clear 
     */
    clear : function( key ){
        if( this._items[key] === null ) return ;
        if( this._items[key] === undefined ) return ;
        _.each( this._items[key].cbs , (item,index)=>{
            this._removeCb( key , index );
        });
        this._items[key].current = 0 ;
    },

    /**
     * clearAll 
     */
    clearAll : function(){
        let keys = _.keys( this._items );
        _.each( keys , (key)=>{ this.clear(key)});
    },






    _addItem : function( key , max , current = 0 ){
        max = max ? max : this._maxIndex ;
        let item = { max : max , current : current , cbs : [] } ;
        _.times( this._maxIndex , (i)=>{ item.cbs[i] = null ; });
        this._items[key] = item ;
    },

    _checkItemExist : function( key ){
        if( this._items[key] != null ) return ;
        this._addItem( key );
    },

    _addCb : function( key , cb ){
        this._checkItemExist( key );

        let item = this._items[key];
        if( item.current === item.max ){
            item.current = 0 ;
        }
        
        let func = ()=>{
            cb();
            this._removeCb(key,scb.index);
        }
        let scb = { index : item.current , cb : func } ;
        item.cbs[item.current] =  scb ;
        item.current ++ ;
        return scb ;
    },

    _removeCb : function( key , index ){
        let cbs = this._items[key].cbs;
        let cbItem = cbs[index];
        if( cbItem === null) return ;
        this.unschedule( cbs[index].cb );
        cbs[index] = null ;
    },

    

    


});
