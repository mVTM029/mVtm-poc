define(['jquery', './enterAgain.model', '../dialog/dialog', 'app/util/util', 'app/util/router', 'text!./enterAgain.template.html', './enterAgain.controller'], function ($, model, dialog, $$, router, template, controller) {
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

    }


    function run() {
        $('#js-exit').hide();

        $('#enterAgain-next').on('click',function(){
            router.gotoView('enterAgainSuccess');
        })
    }

    return {
        load: load
    };
});
