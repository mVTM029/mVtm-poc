define(function (require) {

    var $ = require('jquery'),
        $$ = require('app/util/util'),
        router = require('app/util/router'),
        model = require('./jerome.model'),
        dialog = require('app/views/dialog/dialog'),
        template = require('text!./jerome.template.html'),
        controller = require('./jerome.controller'),
        transactionService = require('app/service/transactionService'),
        Terminal = require('app/xfs/ESpaceMediaTerminal');

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
        controller.statusStep(1, 1);
    }

    /**
     * 事件绑定
     */
    function bind() {
        $("#kindly-next").off('click', E.next).on('click', E.next);
        $("#js-exit").off('click', E.exit).on('click', E.exit);
        $("#backhome-confirm").off('click', E.backhome).on('click', E.backhome);
        $("#backhome-cancel").off('click', E.backhomeCancel).on('click', E.backhomeCancel);
        $("#noteller-backhome").off('click', E.notellerBackhome).on('click', E.notellerBackhome);
        $(document).off('click', E.documents).on('click', E.documents);
        $("#noteller-retry").off('click', E.notellerRetry).on('click', E.notellerRetry);
        /*卡类型介绍*/
        $(".glod-card-img").off('click', E.goldcard).on('click', E.goldcard);
        $(".diamond-card-img").off('click', E.diamcard).on('click', E.diamcard);
        $(".close-gold").off('click', E.colsegold).on('click', E.colsegold);
        $(".close-diam").off('click', E.colsediam).on('click', E.colsediam);
        $(".id-card").off('click',E.identity).on('click',E.identity);
        $("#infopeper").off('click',E.addrentity).on('click',E.addrentity);
        $(".close-identity").off('click',E.closeidinfo).on('click',E.closeidinfo);
        $(".close-address").off('click',E.colseaddrinfo).on('click',E.colseaddrinfo);
        /*顶部链接teller*/
        $("#js-remote").off('click', E.remote).on('click', E.remote);
        $("#top-select-language li").off('click', E.selectLanguage).on('click', E.selectLanguage);
        $('#can').off("click",E.recordLanguageItem).on("click",E.recordLanguageItem);
        $('#en').off("click",E.recordLanguageItem).on("click",E.recordLanguageItem);
    }


    /**
     * 事件函数
     */
    var E = {
        remote: function () {
           // event.stopPropagation();
            if (Terminal.terminalInfo && Terminal.terminalInfo.callStatus !== Terminal.callStatus.called) {
                return;
            }
            console.log(event.target);
                $("#top-remote-defaule").hide();
                $("#top-select-language").show();
                $("#top-select-language li").removeClass("active");
        },
        next: function () {
            router.gotoView('accountAgreement');
           // router.gotoView('applyData');
        },
        exit: function () {
            dialog.layerShow("#backhome-dialog");
            //$("#ui-frame").show();
        },
        selectLanguage: function () {
            // event.stopPropagation();
            controller.mediaTerminalCallBack();
        },
        backhome: function () {
            dialog.layerHide("#backhome-dialog");
            /*controller.wosa.IdcAsyncCancel();*/
            // Terminal.mediaTerminalReleaseCallAsync().then(function () {
            //     Terminal.closeRemoteVideo();
            // });
            $("#ui-frame").hide();
            router.gotoView('home');
        },
        backhomeCancel: function () {
            dialog.layerHide("#backhome-dialog");
            $("#ui-frame").hide();
        },
        notellerBackhome: function () {
            dialog.layerHide("#noteller-dialog");
            router.gotoView('home');
        },
        documents: function () {
            // exclude js-remote and children
            if(!($(event.target).is('#js-remote *')||$(event.target).is('#js-remote')||$(event.target).is('#top-select-language *')||$(event.target).is('#top-select-language '))){
                $("#top-select-language").hide();
            }
        },
        notellerRetry: function () {
            dialog.layerHide("#noteller-dialog");
        },
        recordLanguageItem:function(){
            model.appModel("showIdCardlanguage",$(this).prop("id"));
        },
        goldcard:function(){
            $(".kindly-modal").show();
            $(".gold-card-info").show();
        },
        diamcard:function(){
            $(".kindly-modal").show();
            $(".diamond-card-info").show();
        },
        colsegold:function(){
            $(".gold-card-info").hide();
            $(".kindly-modal").hide();
        },
        colsediam:function(){
            $(".diamond-card-info").hide();
            $(".kindly-modal").hide();
        },
        identity:function(){
            $(".identity").show();
            $(".kindly-modal").show();
        },
        addrentity:function(){
            $(".addrentity").show();
            $(".kindly-modal").show();
        },
        closeidinfo:function(){
            $(".identity").hide();
            $(".kindly-modal").hide();
        },
        colseaddrinfo:function(){
            $(".addrentity").hide();
            $(".kindly-modal").hide();
        }
    };



    /**
     * 视图初始化
     */
    function run() {
        $('#kindly-content').load('/group-vtm-sln-content-service/service/content/repository/template/vtm-hk/kindly/kindly' + '_' + controller.getLocale() + '.html');
        $(".view-container").removeClass("home-bg");
    }

    return {
        load: load

    };
});
