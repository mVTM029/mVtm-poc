define(function (require) {
    var $ = require('jquery'),
        $$ = require('app/util/util'),
        router = require('app/util/router'),
        model = require('./fingerprintCollection.model'),
        template = require('text!./fingerprintCollection.template.html'),
        controller = require('./fingerprintCollection.controller'),
        dialog = require('app/views/dialog/dialog');

    /**

     * 对外暴露函数，用于视图加载

     */
    var load = function () {
        render();
        bind();
        run();
    };

    /**

     * 视图渲染

     */
    function render() {
        controller.setModel(model);
        controller.setTemplate(template);
        controller.render($('#view-part-container')[0]);
    }

    /**

     * 事件绑定
     */
    function bind() {
         $('#fingerprintCollection-next').on('click',function(){
             router.gotoView('takeCardBefore');
         })
        var E = {
            cancelDialog: function () {
                dialog.layerHide('#spoken-language');
                $('.select-btn input:checked').prop('checked', false);
            }
        };
    }

    function run() {
        controller.statusStep(1,3);
        $('#js-exit').hide();
        $('#fingerprintCollection-next').show();

    }
    return {
        load: load
    }
});