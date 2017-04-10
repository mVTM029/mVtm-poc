/**
 * @module xfs/IDCCardDispenser
 */
define(['app/xfs/xfsUtil','app/util/util'], function (xfsUtil,$$) {

    /**
     * @name IDCCardDispenser
     */
    var IDCCardDispenser = xfsUtil.EXT.IDCCardDispenser;

    /**
     * 异步获取发卡器状态
     * @method AsyncStatus
     * @param {string} eventArgsExStr 扩展参数(可选)
     * @param {number} TIME_OUT       超时时间(可选)
     * @returns {Promise}
     */
    function AsyncStatus(eventArgsExStr, TIME_OUT) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = xfsUtil.xfsInfo.timeout;
        var result = IDCCardDispenser.AsyncStatus(eventArgsExStr, TIME_OUT);
        if (result == "placeholder") {
            return Promise.resolve();
        }
        $$.debug("IDCCardReader error", "error");
        throw new Error("IDCCardReader.AsyncCancel error:" + result);
    }

    /**
     * 发卡到通道
     * @method DispenseCardToTransportAsync
     * @param {number} usNumber 卡通道
     * @param {string} eventArgsExStr 扩展字段
     * @param {number} nTimeout 延迟时间
     * @returns {Promise}
     */
    function DispenseCardToTransportAsync(usNumber,eventArgsExStr,nTimeout){
        var result = IDCCardDispenser.DispenseCardToTransportAsync(usNumber,eventArgsExStr,xfsUtil.xfsInfo.timeout);
        if(result!="WFS_SUCCESS"){
            $$.debug("DispenseCardToTransportAsync error", "error");
            throw new Error("DispenseCardToTransportAsync Error:"+result);
        }
        return Promise.resolve();
    }

    /**
     * 发卡到出口
     * @method DispenseCardToExitAsync
     * @param {number} usNumber 卡箱通道
     * @param {string} eventArgsExStr 扩展字段
     * @param {number} nTimeout 延迟时间
     * @returns {Promise.<*>}
     */
    function DispenseCardToExitAsync(usNumber,eventArgsExStr,nTimeout){
        var result = IDCCardDispenser.DispenseCardToExitAsync(usNumber,eventArgsExStr,xfsUtil.xfsInfo.timeout);
        if(result!="WFS_SUCCESS"){
            $$.debug("DispenseCardToExitAsync error", "error");
            throw new Error("DispenseCardToTransportAsync Error:"+result);
        }
        return Promise.resolve();
    }

    /**
     * 回收卡
     * @param {number} usNumber 卡箱通道
     * @param {number} nTimeout 延迟时间
     * @param {string} eventArgsExStr 扩展字段
     * @returns {Promise}
     */
    function AsyncRetainCard(usNumber,nTimeout,eventArgsExStr){
        var result = IDCCardDispenser.DispenseCardToExitAsync(usNumber,xfsUtil.xfsInfo.timeout,eventArgsExStr);
        if(result!="WFS_SUCCESS"){
            $$.debug("AsyncRetainCard error", "error");
            throw new Error("AsyncRetainCard Error:"+result);
        }
        return Promise.resolve();
    }


    return {
        DispenseCardToExitAsync:DispenseCardToExitAsync,
        AsyncStatus: AsyncStatus,
        DispenseCardToTransportAsync:DispenseCardToTransportAsync,
        AsyncRetainCard:AsyncRetainCard
    }
});
