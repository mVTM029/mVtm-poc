/**
 * @module xfs/Common
 */
define(['app/xfs/xfsUtil', 'app/util/util'], function (xfsUtil, $$) {

    /**
     * @name Common
     */
    var Common = xfsUtil.EXT.Common;

    /**
     * 文件上传
     * @param {number} transactionId 交易id
     * @param {string} filePath 文件路径
     * @returns {object}
     * @example
     * {
    	"fileName": "文件名",
    	"size": "大小",
    	"path": "上传路径",
    	"type": "返回类型"
        }
     @method FileUpload
     */
    function FileUpload(transactionId, filePath) {
        if ($$.isNullOrUndefined(transactionId) || $$.isNullOrUndefined(filePath)) {
            $$.debug("FileUpload error,transactionId or filePath is null or undefined", "error");
            throw new Error('FileUpload Error:transactionId or filePath is null or undefined');
        }
        return Promise.resolve(Common.FileUpload(transactionId, filePath));
    }

    /**
     * 文件下载
     * @method FileDownload
     * @param {number} transactionId 交易id
     * @param {string} filePath 文件路径
     * @returns {string} file path
     * @public
     */
    function FileDownload(transactionId, filePath) {
        if ($$.isNullOrUndefined(transactionId) || $$.isNullOrUndefined(filePath)) {
            $$.debug("FileDownload error,transactionId or filePath is null or undefined", "error");
            throw new Error('FileDownload Error:transactionId or filePath is null or undefined');
        }
        return Common.FileDownload(transactionId, filePath)
    }

    return {
        FileUpload: FileUpload,
        FileDownload: FileDownload
    }
});