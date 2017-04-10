/**
 * @module xfs/PinPad
 */
define(['app/xfs/xfsUtil', 'app/util/util'], function (xfsUtil, $$) {

    /**
     * @name PinPad
     */
    var PinPad = xfsUtil.EXT.PinPad;

    /**
     * 异步获取状态
     * @method AsyncStatus
     * @param {string} eventArgsExStr   扩展字段，可选
     * @param {number} TIME_OUT 超时时间，可选，默认30S
     * @public
     * @returns {Promise}
     */
    function AsyncStatus(eventArgsExStr, TIME_OUT) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        var result = PinPad.AsyncStatus(eventArgsExStr, TIME_OUT);
        if (result != "WFS_SUCCESS") {
            $$.debug("AsyncStatus error", "error");
            return Promise.reject("AsyncStatus error");
        }
        return Promise.resolve();
    }

    /**
     * 异步重置
     * @method AsyncReset
     * @param {string} eventArgsExStr   扩展字段，可选
     * @param {number} TIME_OUT 超时时间，可选，默认30S
     * @public
     * @returns {Promise}
     */
    function AsyncReset(eventArgsExStr, TIME_OUT) {
        eventArgsExStr = eventArgsExStr || "";
        TIME_OUT = TIME_OUT || 30000;
        var result = PinPad.AsyncReset(eventArgsExStr, TIME_OUT);
        if (result != "WFS_SUCCESS") {
            $$.debug("AsyncReset error", "error");
            return Promise.reject("AsyncReset error");
        }
        return Promise.resolve();
    }

    /**
     *
     * @method GetDataAsync 异步获取数据
     * @param {number} usMaxLen 最大数据长度
     * @param {number} bAutoEnd 是否自动结束,0,1
     * @param {string} strActiveKeys 激活需要使用的Key, 包括类型有number，dot， backspace，clear， enter，cancel，输入时以“|”分割
     * @param {string} strTerminateKeys 结束输入键, 包括类型有number，dot， backspace，clear， enter，cancel，输入时以“|”分割
     * @param {number} TIME_OUT 超时时间，可选，默认30S
     * @public
     * @returns {Promise}
     */
    function GetDataAsync(usMaxLen, bAutoEnd, strActiveKeys, strTerminateKeys, TIME_OUT) {
        usMaxLen = usMaxLen || 6;
        bAutoEnd = bAutoEnd || 0;
        strActiveKeys = 'number|dot|clear|enter|cancel';
        strTerminateKeys = 'enter|cancel|Clear';
        TIME_OUT = TIME_OUT || 30000;
        var result = PinPad.GetDataAsync(usMaxLen, bAutoEnd, strActiveKeys, strTerminateKeys, TIME_OUT);
        if (result != "WFS_SUCCESS") {
            $$.debug("GetDataAsync error", "error");
            return Promise.reject("GetDataAsync error");
        }
        return Promise.resolve();
    }

    /**
     * 异步取消执行指令
     * @method AsyncCancel
     * @public
     * @returns {Promise}
     */
    function AsyncCancel() {
        var result = PinPad.AsyncCancel();
        if (result != "WFS_SUCCESS") {
            $$.debug("AsyncCancel error", "error");
            return Promise.reject("AsyncCancel error");
        }
        return Promise.resolve();
    }

    /**
     * 异步获取键盘值
     * @method AsyncGetPin
     * @param usMinLen 必须输入PIN数字的最小个数，0值表示没有校验最小PIN长度
     * @param usMaxLen 最大数据长度
     * @param bAutoEnd 是否自动结束
     * @param cEcho 说明在允许在本地显示器上出现的替换PIN数字的字符
     * @param strActiveKeys 激活需要使用的Key, 包括类型有number，dot， backspace，clear， enter，cancel，输入时以“|”分割
     * @param strTerminateKeys 结束输入键，类型同上
     * @param eventArgsExStr 扩展字段,非必选
     * @param TIME_OUT 超时时间（默认30s）,非必选
     * @returns {Promise}
     */
    function AsyncGetPin(usMinLen, usMaxLen, bAutoEnd, cEcho, strActiveKeys, strTerminateKeys, eventArgsExStr,TIME_OUT) {
        var result = PinPad.AsyncGetPin(usMinLen, usMaxLen, bAutoEnd, cEcho, strActiveKeys, strTerminateKeys, eventArgsExStr);
        if (result != "WFS_SUCCESS") {
            $$.debug("AsyncGetPin error", "error");
            return Promise.reject("AsyncGetPin error");
        }
        return Promise.resolve();
    }

    /**
     * 异步获取密码块
     * @method AsyncGetPinBlock
     * @param {string} strCustomerData 客户数据,必选
     * @param {string} strFormat PIN块的格式,必选
     * @returns {Promise}
     */
    function AsyncGetPinBlock(strCustomerData, strFormat) {
        var result = PinPad.AsyncGetPinBlock(strCustomerData, strFormat);
        if (result != "WFS_SUCCESS") {
            $$.debug("AsyncGetPinBlock error", "error");
            return Promise.reject("AsyncGetPinBlock error");
        }
        return Promise.resolve();
    }


    return {
        AsyncStatus: AsyncStatus,
        AsyncReset: AsyncReset,
        GetDataAsync: GetDataAsync,
        AsyncCancel: AsyncCancel,
        AsyncGetPin: AsyncGetPin,
        AsyncGetPinBlock: AsyncGetPinBlock
    }
});