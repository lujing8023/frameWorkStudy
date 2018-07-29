// TextureHelper.js

/****************************************************************************************/

var prePathGame_NN     = 'resources/type/'     ;
// var prePathGameShares  = 'resources/hall/gameshares/'         ;

/**
 * 得到SF
 * @param: path: "resources/textures/GameName/../SubFolder/name.png"
 */
module.exports._getSF = function( path ) {
    let url = cc.url.raw( path );
    var tex = cc.textureCache.addImage( url ); 
    return new cc.SpriteFrame(tex) ;
};

// url = 'http://wx.qlogo.cn/mmopen/Po9mkm3Z42tolYpxUVpY6mvCmqalibOpcJ2jG3Qza5qgtibO1NLFNUF7icwCibxPicbGmkoiciaqKEIdvvveIBfEQqal8vkiavHIeqFT/0.jpg';
// module.exports.setSpriteByUrl = function( sprite , url , cb = null , tType = 'jpg' , showLoading = false ){
//     if( url === '' || url == null ){
//         if(cb)cb(); 
//         return ;
//     }

//     if( showLoading ) MsgHelper.pushLoading();
//     cc.loader.load({ url:url,type:tType },function(err,texture){
//         if( showLoading ) MsgHelper.removeLoading();
//         var frame = new cc.SpriteFrame(texture);
//         sprite.spriteFrame = frame ;
//         if(cb)cb();
//     });
// };



// 0 - 9 牛牛
module.exports.getOXType = function( type ){
    let name = prePathGame_NN + 'ox_' + type + '.png'
    return module.exports._getSF( name );
};

// 1 - 19 聊天表情
module.exports.getFace = function( id ){
    let name = 'resources/hall/textures/Chat/face_' + id + '.png'
    return module.exports._getSF( name );
};



// 玩家头像
module.exports.getHead = function( id ){
    // let name = prePathGameShares + 'heads/head_' + id + '.png';
    return module.exports._getSF( name );
};


/**
 * 得到桌子的sf
 */
module.exports.getTables = function( index ){
    // let file = prePathGameShares + 'tables/table_' + index + '.png';
    return module.exports._getSF( file );
};

/**
 * 得到桌子的sf
 */
module.exports.getTableBg = function(){
    // let file = prePathGameShares + 'tables/table_bg.png';
    return module.exports._getSF( file );
};

/**
 * 得到Dealer
 */
module.exports.getDealer = function( index ){
    // let file = prePathGameShares + 'dealers/dealer_' + index + '.png';
    return module.exports._getSF( file );
};