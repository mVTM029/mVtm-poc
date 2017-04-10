define(function (require) {

    var $ = require('jquery'),
        $$ = require('app/util/util'),
        router = require('app/util/router'),
        model = require('./home.model'),
        template = require('text!./home.template.html'),
        controller = require('./home.controller');

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
        controller.render($$.getViewContainer());
    }

    /**
     * 事件绑定
     */
    function bind() {
        $('#open-account-btn').on('click', E.openAccount);
        $("#js-switch-language").off("click", E.SwitchLanguage).on("click", E.SwitchLanguage);
    }


    /**
     * 事件函数
     */
    var E = {
        openAccount: function (event) {
            router.gotoView('kindly');
        },
        SwitchLanguage: function () {
            var language = controller.getLocale();
            if ("zh" == language) {
                language = "en";
                window.currentLanguage = language;
                controller.changeLocale(language);
                load(true);
            } else {
                language = "zh";
                window.currentLanguage = language;
                controller.changeLocale(language);
                load(true);
            }
        }

    };

    /**
     * 视图初始化
     */
    function run() {

    }

    return {
        load: load
    };
});
