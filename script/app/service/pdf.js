define(['jquery'], function ($) {
    /**
     * 将指定PDF文件转为图片文件
     * @param fileName 文件名
     * @param language 语言
     * @return jqXHR
     */
    function pdfToImage(fileName, language) {
        // fileName = fileName || 'aaa';
        // language = language || 'zh';
        //if($$.isNullOrUndefined(fileName)||$$.isNullOrUndefined(language)){
        //    throw new Error('fileName or language is null or undefined');
        //}
        if (arguments.length !== 2) {
            throw new Error('must required 2 arugments');
        }
        return $.get('/group-vtc-vtm-gateway-web/service/proxy/vtcService/pdfs/' + fileName + '/' + language);
    }

    /**
     * 暴露接口
     */
    return {
        pdfToImage: pdfToImage
    }
});