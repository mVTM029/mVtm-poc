//TODO:整改dialog
define(function (require) {
    var $ = require('jquery'),
        $$ = require('app/util/util'),
        router = require('app/util/router'),
        model = require('./dialog.model'),
        template = require('text!./dialog.template.html'),
        controller = require('./dialog.controller'),
        Terminal = require('app/xfs/ESpaceMediaTerminal'),
        //kindlyController = require('app/views/kindly/kindly.controller'),
        showIdCardController = require('app/views/showIdCard/showIdCard.controller'),
        i = 0,
        t = 30,
        timerFirst = null,
        btnTimer = null,
        resTimer;

    String.prototype.isContain = function (str) {
        return this.indexOf(str) >= 0;
    };

    function init() {
        var getSingle = function (fn) {
            var result;
            return function () {
                return result || (result = fn.apply(this, arguments))
            }
        };
        var createFullMask = function () {
            var str = '<div class="home-masklayer" id="home-maskLayer"></div>';
            var layer = document.getElementById("home-maskLayer");
            if (layer) {
                layer.style.display = "none";
                return;
            }
            return $("body").append(str);
        };

        getSingle(createFullMask());
    }

    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function () {
        render();
        bind();
        run();
    };

    /*var dialogDisplayflag = true;*/
    /**
     * 视图渲染
     */
    function render() {
        controller.setModel(model);
        controller.setTemplate(template);
        controller.render($("#view-dialog")[0]);
    }

    function layerShow(obj) {
        if ($('home-maskLayer').css('display', 'none')) {
            $("#home-maskLayer").show();
        }
        $(obj).show();
        //dialogDisplayflag = false;
    }

    function layerHide(obj) {
        var dialogNum = 0;
        $.each($('.layer-ui'), function (index, val) {
            val = $(val);
            if(val.attr('id') == $(obj).attr('id')){
                return true;
            }
            if ((val.css('display') == 'block')) {
                dialogNum++;
                return true;
            }
        });
        if(dialogNum==0){
            $("#home-maskLayer").hide();
        }
        $(obj).hide();
        //dialogDisplayflag = true;
    }


    /**
     * 事件绑定
     */
    function bind() {
        $.getJSON("../script/app/views/dialog/time.json", function (data) {
            resTimer = data.timer * 60 - 120;
        });

        setVtmTimer();

        $('body').off('click mspointerdown mousedown pointerdown', E.timerFn).on('click mspointerdown mousedown pointerdown', E.timerFn);

        $("#passwordNum-retry").off().on("click", function () {
            layerHide('#passwordNum-dialog');
        });

        $("#cancel-timeout").off().on("click", function () {
            clearInterval(btnTimer);
            layerHide('#timeout-dialog');
        });
        $("#continue-timeout").off().on("click", function () {
            clearInterval(btnTimer);
            layerHide('#timeout-dialog');
            router.gotoView('transactionCancel');
        });

        $("#blacklist-backhome").off().on("click", function () {
            layerHide("#blacklist-dialog");
            router.gotoView('home');
        });

        $("#outofservice-cancel").off().on("click", function () {
            layerHide("#outofservice");
            router.gotoView('home');
        });

        $("#js-language-zh").off().on("click", function () {
            controller.changeLanguage("zh");
        });

        $("#js-language-can").off().on("click", function () {
            controller.changeLanguage("can");
        });

        $("#js-language-en").off().on("click", function () {
            controller.changeLanguage("en");
        });

        $("#zh-language").off().on("click", function () {
            controller.changeLanguage("zh");
        });

        $("#can-language").off().on("click", function () {
            controller.changeLanguage("can");
        });

        $("#en-language").off().on("click", function () {
            controller.changeLanguage("en");
        });
        $("#noteller-backhome").off("click", E.backhome).on("click", E.backhome);
        $("noteller-retry").off("click", E.retry).on("click", E.retry);

        $('#continue-confirm').off('click', E.connectingCancel).on('click', E.connectingCancel);
        $('#exit-confirm').off('click', E.connectingExit).on('click', E.connectingExit);
    }

    var E = {
        timerFn: function () {
            setVtmTimer();

            $('input,textarea').off('input', setVtmTimer).on('input', setVtmTimer);

        },
        retry: function () {
            Terminal.mediaTerminalCallAsync()
                .then(function (p) {
                    //p[0]为resolve参数中Promise对象data非Promise对象
                    return p[0];
                }, function (msg) {
                    $$.debug('openCameraFail:' + msg);
                })
                .then(function () {
                    $("#top-remote-wait").hide();
                    $("#js-remote").hide();
                    $("#js-remote-calling").show();
                    $("#top-remote-defaule").hide();

                })
            ;
            $("#top-select-language").hide();
            $("#top-remote-wait").show();
        },
        backhome: function () {
            router.gotoView("home");
        },
        connectingCancel: function () {

            var language = model.appModel("showIdCardlanguage");
            Terminal.mediaTerminalReleaseCallAsync();
            // clearInterval(forceTime);
            if (location.hash.isContain("forceConnectingTeller")) {
                showIdCardController.mediaTerminalCall(language);
            } else {
                kindlyController.mediaTerminalCallBack(language);
            }
            layerHide("#connecting-dialog");
        },
        connectingExit: function () {
            var isCalling = Terminal.terminalInfo.callStatus === Terminal.callStatus.calling//如果正在通话中
            // clearInterval(forceTime);
            Terminal.mediaTerminalReleaseCallAsync().then(function () {
                if (isCalling) {
                    Terminal.closeRemoteVideo();
                }
            });
            layerHide("#connecting-dialog");
            $("#top-remote-wait").hide();
            router.gotoView('transactionCancel');
        }
    };

    function setVtmTimer() {
        $("#top-remote-defaule").hide();
        $("#top-timeout").hide();
        i = controller.dialogTimer.dialogTimer0;
        t = controller.dialogTimer.dialogTimer30;
        clearInterval(timerFirst);

        var isTimeOutPage = location.hash.isContain("#kindly") || location.hash.isContain("#accountAgreement") || location.hash.isContain("#scanId") || location.hash.isContain("#takeIdCard") || location.hash.isContain("#showIdCard") || location.hash.isContain("#forceConnectingTeller") || location.hash.isContain("#takeCard") || location.hash.isContain("#takeCardBefore") || location.hash.isContain("#takeToken") || location.hash.isContain("#tokenDemandChoice") || location.hash.isContain("#rateExperience");

        if (isTimeOutPage) {
            timerFirst = setInterval(function () {
                i++;

                //No need show customer service tips in forceConnectingTeller page
                if (i === controller.dialogTimer.dialogTimer30 && !location.hash.isContain("#forceConnectingTeller") && !location.hash.isContain("#waiting") && !location.hash.isContain("!showIdCard")) {
                    //$("#top-select-language,#top-remote-wait,#top-remote-connected").hide();
                    if ((Terminal.terminalInfo.callStatus === Terminal.callStatus.called) && !$('#top-remote-wait').is(':visible')) {
                        $("#top-select-language").hide();
                        $("#top-remote-defaule").hide();
                    } else {
                        $("#top-remote-defaule").hide();
                    }
                }

                $$.debug(i);
                //用户无操作返回首页
                if ((i > (resTimer || controller.dialogTimer.dialogTimer70))) {
                    $("#top-remote-defaule").hide();
                    $("#top-select-language").hide();
                    $("#top-remote-wait").hide();
                    $("#top-timeout").hide();
                    if (t > controller.dialogTimer.dialogTimer0) {
                        $$.debug("进入了第一个if")
                        $("#top-timeout-timer").text(t);
                        t--;
                    } else if (t == controller.dialogTimer.dialogTimer0) {
                        $$.debug("进入了第二个else if");
                        clearInterval(timerFirst);
                        $("#top-timeout").hide();
                        layerShow('#timeout-dialog');
                        var btnT = controller.dialogTimer.dialogTimer20;
                        $("#timeout-timer").text(btnT);
                        btnTimer = setInterval(function () {
                            $$.debug("btnT:"+btnT,"error");
                            if (btnT > controller.dialogTimer.dialogTimer0) {
                                btnT--;
                                $("#timeout-timer").text(btnT);
                            } else {
                                layerHide("#timeout-dialog");
                                clearInterval(btnTimer);
                                router.gotoView('home');
                            }
                        }, controller.dialogTimer.dialogTimer1000)
                    }
                }


            }, controller.dialogTimer.dialogTimer1000)
        }

    }

    //视频连接超时处理
    Terminal.MediaAsyncCallBack.releaseCallSuccessEvent(function () {
        if (Terminal.terminalInfo.callStatus != Terminal.callStatus.calling) {
            layerShow('#noteller-dialog');
        }
    });
    function run() {
        init();
    }

    return {
        load: load,
        layerShow: layerShow,
        layerHide: layerHide
    };
});
