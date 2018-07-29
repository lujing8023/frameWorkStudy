/**
 * targetId : 目标id（cbOrArray 中必须包含 targetId） ， totalNum ： 需要数组的总数 ， cbOrArray ： 返回值为数组的函数 或者 数组
 */
module.exports.getListFromArray = function( targetId , totalNum , cbOrArray ){
    if( _.isNull ( cbOrArray ) ) return null;
    if(     _.isNaN  ( targetId ) 
        ||  _.isNaN  ( totalNum )
        ||  _.isNull ( targetId )
        ||  _.isNull ( totalNum )
    ) return null;
    let _list = [];
    if(_.isFunction(cbOrArray)){
        if( _.isNull ( cbOrArray () ) ) return null ;
        _list = cbOrArray();
    }else{
        _list = cbOrArray ;
    }
    return module.exports._getSequenceList( targetId , totalNum , _list );
};

/**
 * totalNum : 需要数组的总数 , startTime : 数组第一个元素（起始时间） , interval = 数组时间间隔
 */
module.exports.getTimeList = function( totalNum = 20 , startTime = 0.05 , interval = 0.1 ){
    let timeList = [];
    timeList = _.range ( startTime , startTime + totalNum * interval , interval );
    return timeList;
};

// 用 list 生成以 targetId 结尾的倒序数组，长度为totalNum
module.exports._getSequenceList = function( targetId , totalNum  , list ){
    let _list = [];
    list.reverse();
    let bTemp = false
    _.each( list , ( id , index ) => {
          if( id == targetId ) bTemp = true;
          if( bTemp ){
              _list.push( id );
          }
    });
    //将循环数组  _list 增加到this.sum个
    let index = 0;
    while( _.size( _list ) < totalNum ){
      if( index > _.size( list ) - 1 ) index = 0;
      _list.push( list[index] );
      index++;
    }
    //反转数组
    _list.reverse();
    return _list;
};
