define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./forceConnectingTeller.model'),
        template = require('text!./forceConnectingTeller.template.html'),
        controller = require('./forceConnectingTeller.controller');

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
    }

    /**
     * 事件绑定
     */
    function bind() {
        $("#forceConnectingTeller-next").off().on("click", function () {
            router.gotoView('forceConnectedTeller');
        });
    }

    function run() {
        $(".formData").hide();
        $('#js-remote,#top-remote-defaule,#top-select-language').hide();
        $("#js-exit").show();
        //$("#js-exit").addClass("only-exit");
        controller.statusStep(2, 1);
        controller.processVideo();
    }

    return {
        load: load
    };
});