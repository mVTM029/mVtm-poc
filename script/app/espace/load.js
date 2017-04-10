/**
 * 加载 ESpaceMediaTerminal OCX
 */
define(['./VTMUtil'], function (VTMUtil) {
    var VTMUIEvents = [
        /****************所有VTMUIOCX控件初始化**************/
        'WndPaintEvent(eventInfo)'
    ];
    var VTMEvents = [
        /****************初始化控制**************/
        'TerminalLoginSuccEvent()',
        'TerminalLoginFailEvent(msg)',
        'TerminalLogoutSuccEvent()',
        'TerminalLogoutFailEvent(msg)',
        'NoConfigFileEvent()',
        'ConfigParamErrorEvent()',
        'OcxInitSuccEvent()',
        'OcxInitFailedEvent()',
        /****************呼叫控制**************/
        'TellerTalkingEvent(msg)',
        'OpenCameraFailedEvent()',
        'TellerNoAnswerEvent(msg)',
        'TellerCallingReleaseEvent(msg)',
        'TellerInsideCallFailEvent(msg)',
        'TellerNoAnswerEvent(msg)',
        'TellerWorkEvent()',
        'TellerIdleEvent()',
        'TellerSetNotReadyEvent()',
        'TellerRestSuccessEvent()',
        'TellerHoldEvent()'
    ];

    var ocxId = 'VTMCtrlOCX';
    var ocxClassId = 'CLSID:628DBBFF-ACC2-459F-8430-AEBE4E625709';
    var ocxUIId = 'VTMUICtrlOCX';
    var ocxUIClassId = 'CLSID:13FF5705-5F43-44DE-855F-81CE879771DD';
    var body = document.body, fragment = document.createDocumentFragment();
    for (var i = 0, len = VTMEvents.length; i < len; i++) {//创建EspaceMediaOCX插件
        fragment.appendChild(createEventScript(VTMEvents[i]));
    }
    var isOcxUi = true;//控制是否为OcxUi
    fragment.appendChild(createEventScript(VTMUIEvents[0],isOcxUi));//创建EMediaUIOCX插件
    body.appendChild(fragment);
    setTimeout(function () {
        var ocxElt = createObjectTag(ocxId, ocxClassId);
        var ocxUlt = createObjectTag(ocxUIId, ocxUIClassId);
        VTMUtil.VTMCtrlOCX = ocxElt;
        VTMUtil.VTMUICtrlOCX = ocxUlt;
        body.appendChild(ocxElt);
        body.appendChild(ocxUlt);
    }, 5000);

    //创建VTM事件脚本
    function createEventScript(event,isOcxUi) {
        var id = ocxId;
        if(isOcxUi){
            id = ocxUIId
        }
        var script = document.createElement('script');
        script.setAttribute('for', id);
        script.setAttribute('event', event);
        script.appendChild(document.createTextNode('MTE.' + event.replace(/\(\w*\)/g, '') + ' && MTE.' + event + ';'));
        return script;
    }

    //创建Object标签
    function createObjectTag(id, classId) {
        var elt = document.createElement('object');
        elt.setAttribute('id', id);
        elt.setAttribute('classid', classId);
        elt.setAttribute('width', 0);
        elt.setAttribute('height', 0);
        return elt;
    }
});