var logic = module.exports ;

logic.leaveRoom = function( isDismissRoom = false ){
    GameHelper.loadHallScene( ()=>{
        if( isDismissRoom ) MsgHelper.pushToast($G.gStrings.CommonTips.BreakRoom);
    });
}