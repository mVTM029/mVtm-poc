/**
 * IO控制模块
 * @module IOCtrl
 * @class IOCtrl
 */
define(['app/espace/espaceMgmt', 'app/espace/VTMUtil'], function (engine, VTMUtil) {
    var mediaOCX = VTMUtil.VTMCtrlOCX;


    /**
     * 终端向柜员侧发送文件
     * @method mediaTerminalSendFile
     * @param {String} fileName 本地文件名全路径
     */
    function mediaTerminalSendFile(fileName) {
        var resultCode = mediaOCX.mediaTerminalSendFile(fileName);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSendFile fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 接收文件
     * @method mediaTerminalRecvFile
     * @param fileId 文件ID
     * @param fileName 文件保存的文件名全路径
     */
    function mediaTerminalRecvFile(fileId, fileName) {
        var resultCode = mediaOCX.mediaTerminalRecvFile(fileId, fileName);
        if (resultCode != 0) {
            throw new Error("mediaTerminalRecvFile fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 数据推送
     * @method mediaTerminalSendMsg
     * @param message 要发送的数据内容
     */
    function mediaTerminalSendMsg(message) {
        var resultCode = mediaOCX.mediaTerminalSendMsg(message);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSendMsg fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 设置视频参数
     * @method mediaTerminalSetVedioParam
     * @param ConfParam
     */
    function mediaTerminalSetVedioParam(ConfParam) {
        var resultCode = mediaOCX.mediaTerminalSetVedioParam(ConfParam);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSetVedioParam fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 获取当前摄像头参数
     * @method mediaTerminalGetVedioParam
     * @return String 非空JSON格式字符串
     */
    function mediaTerminalGetVedioParam() {
        var resultCode = mediaOCX.mediaTerminalGetVedioParam();
        if (resultCode != 0) {
            throw new Error("mediaTerminalGetVedioParam fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 获取配置文件中视频参数
     * @method mediaTerminalGetDefaultVedioParam
     * @return String 非空JSON格式字符串
     */
    function mediaTerminalGetDefaultVedioParam() {
        var resultCode = mediaOCX.mediaTerminalGetDefaultVedioParam();
        if (resultCode != 0) {
            throw new Error("mediaTerminalGetVedioParam fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 获取当前 OCX 支持的视频参数列表
     * @method mediaTerminalGetSupportVedioParam
     * @return String 非空JSON格式字符串
     */
    function mediaTerminalGetSupportVedioParam() {
        var resultCode = mediaOCX.mediaTerminalGetSupportVedioParam();
        if (resultCode != 0) {
            throw new Error("mediaTerminalGetSupportVedioParam fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 设置流控峰值
     * @param dataType 要配置的部件类型
     * @param dataSize 带宽峰值
     * @method mediaFlowControl
     */
    function mediaFlowControl(dataType, dataSize) {
        var resultCode = mediaOCX.mediaFlowControl(dataType, dataSize);
        if (resultCode != 0) {
            throw new Error("mediaFlowControl fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *获取 Teller 侧指定视频的视频质量参数
     * @param index 视频序号
     * @method mediaTerminalGetTellerVideoParam
     */
    function mediaTerminalGetTellerVideoParam(index) {
        var resultCode = mediaOCX.mediaTerminalGetTellerVideoParam(index);
        if (resultCode != 0) {
            throw new Error("mediaTerminalGetTellerVideoParam fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 获取第三方指定视频的视频参数
     * @param index 视频序号
     * @method mediaTerminalGetTripartiteVideoParam
     */
    function mediaTerminalGetTripartiteVideoParam(index) {
        var resultCode = mediaOCX.mediaTerminalGetTripartiteVideoParam(index);
        if (resultCode != 0) {
            throw new Error("mediaTerminalGetTripartiteVideoParam fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 共享文档窗口刷新
     * @method mediaTerminalShareFileRefresh
     */
    function mediaTerminalShareFileRefresh() {
        var resultCode = mediaOCX.mediaTerminalShareFileRefresh();
        if (resultCode != 0) {
            throw new Error("mediaTerminalShareFileRefresh fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 设置共享文档显示区大小
     * @param width 宽
     * @param height 高
     * @method mediaTerminalShareFileSetDisplaySize
     */
    function mediaTerminalShareFileSetDisplaySize(width, height) {
        var resultCode = mediaOCX.mediaTerminalShareFileSetDisplaySize(width, height);
        if (resultCode != 0) {
            throw new Error("mediaTerminalShareFileSetDisplaySize fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 设置共享文档窗口句柄
     * @param hwnd 窗口句柄
     * @method mediaTerminalSetShareFileWnd
     */
    function mediaTerminalSetShareFileWnd(hwnd) {
        var resultCode = mediaOCX.mediaTerminalSetShareFileWnd(hwnd);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSetShareFileWnd fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 共享文档进行上一页跳转
     * @param fileId 文档ID
     * @method mediaTerminalShareFilePrePage
     */
    function mediaTerminalShareFilePrePage(fileId) {
        var resultCode = mediaOCX.mediaTerminalShareFilePrePage(fileId);
        if (resultCode != 0) {
            throw new Error("mediaTerminalShareFilePrePage fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 共享文档进行下一页跳转
     * @param fileId 文档ID
     * @method mediaTerminalShareFileNextPage
     */
    function mediaTerminalShareFileNextPage(fileId) {
        var resultCode = mediaOCX.mediaTerminalShareFileNextPage(fileId);
        if (resultCode != 0) {
            throw new Error("mediaTerminalShareFileNextPage fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *获取共享文档当前的信息
     * @param fileId 文档ID
     * @method mediaTerminalShareFileGetFileInfo
     * @return String 非空JSON格式字符串
     */
    function mediaTerminalShareFileGetFileInfo(fileId) {
        var resultCode = mediaOCX.mediaTerminalShareFileGetFileInfo(fileId);
        if (resultCode != 0) {
            throw new Error("mediaTerminalShareFileGetFileInfo fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *设置白板窗口句柄
     * @param vedioHandle 窗口句柄
     * @method mediaTerminalSetWhiteBoardWnd
     */
    function mediaTerminalSetWhiteBoardWnd(vedioHandle) {
        var resultCode = mediaOCX.mediaTerminalSetWhiteBoardWnd(vedioHandle);
        if (resultCode != 0) {
            throw new Error("mediaTerminalSetWhiteBoardWnd fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 设置电子白板显示区大小
     * @param width 宽
     * @param height 高
     * @method mediaTerminalWhiteBoardSetDisplaySize
     */
    function mediaTerminalWhiteBoardSetDisplaySize(width, height) {
        var resultCode = mediaOCX.mediaTerminalWhiteBoardSetDisplaySize(width, height);
        if (resultCode != 0) {
            throw new Error("mediaTerminalWhiteBoardSetDisplaySize fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *柜员刷新电子白板窗口
     * @method mediaTerminalWhiteBoardRefresh
     */
    function mediaTerminalWhiteBoardRefresh() {
        var resultCode = mediaOCX.mediaTerminalWhiteBoardRefresh();
        if (resultCode != 0) {
            throw new Error("mediaTerminalWhiteBoardRefresh fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 失败原因获取
     * @param errorCode 错误码
     * @method mediaGetErrorReason
     */
    function mediaGetErrorReason(errorCode) {
        var resultCode = mediaOCX.mediaGetErrorReason(errorCode);
        if (resultCode != 0) {
            throw new Error("mediaGetErrorReason fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 获得配置项值
     * @param configKey 配置项key
     * @method mediaGetConfig
     */
    function mediaGetConfig(configKey) {
        var resultCode = mediaOCX.mediaGetConfig(configKey);
        if (resultCode != 0) {
            throw new Error("mediaGetConfig fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *获得非自定义配置项值
     * @param configKey 配置项key
     * @method mediaGetDefaultConfig
     */
    function mediaGetDefaultConfig(configKey) {
        var resultCode = mediaOCX.mediaGetDefaultConfig(configKey);
        if (resultCode != 0) {
            throw new Error("mediaGetDefaultConfig fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *设置自定义配置信息
     * @param sConfigs json格式字符串
     * @method mediaCustomConfigs
     */
    function mediaCustomConfigs(sConfigs) {
        var resultCode = mediaOCX.mediaCustomConfigs(sConfigs);
        if (resultCode != 0) {
            throw new Error("mediaCustomConfigs fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *设置自动捕获刷新的窗口句柄
     * @param component 模块名称
     * @param hwnd 窗口句柄
     * @method mediaSetHookRefreshHwnd
     */
    function mediaSetHookRefreshHwnd(component, hwnd) {
        var resultCode = mediaOCX.mediaSetHookRefreshHwnd(component, hwnd);
        if (resultCode != 0) {
            throw new Error("mediaSetHookRefreshHwnd fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     *设置自动捕获键盘事件的窗口句柄
     * @param component 模块名称
     * @param hwnd 窗口句柄
     * @method mediaSetHookKeyHwnd
     */
    function mediaSetHookKeyHwnd(component, hwnd) {
        var resultCode = mediaOCX.mediaSetHookKeyHwnd(component, hwnd);
        if (resultCode != 0) {
            throw new Error("mediaSetHookKeyHwnd fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 设置自动捕获鼠标事件的窗口句柄
     * @param component 模块名称
     * @param hwnd 窗口句柄
     * @method mediaSetHookMouseHwnd
     */
    function mediaSetHookMouseHwnd(component, hwnd) {
        var resultCode = mediaOCX.mediaSetHookMouseHwnd(component, hwnd);
        if (resultCode != 0) {
            throw new Error("mediaSetHookMouseHwnd fail" + VTMUtil.mediaGetErrorReason(resultCode));
        }
    }

    /**
     * 回调事件对象
     * @property
     * @type {{FileTranInfoEvent: Function, FileTranOverEvent: Function, TerminalGetTellerVideoParamResultEvent: Function, TerminalGetTripartiteVideoParamResultEvent: Function, ShareFileCurrentPageEvent: Function}}
     */
    var initCallBack = {
        //文件传输进度事件
        FileTranInfoEvent: function (msg) {
            JSON.parse(msg);
        },
        //文件传输结束事件
        FileTranOverEvent: function (msg) {
            JSON.parse(msg);
        },
        //柜员获取teller侧指定视频质量结果事件
        TerminalGetTellerVideoParamResultEvent: function (msg) {
            JSON.parse(msg);
        },
        //柜员获取第三方指定视频质量结果事件
        TerminalGetTripartiteVideoParamResultEvent: function (msg) {
            JSON.parse(msg);
        },
        //共享文档页激活事件
        ShareFileCurrentPageEvent: function (msg) {
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
        mediaTerminalSendFile: mediaTerminalSendFile,
        mediaTerminalRecvFile: mediaTerminalRecvFile,
        mediaTerminalSendMsg: mediaTerminalSendMsg,
        mediaTerminalSetVedioParam: mediaTerminalSetVedioParam,
        mediaTerminalGetVedioParam: mediaTerminalGetVedioParam,
        mediaTerminalGetDefaultVedioParam: mediaTerminalGetDefaultVedioParam,
        mediaTerminalGetSupportVedioParam: mediaTerminalGetSupportVedioParam,
        mediaFlowControl: mediaFlowControl,
        mediaTerminalGetTellerVideoParam: mediaTerminalGetTellerVideoParam,
        mediaTerminalGetTripartiteVideoParam: mediaTerminalGetTripartiteVideoParam,
        mediaTerminalShareFileRefresh: mediaTerminalShareFileRefresh,
        mediaTerminalShareFileSetDisplaySize: mediaTerminalShareFileSetDisplaySize,
        mediaTerminalSetShareFileWnd: mediaTerminalSetShareFileWnd,
        mediaTerminalShareFilePrePage: mediaTerminalShareFilePrePage,
        mediaTerminalShareFileNextPage: mediaTerminalShareFileNextPage,
        mediaTerminalShareFileGetFileInfo: mediaTerminalShareFileGetFileInfo,
        mediaTerminalSetWhiteBoardWnd: mediaTerminalSetWhiteBoardWnd,
        mediaTerminalWhiteBoardSetDisplaySize: mediaTerminalWhiteBoardSetDisplaySize,
        mediaTerminalWhiteBoardRefresh: mediaTerminalWhiteBoardRefresh,
        mediaGetErrorReason: mediaGetErrorReason,
        mediaGetConfig: mediaGetConfig,
        mediaGetDefaultConfig: mediaGetDefaultConfig,
        mediaCustomConfigs: mediaCustomConfigs,
        mediaSetHookRefreshHwnd: mediaSetHookRefreshHwnd,
        mediaSetHookKeyHwnd: mediaSetHookKeyHwnd,
        mediaSetHookMouseHwnd: mediaSetHookMouseHwnd
    }
});