/**
 * @module xfs/ESpaceMediaTerminal 异步多媒体请求模块
 */
define(['app/xfs/xfsUtil', 'app/util/util'], function (xfsUtil, $$) {
    //呼叫类型
    var CALL_TYPE = {
        AUDIO: 0, //音频
        AUDIO_AND_VIDEO: 1, //音视频
        ONE_WAY_VIDEO: 2 //单向视频
    };
    //TerminalCallingReleaseEvent 在home.js监听
    var ESpaceMediaTerminal = xfsUtil.ESpaceMediaTerminal;
    var VTMActiveXUI = xfsUtil.VTMActiveXUI;
    var forceTime = null;
    var terminalInfo = {
        vtaDialogID: null,
        vtmDialogID: null,
        loginStatus: false,
        callStatus: -1,
        vtmUserName: 8001, //vtm登录用户户名
        callType: CALL_TYPE.AUDIO_AND_VIDEO, //音视频
        callNumber: 6661 //被叫号码
    };
    var callStatus = {
        call: 0,
        calling: 1,
        called: -1
    };

    var reasonError = xfsUtil.mediaGetErrorReason;

    /**
     * 向VTA发送数据
     * @returns {Promise}
     */
    function mediaTerminalSendMsg(type, message) {
        var actionMessage = {};
        actionMessage.type = type; //text,signature,print,scanner,sms,account
        actionMessage.msg = message;
        $$.debug('发送消息' + JSON.stringify(actionMessage));
        var promise = new Promise(function (resolve, reject) {
            var mediaTerminalSendMsgResult = ESpaceMediaTerminal.mediaTerminalSendMsg(JSON.stringify(actionMessage));
            if (mediaTerminalSendMsgResult != 0) {
                reject(reasonError(mediaTerminalSendMsgResult));
            } else {
                resolve();
            }
        });
        return promise;
    }

    /**
     * 终端登录
     * @param username
     * @param password
     * @returns {Promise}
     */
    function mediaTerminalLoginAsync(username, password) {
        password = password || '';
        username = username || '';
        var promise = new Promise(function (resolve, reject) {
            window.TerminalLoginSuccEvent = function () {
                terminalInfo.loginStatus = true;
                resolve();
            };
            window.TerminalLoginFailEvent = function (error) {
                terminalInfo.loginStatus = false;
                reject(error);
            };
            var loginActionResult = ESpaceMediaTerminal.mediaTerminalLogin(username, password);
            if (loginActionResult != '0') {
                reject(reasonError(loginActionResult));
            }
        });
        return promise;
    }

    /**
     * 终端登出
     * @returns {Promise}
     */
    function mediaTerminalLogoutAsync() {
        var promise = new Promise(function (resolve, reject) {
            window.TerminalLogoutSuccEvent = function () {
                resolve();
                terminalInfo.loginStatus = false;
            };
            window.TerminalLogoutFailEvent = function (error) {
                reject(error);
            };
            var logoutActionResult = ESpaceMediaTerminal.mediaTerminalLogout();
            if (logoutActionResult != '0') {
                reject(reasonError(logoutActionResult));
            }
        });
        return promise;
    }

    /**
     * 发起呼叫
     * @param {function} TerminalCallingReleaseEvent
     * 该参数为了解决华为拨打电话，如果没有vta在线则立即调用挂断问题
     * @param _dialogResolve 弹框解决方案
     * @param language 需求未到
     * @public
     * @method mediaTerminalCallAsync
     */
    function mediaTerminalCallAsync(TerminalCallingReleaseEvent, _dialogResolve, language) {

        var oldEvent = TerminalCallingReleaseEvent;
        window["TerminalCallingReleaseEvent"] = function(){};

        var promise = new Promise(function (resolve, reject) {
            window.TerminalRingBackEvent = function (data) { //响铃事件
                forceTime = _dialogResolve();
                terminalInfo.callStatus = callStatus.call;
                resolve([p, data, forceTime]);//呼叫建立promise,响铃的data,响铃dialogInterval
            };

            var p = new Promise(function (res) {
                var oldTalkingEvent = window.TerminalTalkingEvent;//缓存起来，因为还有一个监控事件在监听中
                window.TerminalTalkingEvent = function (msg) { //呼叫建立事件
                    try{
                        oldTalkingEvent(msg);
                    }catch (e){
                        $$.debug('oldTalkingEvent function error');
                    }
                    terminalInfo.callStatus = callStatus.calling;
                    window["TerminalCallingReleaseEvent"] = oldEvent;
                    openRemoteVideo();
                    res(forceTime);
                };
            });

            window.OpenCameraFailedEvent = function (error) { //打开摄像头失败事件
                reject(error);
            };

            var CallActionResult = ESpaceMediaTerminal.mediaTerminalCall(terminalInfo.callType, terminalInfo.callNumber, null);
            if (CallActionResult != callStatus.call) {
                reject(reasonError(CallActionResult));
            }
        });
        return promise;
    }

    function getToken() {
        // return 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDAyODExNzIsImNyZWF0ZWQiOjE0ODczMjExMTMxMTIsInNvbHRLZXkiOiJZalZtWm1Rd1ltUXRaakE0TnkwME5qTm1MV0U0T0RjdFpXTXdNMlEwTkRnMk1tSXciLCJjbGllbnRJZCI6InZ0bTAwMSJ9.OwslD1FCRQmtPw3UpUQgRZcbQIIv7T7jjNrCFqoK83U';
        var token = ESpaceMediaTerminal.getToken();
        if (!token) {
            throw new Error('token值为空');
        }
        return token;
    }

    /**
     * 释放呼叫
     */
    function mediaTerminalReleaseCallAsync() {
        $$.debug('主动释放呼叫(主)','error');
        var promise = new Promise(function (resolve, reject) {
            window.TerminalCallingReleaseEvent = function (data) { //终端结束通话事件
                $$.debug('主动释放呼叫(回调)','error');
                terminalInfo.callStatus = callStatus.called;
                resolve(data);
            };
            var ReleaseCallActionResult = ESpaceMediaTerminal.mediaTerminalReleaseCall();
            $$.debug('主动释放呼叫(主内)','error');
            if (ReleaseCallActionResult != 0) {
                reject(reasonError(ReleaseCallActionResult));
            }
        });
        return promise;

    }


    /**
     * 设置窗口句柄
     */
    function mediaTerminalSetRemoteVedioHandle(hwnId) {
        ESpaceMediaTerminal.mediaTerminalSetRemoteVedioHandle(hwnId);
    }

    function mediaTerminalSetLocalVedioHandle(hwnId) {
        ESpaceMediaTerminal.mediaTerminalSetLocalVedioHandle(hwnId);
    }

    /**
     * 打开teller远程视频窗口
     * @method openRemoteVideo
     * @param x 窗口横坐标
     * @param y 窗口纵坐标
     * @param w 窗口宽度
     * @param h 窗口高度
     */
    function openRemoteVideo() {
        VTMActiveXUI.OpenDialog(terminalInfo.vtaDialogID,1920,0,1920,1080);//双屏获取的是主屏分辨率
        VTMActiveXUI.OpenDialog(terminalInfo.vtmDialogID,3240,680,600,400);
        // var vtmX = 0,
        //     vtmY = 0,
        //     vtmW = 0,
        //     vtmH = 0;
        // var vtaX = 0,
        //     vtaY = 0,
        //     vtaW = 600,
        //     vtaH = 400;
        // var offsetsX = 0,
        //     offsetsY = 230;
        // vtmX = window.screen.width - vtmW - offsetsX;
        // vtmY = window.screen.height - vtmH - offsetsY;
        //
        // vtaX = window.screen.width; //for external screen
        // vtaY = 0; //for external screen
        // vtaW = window.screen.width; //for external screen
        // vtaH = window.screen.height; //for external screen
        //
        // VTMActiveXUI.OpenDialog(terminalInfo.vtaDialogID, vtaX, vtaY, vtaW, vtaH);
        // VTMActiveXUI.OpenDialog(terminalInfo.vtmDialogID, vtmX, vtmY, vtmW, vtmH);
    }

    /**
     *关闭teller远程视频窗口
     *@method closeRemoteVideo
     */
    function closeRemoteVideo() {
        clearInterval(forceTime);
        VTMActiveXUI.CloseDialog(terminalInfo.vtaDialogID);
        VTMActiveXUI.CloseDialog(terminalInfo.vtmDialogID);
    }


    /**
     * 远程协助事件回调
     * @type {{DesktopShareStartEvent: Function, ShareDesktopWndSizeEvent: Function, StopShareDesktopEvent: Function, RequestShareDesktopEvent: Function, CancelRequestShareDesktopEvent: Function, RequestRemoteControlEvent: Function, CancelRequestDesktopControlEvent: Function, StopRemoteControlEvent: Function, ApplicationShareStartEvent: Function, ApplicationShareStopEvent: Function}}
     */
    var RemoteAssistanceBack = {
        RequestShareDesktopEvent: function () { //桌面共享请求事件
            ESpaceMediaTerminal.mediaTerminalStartShareDesktop();
            $$.debug("RequestShareDesktopEvent succ");
        },
        CancelRequestShareDesktopEvent: function () { //取消桌面共享请求事件
            ESpaceMediaTerminal.mediaTerminalStopShareDesktop();
            $$.debug("CancelRequestShareDesktopEvent succ");
        },
        RequestRemoteControlEvent: function () { //远程控制请求事件
            ESpaceMediaTerminal.mediaTerminalStartRemoteControl();
            $$.debug("RequestRemoteControlEvent succ");
        },
        CancelRequestDesktopControlEvent: function () { //取消远程控制请求事件
            ESpaceMediaTerminal.mediaTerminalStopRemoteControl();
            $$.debug("CancelRequestDesktopControlEvent succ");
        }
    };
    xfsUtil.addBatchCallBack4Model(RemoteAssistanceBack); //注册回调


    /**
     * 多媒体模块
     * @property MediaAsyncCallBack
     * @type {{AudioAndVideoAction: MediaAsyncCallBack.AudioAndVideoAction, AudioAndVideoConnect: MediaAsyncCallBack.AudioAndVideoConnect, releaseCall: MediaAsyncCallBack.releaseCall, receivedAnswerCallEvent: MediaAsyncCallBack.receivedAnswerCallEvent}}
     */
    var MediaAsyncCallBack = {
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
        },
        //呼叫建立事件
        TerminalTalkingEvent: function (msg) {
        }
    };

    xfsUtil.addBatchCallBack4Model(MediaAsyncCallBack); //注册回调


    function resetMedia() {
        xfsUtil.addBatchCallBack4Model(MediaAsyncCallBack); //注册回调
        //TODO: 按需重置回调
        // espaceControl.callCtrl.resetMedia();
    }

    _mediaInit();

    function _mediaInit() {
        try {
            terminalInfo.vtmDialogID = VTMActiveXUI.CreateVideoWindow('0', 'VTM视频窗口');
            terminalInfo.vtaDialogID = VTMActiveXUI.CreateVideoWindow('0', 'VTA视频窗口');
            var VTMHwnd = VTMActiveXUI.GetHwnd(terminalInfo.vtmDialogID);
            var VTAHwnd = VTMActiveXUI.GetHwnd(terminalInfo.vtaDialogID);
            var VTAHandleResult = mediaTerminalSetRemoteVedioHandle(VTAHwnd);
            $$.debug(terminalInfo.vtaDialogID + ' ' + VTAHandleResult);
            var VTMHandleResult = mediaTerminalSetLocalVedioHandle(VTMHwnd);
            $$.debug(terminalInfo.vtmDialogID + ' ' + VTMHandleResult);
        } catch (e) {
            $$.debug("media init fail" + e.message);
        }
    }

    return {
        mediaTerminalLoginAsync: mediaTerminalLoginAsync,
        mediaTerminalLogoutAsync: mediaTerminalLogoutAsync,
        mediaTerminalCallAsync: mediaTerminalCallAsync,
        mediaTerminalReleaseCallAsync: mediaTerminalReleaseCallAsync,
        terminalInfo: terminalInfo,
        callStatus: callStatus,
        resetMedia: resetMedia,
        openRemoteVideo: openRemoteVideo,
        closeRemoteVideo: closeRemoteVideo,
        mediaTerminalSendMsg: mediaTerminalSendMsg,
        getToken: getToken,
        MediaAsyncCallBack: MediaAsyncCallBack
    };

});
