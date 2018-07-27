

/***
 * log ON / OFF
 */
// var log = function(){};  // OFF
var log = function( info ){   cc.log( info );  }   // ON

var state = {
    INITED       : 1 ,
    REQUESTING   : 2 ,
    FINISH       : 3 ,
    CANCEL       : 4 ,
    TIMEOUT      : 5 , 
};

function HttpHelper(){
    this.state          = state.INITED;
    this.host           = null;
    this.port           = null;
    this.router         = null;
    this.params         = null;
}


/**
 * exports
 */
module.exports = new HttpHelper();


/***
 * initNet
 */
HttpHelper.prototype.initNet = function(){
    this.state = state.INITED ;
    this.serverList = HttpHandler.getConfig('HttpList');
    this.setAServer();
};

/**
 * setAServer
 */
HttpHelper.prototype.setAServer = function(){
    let index = _.random( 0 , _.size(this.serverList)-1 );
    this.host = this.serverList[ index ].host ;
    this.port = this.serverList[ index ].port ;
};


/**
 * getAServer
 */
HttpHelper.prototype.getAServer = function(){
    return {
        host : this.host ,
        port : this.port
    }
};


/**
 * getUrl
 */
HttpHelper.prototype.getUrl = function( host , port  , router , params , isPost = false , isNoKey = false ){
    let url = 'http://' + host + ':' + port + '/' + router ;
    if( isPost ) return url ;
    if( isNoKey ){
        return url += ( '/' + encodeURIComponent(params));
    }
    
    let query = '';
    _.each( params , function(value, key) {
        if(!_.isEmpty(query)) {
            query += '&';
        }
        query += (key + '=' + encodeURIComponent(value)); // fix ios 不支持中文的bug
    });
    url += (_.isEmpty(query) ? '' : ('?' + query));
    return url;
};

/**
 * getDefaultUrl
 */
HttpHelper.prototype.getDefaultUrl = function( router , params , isPost = false , isNoKey = false ){
    return this.getUrl( this.host , this.port , router , params , isPost , isNoKey );
};


/***
 * < request >
 * 
 * routerObj : string for url , obj for router
 */
HttpHelper.prototype.request = function( routerObj , cbYes , cbDone2 , cbError , isPost = false , showLoading = true , isNoKey = false ) {
    if( this.state < state.INITED ) {
        cc.error('Error: http not inited');
        return;
    }

    showLoading = ( gLoadingScene == null ) ? showLoading : false  ;
    let cbDone = cbDone2 ;
    if( showLoading ){
        cbDone = ()=>{ 
            MsgHelper.removeLoading();
            if( cbDone2 ) cbDone2();
        }
        MsgHelper.pushLoading();
    }
    
    let url    = null ;
    let params = null ;
    if( _.isString( routerObj )){
        url    =  routerObj ;
    }else{
        url    =  this.getUrl( this.host , this.port , routerObj.router , routerObj.params , isPost , isNoKey );
        params = routerObj.params ;
    }

    this.state    = state.REQUESTING ; 
    var xhr       = new XMLHttpRequest();
    var timeout   = Configs.Http_Timeout ;
    var isTimeout = false ;     
    var ontimeout = function(){
        cc.log('timeout :' + url);
        isTimeout = true ;
        xhr.abort();
        if( cbDone ) cbDone();
    }
    var timer              = setTimeout( ontimeout , timeout )
    xhr.onerror            = ()=>this.onError(cbError) ;
    xhr.onreadystatechange = function(){
        if ( xhr.readyState != 4 ) return ;
        if ( isTimeout ) return ;
        clearTimeout( timer ) ; //取消等待的超时
        this.state = state.FINISH ;
        if ( xhr.status == 200 ){
            let pRes = isNoKey ? xhr.response : JSON.parse( xhr.response ) ;
            if( cbYes )  cbYes( pRes );
            if( cbDone ) cbDone();
            cc.log( pRes );
        }else{
            if( cbDone ) cbDone();
            if( cbError) cbError();
        } 
    };

    let log = 'HttpRequest : ' + ( isPost ? 'Post : ' : 'Get : ' ) + url ;
    cc.log( log );

    if( isPost ){
        xhr.open('POST', url , true );
        if( isNoKey ){
            xhr.responseType = "text";
            xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8"); 
            xhr.send( params );
        }else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send( JSON.stringify(params) );
        }   
    }else{
        // if( isNoKey ){
        //     xhr.responseType = 'arrayBuffer' ;
        // }else{

        // }
        xhr.open("GET", url, true);
        xhr.send();
    }
};


HttpHelper.prototype.onError = function( cbError ) {
    if(this.state !== state.REQUESTING ) {
        return;
    }
    cc.log('请求错误');
    if( cbError ) cbError(); 
    MsgHelper.removeLoading();
};
