/**
 * @module xfs/UKeyDispenser
 */
define(['app/xfs/xfsUtil', 'app/util/util'], function (xfsUtil, $$) {

    /**
     * @name UKeyDispenser
     * @type {IEExternal}
     */
    var UKeyDispenser = xfsUtil.EXT.UKeyDispenser;

    /**
     * 异步取消执行指令
     * @method AsyncCancel
     * @returns {Promise.<T>}
     */
    function AsyncCancel() {
        var result = UKeyDispenser.AsyncCancel();
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncCancel error", "error");
            throw new Error('UKeyDispenser.AsyncCancel() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    /**
     * 异步获取设备功能
     * @method AsyncCapabilities
     * @param eventArgsExStr {string}  扩展参数(可选)
     * @param TIME_OUT {number} 超时时间，可选，默认30S
     * @returns {Promise}
     */
    function AsyncCapabilities(eventArgsExStr, TIME_OUT) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        var result = UKeyDispenser.AsyncCapabilities(eventArgsExStr, TIME_OUT);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncCapabilities error", "error");
            throw new Error('UKeyDispenser.AsyncCapabilities() error: ' + result);
        }
        return Promise.resolve();
    }

    /**
     * 异步读取数据
     * @method AsyncReadRawData
     * @param eventArgsExStr {string}  扩展参数(可选)
     * @param TIME_OUT {number} 超时时间，可选，默认30S
     * @param readData
     * @returns {Promise}
     */
    function AsyncReadRawData(eventArgsExStr, TIME_OUT, readData) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        readData = readData || "";
        var result = UKeyDispenser.AsyncReadRawData(eventArgsExStr, TIME_OUT, readData);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncReadRawData error", "error");
            throw new Error('UKeyDispenser.AsyncReadRawData() error: ' + result);
        }
        return Promise.resolve();
    }

    /**
     * 异步重置
     * @method AsyncReset
     * @param eventArgsExStr {string}  扩展参数(可选)
     * @param TIME_OUT {number} 超时时间，可选，默认30S
     * @param strResetIn {string}
     * @returns {Promise}
     */
    function AsyncReset(eventArgsExStr, TIME_OUT, strResetIn) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        strResetIn = strResetIn || "";
        var result = UKeyDispenser.AsyncReset(eventArgsExStr, TIME_OUT, strResetIn);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncReset error", "error");
            throw new Error('UKeyDispenser.AsyncReset() error: ' + result);
        }
        return Promise.resolve();
    }

    /**
     * 异步获取状态
     * @method AsyncStatus
     * @param eventArgsExStr{string}  扩展参数(可选)
     * @param TIME_OUT {number} 超时时间，可选，默认30S
     * @returns {Promise}
     */
    function AsyncStatus(eventArgsExStr, TIME_OUT) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        var result = UKeyDispenser.AsyncStatus(eventArgsExStr, TIME_OUT);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncStatus error", "error");
            throw new Error('UKeyDispenser.AsyncStatus() error: ' + result);
        }
        return Promise.resolve();
    }

    /**
     * 异步退出卡片
     * @method AsyncEjectCard
     * @param eventArgsExStr{string}  扩展参数(可选)
     * @param TIME_OUT {number} 超时时间，可选，默认30S
     * @returns {Promise}
     */
    function AsyncEjectCard(eventArgsExStr, TIME_OUT) {
        $$.debug('进入token方法');
        var result = UKeyDispenser.AsyncEjectCard(eventArgsExStr,TIME_OUT);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncEjectCard error", "error");
            throw new Error('UKeyDispenser.AsyncEjectCard() error: ' + result);
        }
        $$.debug('调用token方法成功');
        return result;
    }

    /**
     * 异步发送UKey到出口
     * @method DispenseUKeyToExitAsync
     * @param {string} usNumber UKey箱通道
     * @returns {Promise}
     */
    function DispenseUKeyToExitAsync(usNumber) {
        var result = UKeyDispenser.DispenseUKeyToExitAsync(usNumber);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("DispenseUKeyToExitAsync error", "error");
            throw new Error('IDCCardReader.DispenseUKeyToExitAsync() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    /**
     * 异步回收UKey
     * @method AsyncRetainCard
     * @param eventArgsExStr {string}  扩展参数(可选)
     * @param TIME_OUT {number} 超时时间，可选，默认30S
     * @returns {Promise}
     */
    function AsyncRetainCard(eventArgsExStr, TIME_OUT) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        var result = UKeyDispenser.AsyncRetainCard(eventArgsExStr, TIME_OUT);
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncRetainCard error", "error");
            throw new Error('UKeyDispenser.AsyncRetainCard() error: ' + result);
        }
        return Promise.resolve();
    }


    return {
        AsyncCancel: AsyncCancel,
        DispenseUKeyToExitAsync: DispenseUKeyToExitAsync,
        AsyncCapabilities: AsyncCapabilities,
        AsyncReadRawData: AsyncReadRawData,
        AsyncReset: AsyncReset,
        AsyncStatus: AsyncStatus,
        AsyncEjectCard: AsyncEjectCard,
        AsyncRetainCard: AsyncRetainCard
    }
});
