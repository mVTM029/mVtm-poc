define(function () {
    var status = {
        initSucc: false,
        loginSucc: false
    };

    var VTMCtrlOCX = window.external.ESpaceMediaTerminal;
    var VTMUICtrlOCX = window.external.VTMActiveXUI;

    /**
     * 设置状态
     * @param key
     * @param value
     */
    function setStatus(key, value) {
        if (status[key] === undefined) {
            return;
        }
        if (typeof status[key] !== typeof value) {
            return;
        }
        status[key] = value;
    }

    /**
     * 查询状态
     * @param key
     * @returns {*}
     */
    function getStatus(key) {
        var result = status[key];
        if (result === undefined) {
            throw new Error('status undefined: ' + key);
        }
        return result;
    }

    /**
     * 状态重置为初始态
     */
    function resetStatus() {
        //TODO
    }


    /**
     * 打印错误原因
     * @method mediaGetErrorReason
     * @param errorCode 错误码
     */
    function mediaGetErrorReason(errorCode){
        var reasonStr = this.VTMCtrlOCX.mediaGetErrorReason(errorCode);
        return " code is["+errorCode+"],reason is:["+reasonStr+".]";
    }


    return {
        VTMCtrlOCX: VTMCtrlOCX,
        VTMUICtrlOCX: VTMUICtrlOCX,
        statusKeys: {
            INIT_SUCC: 'initSucc',
            LOGIN_SUCC: 'loginSucc'
        },
        setStatus: setStatus,
        getStatus: getStatus,
        resetStatus: resetStatus,
        mediaGetErrorReason: mediaGetErrorReason
    }
});