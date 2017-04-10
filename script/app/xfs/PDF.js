/**
 * @module xfs/PDF
 */
define(['app/xfs/xfsUtil', 'app/util/util'], function (xfsUtil, $$) {

    /**
     * @name PDF
     */
    var PDF = xfsUtil.EXT.PDF;

    /**
     * pdf签名
     * @method PDFSignature
     * @param {string} fileName 文件名称
     * @param {string} language 语言
     * @param signType
 * @public
     * @method PDFSignature
     * @return {string} filePath 文件路径
     */
    function PDFSignature(fileName, language,signType) {
        if ($$.isNullOrUndefined(fileName) || $$.isNullOrUndefined(language) || $$.isNullOrUndefined(signType)) {
            $$.debug("PDFSignature error,fileName or language or signType is null or undefined", "error");
            throw new Error('fileName or language is null or undefined');
        }
        $$.debug('调用签名成功');
        return PDF.PDFSignature(fileName, language,signType);
    }


    /**
     * 关闭PDF
     * @public
     * @method ClosePDFViewer
     * @return {Promise}
     */
    function ClosePDFViewer() {
        PDF.ClosePDFViewer();
        return Promise.resolve();
    }


    return {
        PDFSignature: PDFSignature,
        ClosePDFViewer: ClosePDFViewer
    }
});