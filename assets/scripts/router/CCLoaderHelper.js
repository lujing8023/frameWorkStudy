
/**
 * 
 * @param {*} path 
 * @param {*} type optional Only asset of type will be returned if this argument is supplied.
 * @param {*} cb (err,res)
 */
module.exports.getRes = function ( path , type , cb ) {
    let res = cc.loader.getRes( path ) ;
    if( res == null ){
        cc.loader.loadRes( path , type , cb );
        return ;
    }
    if( cb ) cb(null, res);
}

