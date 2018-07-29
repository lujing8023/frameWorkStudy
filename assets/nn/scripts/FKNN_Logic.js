/**
 * 牛牛算法
 */

/**
 * exports
 */
var logic = module.exports;


/**
 * OXType
 */
logic.OXType = {
    'NONE'              : 0 ,
    'NIU'               : 1 , // 1 - 9
    'NN'                : 2 , // 10
    'SHUNZI'            : 3 ,
    'TONGHUA'           : 4 ,
    'HULU'              : 5 ,
    'WUXIAO'            : 6 ,
    'WUHUA'             : 7 ,
    'ZHADAN'            : 8 ,
    'TONGHUASHUN'       : 9 ,
};

//OXNames
logic.OXNames_Type  = [ '无牛','有牛','牛牛','顺子','同花','葫芦','五小牛','五花牛','炸弹','同花顺' ] ;
logic.OXNames_Index = [ '无牛','牛一','牛二','牛三','牛四','牛五','牛六','牛七','牛八','牛九','牛牛','顺子','同花','葫芦','五小牛','五花牛','炸弹','同花顺' ] ;


//转换牌的值为算牛需要的点数
logic._getValue = function( point ) {
    return point > 10 ? 10 : point ;
}

/**
 * 将type+value转化为唯一的index
 */
logic.getIndex = function( type , value ){
    if( type === 0 ) return 0 ;
    if( type === 1 ) return value ;
    return type + 8 ;
}

logic.getOXNameByType = function( type ){
    return logic.OXNames_Type[ type ];
}

logic.getOXNameByIndex = function( index ){
    return logic.OXNames_Index[ index ];
}

logic.getOxType = function( cards ){
    if( !cards || _.size(cards) != 5 ) return logic.OXType.NONE;
    if( logic._isFlushStraight(cards) ) return logic.OXType.TONGHUASHUN;
    if( logic._isFour(cards) ) return logic.OXType.ZHADAN;
    if( logic._isFiveFlowerOx(cards) ) return logic.OXType.WUHUA;
    if( logic._isFiveSmall(cards) ) return logic.OXType.WUXIAO;
    if( logic._isHulu(cards) ) return logic.OXType.HULU;
    if( logic._isFlush(cards) ) return logic.OXType.TONGHUA;
    if( logic._isStraight(cards) ) return logic.OXType.SHUNZI;
    if( logic._isNN(cards) ) return logic.OXType.NN;
    if( logic._isNiu(cards) ) return logic.OXType.NIU;
    return logic.OXType.NONE;
}

// 得到组成牛的三张index , cards大于等于3
logic.getThree = function( cards ){
    let len = _.size( cards );
    if( len > 5 ) return null ;
    if( len < 3 ) return null ;
    for (let i = 0 ; i < len - 2 ; i++){   
		for (let j = i + 1 ; j < len - 1 ; j++){
			for (let k = j + 1 ; k < len ; k++){
               let sum = logic._getValue(cards[i].point)+logic._getValue(cards[j].point)+logic._getValue(cards[k].point);
               if (sum % 10 === 0) return [ i , j , k ];
            }
        }
    }
    return null ;
}

// 得到剩余两张
logic.getTwo = function( three ){
    let ret = [];
    _.times( 5 , (index)=>{
        if( index != three[0] && index != three[1] && index != three[2] ){
            ret.push( index );
        }
    });
    return ret ;
}

// 有牛
logic._isNiu = function( cards ){
	return logic.getThree( cards ) != null ;
}

// 牛牛
logic._isNN = function( cards ){
    let three = logic.getThree( cards );
    if( three == null ) return false ;
    let two     = logic.getTwo( three );
    let lastSum = logic._getValue( cards[two[0]].point ) + logic._getValue( cards[two[1]].point );
    return ( lastSum % 10 === 0 );
}

//五小牛 - 1234组成且小于等于10
logic._isFiveSmall = function(cards){
    let amount = 0;
    for (let i = 0; i < cards.length; i++) {
        let point = cards[i].point;

        if( point >= 5) 
        return false;
        amount += point ;
    }
    return ( amount <= 10 ) ;
}


//五花牛
logic._isFiveFlowerOx = function(cards){
    for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.point < 11 ) {
            return false;
        }
    }
    return true;
}

//同花顺 - 花色相同，点数相连
logic._isFlushStraight = function(cards){
    return logic._isStraight(cards) && logic._isFlush(cards); 
}

//四炸
logic._isFour = function(cards){
    //data
    let counts = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ] ;
    for (let i = 0; i < cards.length; i++) {
        counts[ cards[i].point - 1 ] ++ ;
    }

    //check
    for(let i = 0 , len = counts.length ; i < len ; i++){
        if( counts[i] >= 4 ){
            return true;
        }
    }
    return false;
}

//葫芦
logic._isHulu = function(cards){
    //data
    let counts = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ] ;
    for (let i = 0; i < cards.length; i++) {
        let point = cards[i].point;
        counts[ point - 1 ] ++ ;
    }

    //check
    let isThree = false ;
    let isTwo   = false ;
    for(let i = 0 , len = counts.length ; i < len ; i++){
        if( counts[i] === 3 ) isThree = true;
        if( counts[i] === 2 ) isTwo   = true;
    }
   
    return ( isThree & isTwo );
}


//同花 - 花色相同
logic._isFlush = function(cards){
    let suit = cards[0].suit;
    //注意，这里是从1开始
    for (let i = 1; i < cards.length; i++) {
        if( suit != cards[i].suit ) 
        return false;
    }
    return true ;
}

//顺子 - 点数相连
logic._isStraight = function(cards){
    let points = [0,0,0,0,0];
    for (let i = 0; i < cards.length; i++) {
        points[i] = cards[i].point;
    }
    //从大到小排序
    points.sort(function(a,b){return a<b?1:-1});

    //10 J Q K A 特殊判断一下
    if( points[0] == 13 && points[1] == 12 && points[2] == 11 && points[3] == 10 && points[4] == 1 )
        return true ;

    //判断相距1
    for(let i = 0 ; i < 4 ; i++ ){
        if( Math.abs( points[i] - points[i+1] ) != 1 ){
            return false;
        }
    }
    return true;
}

//三条
logic._isThree = function(cards){
    //data
    let counts = [ 0,0,0,0,0,0,0,0,0,0,0,0,0 ] ;
    for (let i = 0; i < cards.length; i++) {
        let point = cards[i].point;
        counts[ point - 1 ] ++ ;
    }

    //check
    for(let i = 0 , len = counts.length ; i < len ; i++){
        if( counts[i] >= 3 ){
            return true;
        }
    }
    return false;
}


// DEBUG
// _.times( 30000 ,()=>{
//     var cards = [
//         {point: _.random(1,10) ,suit:1},
//         {point: _.random(1,10) ,suit:2},
//         {point: _.random(1,10) ,suit:2},
//         {point: _.random(1,10) ,suit:2},
//         {point: _.random(1,10) ,suit:2}
//     ];
//     let three  = logic.getThree( cards ) ;
//     if( logic.getOxType(cards) == 0 ) return ;
//     if( three != null ){
//         let two = logic.getTwo( three );
//         let cardsNew = [];
//         _.each( three , (index)=>{
//             cardsNew.push( cards[index] );
//         });
//         _.each( two , (index)=>{
//             cardsNew.push( cards[index] );
//         });
//         cards = cardsNew ;
//     }
//     let cardsLog = ''; 
//     _.each(cards,(card,index)=>{
//         cardsLog += card.point;
//         if( index == 2){
//             cardsLog += '    ->    ';
//         }
//         if( index != 4 && index != 2 ) cardsLog += ' , ';
//     });
//     // _.each(cards,(card,index)=>{
//     //     cardsLog += card.point;
//     //     if( index != 4) cardsLog += ' , ';
//     // });
//     // cc.log( logic.getThree(cards) );
//     // cc.log( cardsLog + '  牌值：' + logic.getOxType(cards) + '   :' + logic.getOXNameByType(logic.getOxType(cards)) )
//     cc.log( cardsLog + '  ->  ' + logic.getOXNameByType(logic.getOxType(cards)) )
// });

// let cards = [
//         {point: 10 ,suit:1},
//         {point: 11 ,suit:2},
//         {point: 12 },
//         {point: 13 },
//         {point: 1  }
//     ];
//     let cardsLog = '';
//     _.each(cards,(card)=>{
//         cardsLog += card.point;
//         cardsLog += ':';
//     });
//     cc.log( logic.getThree(cards) );
//     cc.log( cardsLog + '  牌值：' + logic.getOxType(cards) + '   :' + logic.getOXNameByType(logic.getOxType(cards)) )