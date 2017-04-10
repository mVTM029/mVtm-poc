define(['app/espace/espaceMgmt', 'app/espace/VTMUtil', 'app/util/util'], function (engine, VTMUtil, $$) {
    //视频拍照路径
    var photoPath = "C:\\photo\\";

    /**
     * 请求通话
     * @param callMode 呼叫模式
     * @param callNum 呼叫号码
     * @param callInfo 发送信息
     */
    function mediaTerminalCall(callMode, callNum, callInfo) {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalCall(callMode, callNum, callInfo);
        if (resultCode != 0) {
            throw new Error("mediaTerminalCall fail " + _getReason(resultCode));
        }
    }

    /**
     * 释放通话
     */
    function mediaTerminalReleaseCall() {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalReleaseCall();
        if (resultCode != 0) {
            throw new Error("mediaTerminalReleaseCall fail " + _getReason(resultCode));
        }
    }

    /**
     * 视频拍照
     */
    function mediaTerminalSnapShot() {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalSnapShot(photoPath + (new Date().getTime()) + ".jpg");
        if (resultCode != 0) {
            throw new Error("mediaTerminalSnapShot fail " + _getReason(resultCode));
        }
    }

    /**
     * 指定视频拍照
     * @param index 设备序号
     * @param filePath 照片路径
     * @param width 宽度
     * @param height 高度
     */
    function mediaTerminalSnapShotById(index, filePath, width, height) {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalSnapShotById(index, photoPath + (new Date().getTime()) + ".jpg", width, height);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSnapShotById fail " + _getReason(resultCode));
        }
    }

    /**
     * 未登录下，请求匿名通话,配置项isAnonymousEnabled = 1
     * @param callMode 呼叫模式
     * @param callNum 呼叫号码
     * @param callInfo 发送信息
     */
    function mediaTerminalAnonymousCall(callMode, callNum, callInfo) {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalAnonymousCall(callMode, callNum, callInfo);
        if (resultCode != 0) {
            throw new Error("mediaTerminalAnonymousCall fail " + _getReason(resultCode));
        }
    }

    /**
     * 查询排队数
     * @param sAccessCode 访问码
     */
    function mediaTerminalQuerySkillWaitNum(sAccessCode) {
        var resultCode = JSON.parse(VTMUtil.VTMCtrlOCX.mediaTerminalQuerySkillWaitNum(sAccessCode));
        if (resultCode.retcode != 0) {
            throw new Error("mediaTerminalQuerySkillWaitNum fail " + _getReason(resultCode.retcode));
        }
        return resultCode;
    }

    /**
     * 查询匿名呼叫排队数
     */
    function mediaTerminalQueryAnonymousWaitNum() {
        var resultCode = JSON.parse(VTMUtil.VTMCtrlOCX.mediaTerminalQueryAnonymousWaitNum());
        if (resultCode.retcode != 0) {
            throw new Error("mediaTerminalQueryAnonymousWaitNum fail " + _getReason(resultCode.retcode));
        }
        return resultCode;
    }

    /**
     * 设置对端视频窗口句柄
     * @param VedioHandle
     */
    function mediaTerminalSetRemoteVedioHandle(VedioHandle) {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalSetRemoteVedioHandle(VedioHandle);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSetRemoteVedioHandle fail " + _getReason(resultCode));
        }
    }

    /**
     * 设置本地视频窗口句柄
     * @param VedioHandle 视频句柄
     */
    function mediaTerminalSetLocalVedioHandle(VedioHandle) {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalSetLocalVedioHandle(VedioHandle);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSetLocalVedioHandle fail " + _getReason(resultCode));
        }
    }

    /**
     * 设置三方视频窗口句柄
     * @param VedioHandle 视频句柄
     */
    function mediaTerminalSetRemoteTellerVedioHandle(VedioHandle) {
        var resultCode = VTMUtil.VTMCtrlOCX.mediaTerminalSetRemoteTellerVedioHandle(VedioHandle);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSetRemoteTellerVedioHandle fail " + _getReason(resultCode));
        }
    }

    function _getReason(code) {
        return VTMUtil.VTMCtrlOCX.mediaGetErrorReason(code);
    }

    /**
     * 回调事件对象
     */
    var initCallBack = {
        //终端呼叫回铃事件
        TerminalRingBackEvent: function (msg) {
        },
        //呼叫建立事件
        TerminalTalkingEvent: function (msg) {
        },
        //呼叫释放事件
        TerminalCallingReleaseEvent: function (msg) {
        },
        //语音视频恢复事件
        VedioBeenResumedEvent: function () {
        },
        //语音视频被暂停事件
        VedioBeenPausedEvent: function () {
        },
        //三方通话建立事件
        TerminalThreePartyTalkingEvent: function (msg) {
        },
        //终端通话中
        TerminalinServiceEvent: function () {
        },
        //呼叫被转移，排队中
        TerminalOutServiceEvent: function () {
        },
        //打开摄像头失败
        OpenCameraFailedEvent: function () {
        },
        //视频模式不匹配错误事件
        NegotiateVideoFailed: function (msg) {
        },
        //视频拍照事件
        VideoSnapshotEvent: function (msg) {
        },
        //网络流量监控事件,通话建立后每10s触发一次
        NetworkMonitorEvent: function (msg) {
        },
        //组件激活事件
        omponentActiveEvent: function (msg) {
        },
        //终端收到SIPINFO消息事件
        TerminalSipInfoEvent: function (msg) {
        },
        //终端语音通话建立事件
        TerminalAudioTalkingEvent: function (msg) {
        },
        //呼叫排队等待事件
        TerminalWaitingInQueueEvent: function () {
        }
    };


    /**
     * MTE注册
     */
    var resetMedia = function () {
        engine.addBatchCallBack4Model(initCallBack);
    };


    return {
        mediaTerminalCall: mediaTerminalCall,
        mediaTerminalReleaseCall: mediaTerminalReleaseCall,
        mediaTerminalSnapShot: mediaTerminalSnapShot,
        mediaTerminalSnapShotById: mediaTerminalSnapShotById,
        mediaTerminalAnonymousCall: mediaTerminalAnonymousCall,
        mediaTerminalQuerySkillWaitNum: mediaTerminalQuerySkillWaitNum,
        mediaTerminalQueryAnonymousWaitNum: mediaTerminalQueryAnonymousWaitNum,
        mediaTerminalSetRemoteVedioHandle: mediaTerminalSetRemoteVedioHandle,
        mediaTerminalSetLocalVedioHandle: mediaTerminalSetLocalVedioHandle,
        mediaTerminalSetRemoteTellerVedioHandle: mediaTerminalSetRemoteTellerVedioHandle,
        resetMedia: resetMedia
    }
});