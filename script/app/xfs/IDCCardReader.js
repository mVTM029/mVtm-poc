/**
 * @module xfs/IDCCardReader
 */
define(['app/xfs/xfsUtil','app/util/util'],function(xfsUtil,$$){

    /**
     * @name IDCCardReader
     */
    var IDCCardReader = xfsUtil.EXT.IDCCardReader;

    /**
     * @name handler
     * @type {null}
     */
    var handler = null;

    /**
     * noop
     */
    var noop = function () {};

    /**
     * 取消执行指令
     * @method AsyncCancel
     * @returns {Promise}
     */
    function AsyncCancel(){
        var result = IDCCardReader.AsyncCancel();
        if (result !== 'WFS_SUCCESS') {
            $$.debug("AsyncCancel error", "error");
            throw new Error('IDCardReader.AsyncCancel() error: ' + JSON.stringify(result));
        }
        return Promise.resolve(0);
    }

    /**
     * 获取银行卡读卡器设备功能
     * @method AsyncCapabilities
     * @returns {Promise}
     */
    function AsyncCapabilities(){
        var result = IDCCardReader.AsyncCapabilities(xfsUtil.xfsInfo.timeout);
        if(result !== 'WFS_SUCCESS'){
            $$.debug("AsyncCapabilities error", "error");
            throw new Error('IDCCardReader.AsyncCapabilities() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    /**
     * 退出银行卡
     * @method AsyncEjectCard
     * @returns {Promise}
     */
    function AsyncEjectCard(callback){
        handler = callback;
        var result = IDCCardReader.AsyncEjectCard(xfsUtil.xfsInfo.timeout);
        if(result !== 'WFS_SUCCESS'){
            $$.debug("AsyncEjectCard error", "error");
            throw new Error('IDCCardReader.AsyncEjectCard() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }


    /**
     * AsyncEjectCard方法的回调对象
     * @callback IDCCardReaderAsyncEjectCardCallBack
     * @param {string} msg 回到信息
     */
    var resetIDCCardReader = function(){
        window.IDCCardReaderAsyncEjectCardCallBack=function(msg){
            var dataObj = JSON.parse(msg);
            if (dataObj.hResult === 'WFS_SUCCESS'){
                switch (dataObj.Code){
                    case 'WFS_CMD_IDC_EJECT_CARD':   //退卡
                        handler['exitCard'] ? handler['exitCard'].call(dataObj) : noop();
                        break;
                    case 'WFS_SRVE_IDC_MEDIAREMOVED': //取卡
                        handler['takeCard'] ? handler['takeCard'].call(dataObj) : noop();
                        break;
                    default:
                        break;
                }
            }
        };
    };

    /**
     * 回收银行卡
     * @method AsyncRetainCard
     * @returns {Promise}
     */
    function AsyncRetainCard(){
        var result = IDCCardReader.AsyncRetainCard(xfsUtil.xfsInfo.timeout);
        if(result !== 'WFS_SUCCESS'){
            $$.debug("AsyncRetainCard error", "error");
            throw new Error('IDCCardReader.AsyncRetainCard() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    /**
     * 读取银行卡信息
     * @method AsyncReadRawData
     * @returns {Promise}
     */
    function AsyncReadRawData(track){
        var result = IDCCardReader.AsyncReadRawData(track,xfsUtil.xfsInfo.timeout);
        if(result !== 'WFS_SUCCESS'){
            $$.debug("AsyncReadRawData error", "error");
            throw new Error('IDCCardReader.AsyncReadRawData() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    /**
     * 重置银行卡读卡器
     * @method AsyncReset
     * @returns {Promise}
     */
    function AsyncReset(){
        var result = IDCCardReader.AsyncReset();
        if(result !== 'WFS_SUCCESS'){
            $$.debug("AsyncReset error", "error");
            throw new Error('IDCCardReader.AsyncReset() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    /**
     * 获取银行卡读卡器状态
     * @method AsyncStatus
     * @returns {Promise}
     */
    function AsyncStatus(){
        var result = IDCCardReader.AsyncStatus();
        if(result !== 'WFS_SUCCESS'){
            $$.debug("AsyncStatus error", "error");
            throw new Error('IDCCardReader.AsyncStatus() error: ' + JSON.stringify(result));
        }
        return Promise.resolve();
    }

    return {
        AsyncCancel:AsyncCancel,
        AsyncCapabilities:AsyncCapabilities,
        AsyncEjectCard:AsyncEjectCard,
        AsyncRetainCard:AsyncRetainCard,
        AsyncReadRawData:AsyncReadRawData,
        AsyncReset:AsyncReset,
        AsyncStatus:AsyncStatus,
        resetIDCCardReader:resetIDCCardReader
    }
});