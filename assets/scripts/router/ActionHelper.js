
/***
 * getBigToSmall
 */
module.exports.getBigToSmall = function( time = 0.4 , to = 1.1 , from = 1 ){
    let scale1 = cc.scaleTo( time * 0.5 , to , to );
    let scale2 = cc.scaleTo( time * 0.5 , from , from );
    return cc.sequence( scale1 , scale2 );
};



/***
 * getScaleTo
 */
module.exports.getScaleTo = function( time = 0.1 , to = 1.0 ){
    return cc.scaleTo( time , to );
};

/***
 * getMJCardMovePool
 */
module.exports.getMJCardMovePool = function( cb = null , waitPosition = null , endPosition = null,  moveTime = 0.1 , waitTime = 0.35   ){
    let scaleToStart    = cc.scaleTo( moveTime , 1.5 );
    let moveToStart     = cc.moveTo( moveTime , waitPosition );
    let spawnStart      = cc.spawn( scaleToStart , moveToStart);

    var delay = cc.delayTime(waitTime);

    let scaleToEnd      = cc.scaleTo( moveTime , 0.5 );
    let moveToEnd       = cc.moveTo( moveTime , endPosition  );
    let spawnEnd        = cc.spawn( scaleToEnd , moveToEnd );

    let callFunc        = cc.callFunc(()=>{ if(cb) cb() });

    let seq = cc.sequence( spawnStart, delay ,spawnEnd , callFunc);
    return seq ;
};
/***
 * getMJCardMovePool2
 */
module.exports.getMJCardMovePool2 = function( cb = null , waitPosition = null , endPosition = null,  moveTime = 0.1 , waitTime = 0.35   ){
    let scaleToStart    = cc.scaleTo( moveTime , 1.35 );
    var delay = cc.delayTime(waitTime);
    let callFunc        = cc.callFunc(()=>{ if(cb) cb() });

    let seq = cc.sequence( scaleToStart, delay  , callFunc);
    return seq ;
};

/***
 * getDirection
 */
module.exports.getDirection = function(time = 0.5 , cb = null){
    //渐显
    var fadeIn = cc.fadeIn(time);
    //渐隐
    var fadeOut = cc.fadeOut(time);  
    let callFunc = cc.callFunc( ()=>{
        if(cb)cb();
    } )
    let seq = cc.sequence( fadeOut , fadeIn , callFunc);

    return seq ;
};

/***
 * getDirection
 */
module.exports.getFadeInToFadeOut = function(time = 0.5 , waitTime , cb = null){
    //渐显
    var fadeIn = cc.fadeIn(time);
    //渐隐
    var fadeOut = cc.fadeOut(time); 
    var moveBy = cc.moveBy( time , cc.v2(0,40) )
    let spawn =  cc.spawn( fadeIn , moveBy );
    var delay = cc.delayTime(waitTime); 
    let callFunc = cc.callFunc( ()=>{
        if(cb)cb();
    } )
    let seq = cc.sequence( spawn , delay , fadeOut , callFunc);

    return seq ;
};

/***
 * getDirectionUpdateAction
 */
module.exports.getDirectionUpdateAction = function(dt){
    return dt ;
};

/***
 * getArrowAction
 */
module.exports.getArrowAction = function( time = 0.5 , Altitude = 20){
    var jump1 = cc.jumpBy(time, cc.p(0,Altitude), 1, 1);
    var jump2 = cc.jumpBy(time, cc.p(0,-Altitude), 1, 1);
    let seq = cc.sequence(jump1 , jump2);
    var repeat = cc.repeatForever(seq);
    return repeat ;
};
/***
 * getResultDelaytime
 */
module.exports.getResultDelaytime = function(delay = 0.5){
    return delay ;
};
/***
 * getMJActionStateShow
 */
module.exports.getMJActionStateShow = function(){
    return cc.sequence( module.exports.getBigToSmall( 0.3 , 1.5 , 1 ).easing(cc.easeIn(1.0)) , cc.delayTime(0.7) );
};


/***
 * getDlg
 */
module.exports.getDlgShow = function( time = 0.15 , to = 1.2 , from = 1 ){
    return module.exports.getBigToSmall( time , to , from ).easing(cc.easeIn(1.0));
};

module.exports.getDlgHide = function(){
    return module.exports.getBigToSmall( 0.1 , 1.1 , 0.75 ).easing(cc.easeOut(1.0)) ;
};


/***
 * getDlg
 * 
 * scaleX 1->0->1
 * skewY  0->20 |（立即）| -20->0
 */
module.exports.getFlip = function( cb = null , scaleX = 1 , scaleY = scaleX ){
    let time   = 0.2 ;
    scaleX = scaleX ? scaleX : 1 ;
    
    let s1 = cc.spawn( cc.scaleTo( time , 0 , scaleX ) , cc.skewTo( time , 0 , 20 ) )
    let s2 = cc.skewTo( 0.016 , 0 , -20 );
    let cf = cc.callFunc( ()=>{ if(cb) cb() } );
    let s3 = cc.spawn( cc.scaleTo( time , scaleX , scaleX ) , cc.skewTo( time , 0 , 0 ) )

    return cc.sequence( s1 , s2 , cf , s3 );
};