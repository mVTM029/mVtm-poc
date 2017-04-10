/**
 *
 */
define(['app/espace/callCtrl',
    'app/espace/IOCtrl',
    'app/espace/messageCtrl',
    'app/espace/publicCtrl',
    'app/espace/remoteCtrl',
    'app/espace/initCtrl'],function (
    callCtrl,
    IOCtrl,
    messageCtrl,
    publicCtrl,
    remoteCtrl,
    initCtrl) {

    return {
        initCtrl: initCtrl,
        remoteCtrl: remoteCtrl,
        publicCtrl: publicCtrl,
        messageCtrl: messageCtrl,
        IOCtrl: IOCtrl,
        callCtrl: callCtrl,

    }
});