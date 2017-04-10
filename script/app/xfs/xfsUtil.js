/**
 * @module xfs/xfsUtil
 */
define(['app/util/util'], function ($$) {

    /**
     * @name EXTWindow
     * @type {Window}
     */
    var EXTWindow = window;

    /**
     * @name EXT
     * @type {IEExternal}
     */
    var EXT = window.external;

    /**
     * @name VTMUICtrlOCX ocxui
     */
    var VTMUICtrlOCX = window.external.VTMActiveXUI;
    /**
     * @name VTMCtrlOCX ocx
     */
    var VTMCtrlOCX = window.external.ESpaceMediaTerminal;

    if (!VTMCtrlOCX) {
        $$.debug("hello? c#未加载", "error");
    }

    /**
     * @name 硬件
     * @type {{timeout: number}}
     */
    var xfsInfo = {
        timeout: 86400000
    };

    /**
     * 增加或更新回调函数
     * @param {string} eventName 事件名称
     * @param {function} callBack 回调
     * @method addOrUpdateEXTWindow
     * @example
     * xfsUtil.addOrUpdateEXTWindow('IDCCardReaderAsyncReadRawDataCallBack', function (msg) {
                $$.debug('进入异步信息回调成功:'+msg);
                msg = JSON.parse(msg);
                if (msg.hResult == "WFS_SUCCESS") {
                    model.appModel('IdcCardNumber',msg.Buffer.track2);
                    Terminal.mediaTerminalSendMsg("cardNumber", msg.Buffer.track2);
                }
            });
     *
     */
    function addOrUpdateEXTWindow(eventName, callBack) {
        EXTWindow[eventName] = callBack;
    }

    /**
     * 获取window function
     * @param {string} eventName functionName
     * @public
     * @method getEXTWindow
     * @returns {*}
     */
    function getEXTWindow(eventName) {
        return EXTWindow[eventName] || $$.debug('there is no' + eventName);
    }

    /**
     * 批量初始化模块回调
     * @method addBatchCallBack4Model
     * @param {function} ModelBack 回调对象
     * @example
     * var MediaAsyncCallBack = {
        AudioAndVideoAction: function () {
            $$.debug('AudioAndVideoAction');
        },
        AudioAndVideoConnect: function () {
            $$.debug('AudioAndVideoConnect');
        },
        releaseCall: function () {
            $$.debug('releaseCall');
        },
        receivedAnswerCallEvent: function () {
            $$.debug('receivedAnswerCallEvent');
        },
        releaseCallSuccessEvent: function () {
            $$.debug('releaseCallSuccessEvent');
        },
        TerminalWaitingInQueueEvent: function () {
            $$.debug('TerminalWaitingInQueueEvent');
        }
    };

     xfsUtil.addBatchCallBack4Model(MediaAsyncCallBack); //注册回调
     *
     */
    function addBatchCallBack4Model(ModelBack) {
        var callBacks = Object.keys(ModelBack);
        for (var i = 0, len = callBacks.length; i < len; i++) {
            addOrUpdateEXTWindow(callBacks[i], ModelBack[callBacks[i]]);
        }
    }

    /**
     * 打印错误原因
     * @method mediaGetErrorReason
     * @param {string} errorCode 错误码
     * @return {string} 错误信息
     */
    function mediaGetErrorReason(errorCode) {
        var reasonStr = VTMCtrlOCX.mediaGetErrorReason(errorCode);
        return " code is[" + errorCode + "],reason is:[" + reasonStr + ".]";
    }

    return {
        ESpaceMediaTerminal: VTMCtrlOCX,
        VTMActiveXUI: VTMUICtrlOCX,
        EXT: EXT,
        xfsInfo: xfsInfo,
        addOrUpdateEXTWindow: addOrUpdateEXTWindow,
        addBatchCallBack4Model: addBatchCallBack4Model,
        mediaGetErrorReason: mediaGetErrorReason,
        getEXTWindow: getEXTWindow
    }
});