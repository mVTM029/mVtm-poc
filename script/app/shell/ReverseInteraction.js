/**
 * @module shell/ReverseInteraction outOfService接口
 */
define(['app/xfs/xfsUtil', 'app/util/util', 'app/util/router', 'app/views/dialog/dialog'], function (xfsUtil, $$, router, dialog) {

    /**
     * 为c#提供接口模块
     */


    /**
     * @name outOfServiceControl
     * @public
     */
    var outOfServiceControl = {
        isOtherService: false
    };

    /**
     * @name interaction
     * @type {{openOutOfService: interaction.openOutOfService, closeOutOfService: interaction.closeOutOfService}}
     */
    var interaction = {
        /**
         * 打开outOfService
         * @public
         * @method openOutOfService
         */
        openOutOfService: function () {
            router.gotoView('home');
            outOfServiceControl.isOtherService = true;

        },

        /**
         * 关闭outOfService
         * @public
         * @method closeOutOfService
         */
        closeOutOfService: function () {
            dialog.layerHide('#outofservice');
            outOfServiceControl.isOtherService = false;
        },


        callBackPDFControlType: function (type,fileName) {

        }
    };

    xfsUtil.addBatchCallBack4Model(interaction);

    return {
        outOfServiceControl: outOfServiceControl
    }
});