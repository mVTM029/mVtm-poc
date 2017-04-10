/**
 * MTE控制引擎
 */
define(function () {
    // var MTE = window.MTE = window.MTE || {};
    var MTEWindow = window;
    //增加或更新回调函数
    function addOrUpdateMTE(eventName,callBack){
        MTEWindow[eventName] = callBack;
    }

    //批量初始化模块回调
    function addBatchCallBack4Model(ModelBack){
        var callBacks = Object.keys(ModelBack);
        for(var i=0,len=callBacks.length;i<len;i++){
            addOrUpdateMTE(callBacks[i],ModelBack[callBacks[i]]);
        }
    }

    return {
        addOrUpdateMTE: addOrUpdateMTE,
        addBatchCallBack4Model: addBatchCallBack4Model
    }
});