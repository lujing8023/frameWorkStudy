/**
 * MsgType
 */
var MsgType = cc.Enum({
    eNULL         :  -1 ,
    eToast        :  -1 ,
    eTopInfo      :  -1 ,
    eLoading      :  -1 ,
    eDialog       :  -1 ,
});

var DlgType = cc.Enum({
    eNULL          :  -1 ,
    eGetItem       :  -1 ,
});  

var msgList   = [] ;
var msgIsBusy = false ;

/**
 * initHelper
 */
function initHelper(){
    msgList           = [];
    msgIsBusy         = false;
    return module.exports ;
};

/**
 *有些消息在切换场景的时候触发，就会在旧场景里面'闪现‘一下，所以暂停一下放到新场景里面继续
 */
function pauseMsgHelper(){
    msgIsBusy = true ;
};

function resumeMsgHelper(){
    msgIsBusy = false ;
};


/**
 * push()
 * 
 * @param msg:
 * {
 *      type: MsgType
 *      body: ...
 * }
 * @param mode : 0 -> 排队 ； 1 -> 立即显示
 * 
 */
function push( msg , mode = 0 ){
    switch(mode){
        //按队列排队显示
        case 0 :
            msgList.push(msg) ;
            check();
            break;
        //直接处理，不进队列
        case 1 :
            _handleMsg(msg);
            break;
    } 
};

// 有些是在切换场景以后才显示的toast就mode:0
function pushToast( title , mode = 1 ) {
    let msg = getMsg( MsgType.eToast , [ title , mode ] );  
    push( msg , mode );
};


// push 顶部跑马灯
function pushTopInfo( title , mode = 0 ) {
    let msg = getMsg( MsgType.eTopInfo , [ title , mode ] );
    push( msg, mode );
};

// push loading 界面
function pushLoading( seconds = 10 ) {
    // if( isLoadingScene ) return ;
    // if( window.gComLoading && window.gComLoading.node ){
    //     if( window.gComLoading.node.active === false ) window.gComLoading.node.active = true ;
    //     return ;
    // } 
    // let msg = getMsg( MsgType.eLoading , [ seconds , 1 ] );
    // push( msg, 1 );
};

// remove loading 
function removeLoading(){
    if( isLoadingScene ) return ;
    
    if( window.gComLoading ){
        NPHelper.putNode( "PbLoading" , window.gComLoading.node ) ;
        window.gComLoading = null ;
    }
};



// push 对话框
function pushDialog( param , mode = 0) {
    let msg = getMsg( MsgType.eDialog , param );
    push(msg, mode);
};


function pushDlgGetItem( type , count , mode = 0 ) {
    pushDialog( [ DlgType.eGetItem , type , count ] , mode );
};




/**
 * onMsgFinished() <- Msg callback
 * 
 */
function onMsgFinished() {
     msgIsBusy = false ;
     check();
};

/**
 * getMsg()
 */
function getMsg( pType , pBody ) {
     let msg = {
         type : pType ,
         body : pBody ,
     }
     return msg ;
};


/**
 * check()
 * @param msg
 */
function check(){
    // check state
    if( msgIsBusy )  return ;
    
    // handle
    let list = msgList ;
    
    // check
    if( list.length === 0 )  return ;
    
    // state
    msgIsBusy = true;
    
    // op
    let msg  = _pop();
    _handleMsg( msg );
};


/**
 * _handleMsg()
 * 
 */
function _handleMsg( msg ) {
    //  cc.log( 'MsgHelper _handleMsg(): ' + msg.type );
     
     let com = null ;
     switch(msg.type){
         case MsgType.eNULL:
            break;
         case MsgType.eToast:
         {
            let node = NPHelper.getNode('PbToast');
            com = node.getComponent('PbToast');
            com.init( msg.body[0] , msg.body[1] );
            node.setPosition(cc.v2(cc.director.getVisibleSize().width / 2,cc.director.getVisibleSize().height * 0.2 ));
            break;
         } 
         case MsgType.eTopInfo:
         {
            let node = NPHelper.getNode('PbTopInfo');
            com = node.getComponent('PbTopInfo');
            com.init( msg.body[0] , msg.body[1] );
            node.setPosition(cc.v2(cc.director.getVisibleSize().width / 2,cc.director.getVisibleSize().height * 0.8 ));
            break;  
         }
         case MsgType.eLoading:
         {  
            let node = NPHelper.getNode('PbLoading');
            com = node.getComponent('PbLoading');
            com.init( msg.body[0] , msg.body[1] );
            window.gComLoading = com ;
            node.setPosition(cc.v2(cc.director.getVisibleSize().width / 2,cc.director.getVisibleSize().height * 0.5 ));
            break;  
         }
         case MsgType.eDialog:
         {
            let dType = msg.body[0];
            switch(dType){
                case DlgType.eGetItem:
                {
                    let node = NPHelper.getNode('DlgGetItem');
                    com = node.getComponent('DlgGetItem');
                    com.init( msg.body[1] , msg.body[2] );
                    break;
                }
            }
            break; 
         }        
     }
     
     if( com != null){
         let base = cc.director.getScene();
         base.addChild( com.node , 10000 );
     }
};


//_pop()
function _pop(){
    return msgList.splice(0, 1)[0];
};




module.exports = {
    initHelper      : initHelper            ,

    // enum
    MsgType         : MsgType               ,
    DlgType         : DlgType               ,

    // push
    push            : push                  ,
    pushToast       : pushToast             ,
    pushTopInfo     : pushTopInfo           ,
    pushLoading     : pushLoading           ,

    //spec
    removeLoading   : removeLoading         ,

    //push dlgs
    pushDlgGetItem  : pushDlgGetItem        ,

    //sys
    pauseMsgHelper  : pauseMsgHelper        ,
    resumeMsgHelper : resumeMsgHelper       ,
    
    //check
    check           : check                 ,
    
    // getter
    getMsg          : getMsg                ,
    
    // callback
    onMsgFinished   : onMsgFinished         ,
};