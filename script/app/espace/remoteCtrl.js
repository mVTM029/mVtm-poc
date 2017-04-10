define(['app/espace/espaceMgmt', 'app/espace/VTMUtil'], function (engine, VTMUtil) {
    var mediaOCX = VTMUtil.VTMCtrlOCX;

    /**
     * 设置共享桌面窗口句柄
     * hwnd窗口句柄
     * @constructor
     */
    function mediaTerminalSetDesktopWnd(hwnd) {
        var resultCode = mediaOCX.mediaTerminalSetDesktopWnd(hwnd);
        if (resultCode != 0) {
            throw new Error("TerminalSetDesktopWnd fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 开始桌面共享
     * @constructor
     */
    function mediaTerminalStartShareDesktop() {
        var resultCode = mediaOCX.mediaTerminalStartShareDesktop();
        if (resultCode != 0) {
            throw new Error("TerminalShareDesk fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 停止桌面共享
     * @constructor
     */
    function mediaTerminalStopShareDesktop() {
        var resultCode = mediaOCX.mediaTerminalStopShareDesktop();
        if (resultCode != 0) {
            throw new Error("TerminalStopShareDesk fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 拒绝屏幕共享
     * @constructor
     */
    function mediaTerminalRejectShareDesktop() {
        var resultCode = mediaOCX.mediaTerminalRejectShareDesktop();
        if (resultCode != 0) {
            throw new Error("TerminalRejectShareDesk fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 刷新屏幕共享
     * @param x共享桌面横向分辨率
     * @param y共享桌面纵向分辨率
     * @constructor
     */
    function mediaTerminalRefreshDesktopWnd(x, y) {
        var resultCode = mediaOCX.mediaTerminalRefreshDesktopWnd(x, y);
        if (resultCode != 0) {
            throw new Error("TerminalRefreshShareDesk fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 开始远程控制
     * @constructor
     */
    function mediaTerminalStartRemoteControl() {
        var resultCode = mediaOCX.mediaTerminalStartRemoteControl();
        if (resultCode != 0) {
            throw new Error("TerminalStartRemoteControl fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 停止远程控制
     * @constructor
     */
    function mediaTerminalStopRemoteControl() {
        var resultCode = mediaOCX.mediaTerminalStopRemoteControl();
        if (resultCode != 0) {
            throw new Error("TerminalStopRemoteControl fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *拒绝远程控制
     * @constructor
     */
    function mediaTerminalRejectRemoteControl() {
        var resultCode = mediaOCX.mediaTerminalRejectRemoteControl();
        if (resultCode != 0) {
            throw new Error("TerminalRejectRemoteControl fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 回调事件对象
     * @type {{RequestShareDesktopEvent: Function, StopShareDesktopEvent: Function, CancelRequestShareDesktopEvent: Function, DesktopShareStartEvent: Function, ShareDesktopWndSizeEvent: Function, ApplicationShareStartEvent: Function, ApplicationShareStopEvent: Function, RequestRemoteControlEvent: Function, CancelRequestDesktopControlEvent: Function, StopRemoteControlEvent: Function}}
     */
    var initCallBack = {
        //请求桌面共享事件
        RequestShareDesktopEvent: function (msg) {
            JSON.parse(msg);
        },
        //停止桌面共享事件
        StopShareDesktopEvent: function (msg) {
            JSON.parse(msg);
        },
        //取消桌面共享请求事件
        CancelRequestShareDesktopEvent: function (msg) {
            JSON.parse(msg);
        },
        //开始桌面共享事件
        DesktopShareStartEvent: function (msg) {
            JSON.parse(msg);
        },
        //远程桌面窗口尺寸通知事件
        ShareDesktopWndSizeEvent: function (msg) {
            JSON.parse(msg);
        },
        //程序共享发起事件
        ApplicationShareStartEvent: function (msg) {
            JSON.parse(msg);
        },
        //程序共享停止事件
        ApplicationShareStopEvent: function (msg) {
            JSON.parse(msg);
        },
        //远程控制请求事件
        RequestRemoteControlEvent: function (msg) {
            JSON.parse(msg);
        },
        //取消远程控制事件
        CancelRequestDesktopControlEvent: function (msg) {
            JSON.parse(msg);
        },
        //结束远程控制事件
        StopRemoteControlEvent: function (msg) {
            JSON.parse(msg);
        }
    };
    /**
     * MTE注册
     */
    var resetMedia = function(){
        engine.addBatchCallBack4Model(initCallBack);
    };

    return {
        resetMedia:resetMedia,
        mediaTerminalStartShareDesktop: mediaTerminalStartShareDesktop,
        mediaTerminalSetDesktopWnd: mediaTerminalSetDesktopWnd,
        mediaTerminalStopShareDesktop: mediaTerminalStopShareDesktop,
        mediaTerminalRejectShareDesktop: mediaTerminalRejectShareDesktop,
        mediaTerminalRefreshDesktopWnd: mediaTerminalRefreshDesktopWnd,
        mediaTerminalStartRemoteControl: mediaTerminalStartRemoteControl,
        mediaTerminalStopRemoteControl: mediaTerminalStopRemoteControl,
        mediaTerminalRejectRemoteControl: mediaTerminalRejectRemoteControl
    }
});