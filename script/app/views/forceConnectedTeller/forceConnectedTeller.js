define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./forceConnectedTeller.model'),
        template = require('text!./forceConnectedTeller.template.html'),
        controller = require('./forceConnectedTeller.controller');

    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function () {
        //BaseService.actionLog("Enter forceConnectedTeller page");
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
        controller.statusStep(2, 1);
    }

    /**
     * 事件绑定
     */
    function bind() {

        var connectedTimer = setTimeout(function(){
            router.gotoView("accountType");
           /* kindlyController.sendMsgToTellerAsync().then(function(){
                router.gotoView("triggerWait");
                clearTimeout(connectedTimer);
            });*/
        }, 3000);
    }

    function run() {
        $('#js-remote-calling').removeClass("hide");
        $('#js-exit').hide();
        $('#js-cancel2').hide();
    }

    return {
        load: load
    };
});