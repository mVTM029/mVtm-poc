/**
 * @module xfs/IDCardReader
 */
define(['app/xfs/xfsUtil', 'app/util/util'], function (xfsUtil, $$) {

    var IDCardReader = xfsUtil.EXT.IDCardReader;
    /**
     * @name handler
     * @type {null}
     */
    var handler = null;

    /**
     * @name noop
     * @type {function}
     */
    var noop = function () {
    };

    /**
     * @name bardCard
     * @type {boolean}
     */
    var badCard = false;//坏卡

    /**
     * 证件读取
     * @method AsyncReadRawData
     * @param {function} callback 回调函数
     * @public
     */
    function AsyncReadRawData(callback) {
        handler = callback;
        try {
            xfsUtil.EXT.IDCardReader.AsyncReadRawData(600000);
        } catch (e) {
            $$.debug("AsyncReadRawData error,Call IDCardReader.AsyncReadRawData() failed.", "error");
            throw new Error('Call IDCardReader.AsyncReadRawData() failed.');
        }
    }

    /**
     * 异步重置身份证读卡器
     * @method AsyncReset
     * @param {string} strResetIn 动作，{eject:弹出所发现的任何卡，retain:吞卡所发现的任何卡，noaction:对所发现的任何卡不应执行任何操作}
     * @param {number} nTimeout 超时时间（默认30s）
     * @param {string} eventArgsExStr 扩展字段
     * @return {Promise}
     */
    function AsyncReset(strResetIn, nTimeout, eventArgsExStr) {
        var result = IDCardReader.AsyncReset(strResetIn, nTimeout, eventArgsExStr);
        if (result != "WFS_SUCCESS") {
            $$.debug("AsyncReset error,Call IDCardReader.AsyncReset() failed.", "error");
            throw new Error('AsyncReset() failed.');
        }
        return Promise.resolve();
    }

    /**
     * 身份证读取回调
     * @callback resetIdCardCallBack
     */
    var resetIdCardCallBack = function(){
        window.IDCardReaderAsyncReadRawDataCallBack = function (msg) {
            $$.debug('IDCardReader: ' + msg);
            var dataObj = JSON.parse(msg);
            if (dataObj.hResult === 'WFS_SUCCESS') {
                switch (dataObj.Code) {
                    case 'WFS_EXEE_IDC_MEDIAINSERTED': //插入证件
                        handler['insert'] ? handler['insert'].call(dataObj) : noop();
                        break;
                    case 'WFS_SRVE_IDC_MEDIAREMOVED': //取出证件
                        if (badCard) {//如果是坏卡
                            badCard = false;//重置卡属性
                            handler['invalid'] ? handler['invalid'].call(dataObj) : noop();//跳转到插入卡页面
                            return;
                        }
                        handler['remove'] ? handler['remove'].call(dataObj) : noop();
                        break;
                    case 'WFS_CMD_IDC_READ_RAW_DATA': //扫描结果
                        badCard = false;
                        handler['success'] ? handler['success'].call(dataObj, parseIDCInfo(dataObj)) : noop();
                        break;
                    default:
                        break;
                }
            } else if (dataObj.hResult === 'WFS_ERR_TIMEOUT') {
                handler['timeout'] ? handler['timeout'].call(dataObj) : noop();
            } else if (dataObj.hResult === 'WFS_ERR_IDC_INVALIDMEDIA') {
                xfsUtil.EXT.IDCardReader.AsyncEjectCard();//异步弹出卡
                badCard = true;//标记为坏卡
                handler['invalid'] ? handler['invalid'].call(dataObj) : noop();//跳转到插入卡页面
            } else {
                handler['unknown'] ? handler['unknown'].call(dataObj) : noop();
            }
        };
    }

    /**
     * 硬件字符串转换方法
     * @method parseIDCInfo
     * @private
     * @param {string} msg
     * @returns {object}
     */
    function parseIDCInfo(msg) {
        var IDCInfo = {};
        var buffer = msg.Buffer;
        var infoStr = buffer.track1;
        var img1 = buffer.track2;   //证件正面照
        var img2 = buffer.track3;   //证件背面照
        infoStr.split('|').forEach(function (item) {
            var itemArr = item.split('=');
            IDCInfo[itemArr[0]] = itemArr[1];
        });
        Object.assign(IDCInfo, {
            img1: img1,
            img2: img2
        });
        return IDCInfo;
    }
    resetIdCardCallBack();

    return {
        AsyncReadRawData: AsyncReadRawData,
        AsyncReset: AsyncReset,
        resetIdCardCallBack:resetIdCardCallBack
    }
});