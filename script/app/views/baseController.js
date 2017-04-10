define(['jquery', 'app/util/util','app/util/router'], function ($, $$, router) {
    function BaseController(id) {
        this.id = id;
    }

    BaseController.prototype = {
        setModel: function (model) {
            this.model = model;
        },
        setTemplate: function (template) {
            this.template = template;
        },
        render: function (container) {
            // 获取local language
            var language = this.getLocale();

            // 获取模板
            var templateStr = this.template;

            // 根据local language读取model中的resource
            if (this.model.locale && this.model.locale[language]) {
                var resourceObj = this.model.locale[language];

                var regS = null;

                // 替换模板
                for (var key in resourceObj) {
                    regS = new RegExp("\\{" + key + "\\}", "g");
                    templateStr = templateStr.replace(regS, resourceObj[key]);
                }
            }

            if (container == undefined) return;
            // 加载页面
            container.innerHTML = templateStr;
        },

        changeLocale: function (locale) {
            locale = locale || 'en';
            sessionStorage.setItem('locale', locale);
        },

        getLocale: function () {
            return sessionStorage.getItem('locale') || 'en';
        },

        changeLanguage: function (language) {
            language = language || 'en';
            sessionStorage.setItem('language', language);
            $("#select-language-force").removeClass('disabled');
        },

        getLanguage: function () {
            return sessionStorage.getItem('language') || 'en';
        },
        statusStep: function (x, y) {
            x--;
            if (y) {
                y--;
            }
            $(".status-bar .box").each(function (i) {
                if (i < x) {
                    $(this).removeClass('active-bg');
                    $(this).find("h2").addClass("active1")
                } else if (i == x) {
                    $(this).addClass("active-bg");
                    if (y || y == 0) {
                        $(this).find('ul li').removeClass('active').removeClass("active3");
                        $(this).find('ul li').eq(y).prevAll().addClass("active3");
                        $(this).find('ul li').eq(y).addClass('active');
                    } else {
                        $(this).find("h2").addClass('no-subItem');
                    }
                } else {
                    $(this).removeClass('active-bg');
                    $(this).find('h2').removeClass('active1');
                }
            });
        },

        leavePage: function (fun) {
            if (typeof fun !== "function") throw new Error("baseController leavePage error: " + fun + "is not a function");

            function _leave() {
                fun();
                window.removeEventListener("hashchange", _leave);
            }

            window.addEventListener("hashchange", _leave, false);
        },

        getActionMessage: function (type, message) {
            var actionMessage = {};
            actionMessage.type = type; //text,signature,print,scanner,sms,account,ocd
            actionMessage.msg = message;
            // $$.debug(JSON.stringify(actionMessage));
            return JSON.stringify(actionMessage);
        },

        /**
         * 有视频的模块调用此方法
         */
        processVideo: function () {
            var video = document.getElementsByTagName('video');
            for (var i = 0, len = video.length; i < len; i++) {
                var v = video[i];
                v.addEventListener('canplay', function () {
                    v.play();
                    v.style.visibility = 'visible'
                }, false);
            }
        }


    };

    return BaseController;
});