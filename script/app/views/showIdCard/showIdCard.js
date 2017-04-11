define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./showIdCard.model'),
        template = require('text!./showIdCard.template.html'),
        controller = require('./showIdCard.controller'),
        dialog = require('../dialog/dialog'),
        $$ = require('app/util/util');

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
        controller.render($("#view-part-container")[0]);
    }

    /**
     * 事件绑定
     */
    function bind() {

        var E = {
            cancelDialog: function () {
                dialog.layerHide('#spoken-language');
                $('.select-btn input:checked').prop('checked', false);
            }
        };


        $("#showIdCard-next").off().on("click", function () {
            router.gotoView('takeIdCard');
        });

    }

    function run() {
        //poc  $('#js-exit').show().removeClass('only-exit');
        // var IDCInfo = model.appModel('IDCInfo');
        // $('#idCard-face').attr('src', IDCInfo.img1);
        // $('#idCard-back').attr('src', IDCInfo.img2);

    }

    return {
        load: load
    }
});
