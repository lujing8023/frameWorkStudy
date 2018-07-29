/**
 * 本模块提供一些基础时间支持
 * 
 */



/***
 * getSTime - 得到校验后的时间
 */
module.exports.getSTime = function(){
    // let now = module.exports.getCTime() - ( FKNN_S.gTimeOffset ? FKNN_S.gTimeOffset : 0 );
    // return now ;
};

/***
 * getSTimeHM - 得到校验后的格式化后的时间 23:13
 */
module.exports.getSTimeHM = function(){
    return module.exports.getHourMinute( module.exports.getSTime() );
};


/***
 * getCTimeHM 
 */
module.exports.getCTimeHM = function(){
    return module.exports.getHourMinute( module.exports.getCTime() );
};


/***
 * getCTime
 * 2016.5.26 -> 1464246374104
 */
module.exports.getCTime = function(){
    return Date.now();
};


/***
 * formatTimeByString
 * '2018-3-1 10:20:13' -> '2018/3/1 10:20:13' -> '2018-03-01 10:20'
 * ios和mac下不支持 '-' 的时间格式，只支持'/'
 */
module.exports.formatTimeByString = function( str ){
    // return module.exports.getFullDate(new Date( str )) ;
    str = str.replace(/-/g,'/');
    return module.exports.getFullDate(new Date( str )) ;
};


/***
 * getHourMinute ->   23:12
 */
module.exports.getHourMinute = function( ms ){
    let date = new Date();
    date.setTime( ms );
    return module.exports._formatZero(date.getHours()) + ':' + module.exports._formatZero(date.getMinutes()) ;
};

module.exports._formatZero = function( time ){
    time += '' ;
    return time.length === 1 ? '0' + time : time ;
};

// "22-15-0"  -> [ 22 , 15 , 00 ]
module.exports.parseSTime = function( time ){
    let results = time.split('-');
    _.each( results , function( t , i ){
        results[i] = module.exports._formatZero( t );
    });
    return results;
};

// ms -> 2017.01.11
module.exports.getDate = function( ms ){
    let date = new Date();
    date.setTime( ms );
    let ret = date.getFullYear() + '-' + ( date.getMonth() + 1 )+ '-' + date.getDate() ;
    // let ret = date.year + '-' + date.month + '-' + date.day ;
    return ret ;
};

// ms -> 2017.01.11 14:56:52
module.exports.getFullDate = function( ms ){
    let date = new Date();
    date.setTime( ms );
    let ret = date.getFullYear() + '-' + module.exports._formatZero( date.getMonth() + 1 )+ '-' + module.exports._formatZero(date.getDate()) ;
    ret += '  ';
    ret += module.exports._formatZero(date.getHours()) + ':' + module.exports._formatZero(date.getMinutes()) ;
    return ret ;
};

// ms -> 01-11 23:12
module.exports.getDateHourMinute = function( ms ){
    let date = new Date();
    date.setTime( ms );
    let ret = module.exports._formatZero( date.getMonth() + 1 )+ '-' + module.exports._formatZero(date.getDate()) + ' '+  module.exports.getHourMinute(ms);
    // let ret = date.year + '-' + date.month + '-' + date.day ;
    return ret ;
};

// function MathUtils.tranSecond2Day( sec )
//     return math.floor(sec/86400)  
// end

// function MathUtils.tranSecond2Hour( sec )
//     return math.fmod(math.floor(sec/3600), 24)  
// end

// function MathUtils.tranSecond2Minute( sec )
//     return math.fmod(math.floor(sec/60), 60)  
// end

// function MathUtils.tranSecond2Second( sec )
//     return math.fmod(sec, 60)  
// end



// var time=new Date()//生成当前时间的对象

// time.getSeconds()//获取当前时间：秒
// time.getMinutes()//获取当前时间：分
// time.getHours()//获取当前时间：小时
// time.getDate()//获取当前日期：日(从1开始)
// time.getMonth()//获取当前日期：月(0代表1月)
// time.getFullYear()//获取当前日期：年
// time.getDay()//获取当前日期：星期几(0代表星期天)

// cc.log( module.exports.formatTimeByString('2018-3-1 10:20:13') )

// cc.log( module.exports.formatTimeByString('2018-3-1 10:20:13') )

// var str = '2018-3-1 10:20:13' ;
// var str = '2018-03-16T07:51:16.000Z';
// cc.log( str ) ;
// str = str.replace(/-/g,'/');
// cc.log( str ) ;
// cc.log( module.exports.formatTimeByString( str ) ) ;







