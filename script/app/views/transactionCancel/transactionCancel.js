define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./transactionCancel.model'),
        template = require('text!./transactionCancel.template.html'),
        controller = require('./transactionCancel.controller');
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

        $("#top-timeout-transaction").show();
        var t = 20;
        var fTimeout = setInterval(function () {
            t--;
            $("#top-timeout-timer-transaction").text(t);
            if (t === 0) {
                router.gotoView('home');
            }
        }, 1000);

        controller.leavePage(function(){
            clearInterval(fTimeout);
        });

        $('#js-exit-cancel').on('click',function(){
            router.gotoView('home');
        });


    }

    function run() {
        $('.layer-ui').hide();//隐藏弹框
        $("#top-remote-wait").hide();//隐藏一系列视频连接状态
        $("#js-remote").hide();
        $("#js-remote-calling").hide();
        $("#top-remote-defaule").hide();
        $('#connecting-dialog').hide();
        $("#home-maskLayer").hide();
        $('#js-exit').hide();//隐藏exit按钮
        $(".kindly-modal").hide();//隐藏kindly中的layer
        if(!model.appModel('transaction')) return;
        var transactionId = model.appModel('transaction').transactionId;
        controller.transactionMonitor(model.monitor,transactionId);
    }

    return {
        load: load
    };
});
