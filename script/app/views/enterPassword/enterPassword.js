define(['jquery','./enterPassword.model','app/util/router','../dialog/dialog','text!./enterPassword.template.html','./enterPassword.controller','app/util/util'],function ($,model,router,dialog,template,controller) {

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
        controller.statusStep(4, 3);
    }

    /**
     * 事件绑定
     */
    function bind() {

    }



    function run() {
        $('#enterPassword-next').on('click',function(){
            router.gotoView('enterPasswordSuccess');
        })
        $('#js-exit').hide();

    }

    return {
        load: load
    };
});
