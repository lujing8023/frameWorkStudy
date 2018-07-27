

/**
 * HttpHandler
 */
class HttpHandler {
    constructor() {}

    /**
     * Configs
     */
    setConfigs ( msg ){  this._configs = msg; }
    getConfigs (){ return this._configs ;   }
    getConfig ( key ){
        let value = this.getConfigs()[key];
        return value ? value : '';
    }
}

module.exports = new HttpHandler();




// /**
//  * CONFIGS
//  */
// // AgentList,AgentTop,LoginHost,LoginPort,IOSReviewBuild,Notifys,
// // "IOSShow","DebugOn"
// handler.setConfigs = function( msg ){
//     $G.gConfigs = msg;
// };

// handler.getConfigs = function(){
//     return $G.gConfigs ;
// };

// handler.getConfig = function( key ){
//     let value = handler.getConfigs()[key];
//     return value ? value : '';
// };


// handler.getDebugOn = function(){
//     return handler.getConfigs().DebugOn ;
// };

// handler.getMWUrl = function(){
//     return handler.getConfig('MWUrl');
// };

// handler.getWXShareIntroduceTitle = function(){
//     return handler.getConfigs().WXShareIntroduceTitle ;
// };

// handler.getWXShareIntroduceContent = function(){
//     return handler.getConfigs().WXShareIntroduceContent ;
// };

// /**
//  * INVITE : array[6]
//  */
// handler.setInvite = function( msg ){
//     cc.log( msg );
//     $G.gInvite = msg ;
//     $G.gInvite.totalRebate = msg.rebate + msg.applyingRebate + msg.takedRebate ;
// };

// // 总返利自己计算一下
// // applyingRebate  申请中
// // takedRebate     已返利
// // children       直属玩家
// // totalChildren  总玩家
// // childrenCost   直属消耗
// // cost           总消耗
// // rebate         可返利
// handler.getInvite = function(){
//     return $G.gInvite ;
// }

// handler.setInviteMembers = function( msg ){
//     $G.gInviteMembers = msg ;
//     cc.log( msg );
// };

// handler.getInviteMembers = function(){
//     return $G.gInviteMembers ;
// }




