define(['app/espace/espaceMgmt', './VTMUtil'], function (engine, VTMUtil) {

    /**
     * 终端登录
     */
    function mediaTerminalLogin(id) {
        var retCode = VTMUtil.VTMCtrlOCX.mediaTerminalLogin(id, '');
        if (retCode !== 0) {
            throw new Error('VTM login fail: ' + VTMUtil.mediaGetErrorReason(retCode));
        }
    }

    /**
     * 终端登出
     */
    function mediaTerminalLogout() {
        var retCode = VTMUtil.VTMCtrlOCX.mediaTerminalLogout();
        if (retCode !== 0) {
            throw new Error('VTM logout fail: ' + retCode);
        }
    }

    /**
     * 获取本地所有视频设备
     */
    function mediaTerminalGetLocalVideoDeviceInfo() {
        return VTMUtil.VTMCtrlOCX.mediaTerminalGetLocalVideoDeviceInfo().result;
    }

    var initCallBack = {
        //终端登录成功事件
        TerminalLoginSuccEvent: function () {
            VTMUtil.setStatus(VTMUtil.statusKeys.LOGIN_SUCC, true);
        },
        //终端登录失败事件
        TerminalLoginFailEvent: function (msg) {
            msg = JSON.parse(msg);
            throw new Error('TerminalLoginFailEvent: [' + VTMUtil.mediaGetErrorReason(msg.retCode) + ']' + msg.message);
        },
        //终端登出成功事件
        TerminalLogoutSuccEvent: function () {
            VTMUtil.setStatus(VTMUtil.statusKeys.LOGIN_SUCC, false);
        },
        //终端登出失败事件
        TerminalLogoutFailEvent: function (msg) {
            msg = JSON.parse(msg);
            throw new Error('TerminalLoginFailEvent: [' + msg.retcode + ']' + msg.message);
        },
        //找不到配置文件
        NoConfigFileEvent: function () {
            throw new Error('NoConfigFileEvent');
        },
        //配置文件参数错误
        ConfigParamErrorEvent: function () {
            throw new Error('NoConfigFileEvent');
        },
        //初始化控件成功事件
        OcxInitSuccEvent: function () {
            VTMUtil.setStatus(VTMUtil.statusKeys.INIT_SUCC, true);
        },
        //初始化控件失败事件
        OcxInitFailedEvent: function () {
            throw new Error('OcxInitFailedEvent');
        }
    };

    /**
     * MTE注册
     */
    var resetMedia = function () {
        engine.addBatchCallBack4Model(initCallBack);
    };

    return {
        mediaTerminalLogin: mediaTerminalLogin,
        resetMedia: resetMedia,
        mediaTerminalLogout: mediaTerminalLogout,
        mediaTerminalGetLocalVideoDeviceInfo: mediaTerminalGetLocalVideoDeviceInfo
    }
});