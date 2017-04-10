define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./electronBanking.model'),
        template = require('text!./electronBanking.template.html'),
        Terminal = require('app/xfs/ESpaceMediaTerminal'),
        controller = require('./electronBanking.controller');
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function () {
        render();
        bind();
        run();
        //Please read the Terms and Conditions
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
        //点击pdf文件后才能改变复选框
        $("#ebanking-next").on('click', function () {
            var $agreeTerm = $(".agree-term .checked"),
                list = [];
            //如未选择other service，跳过相关逻辑
            if ($agreeTerm.length > 0) {
                $.each($agreeTerm,function(index,val){
                    list.push($(val).attr('data-code'));
                });
                router.gotoView('triggerWait');
            }else{
                router.gotoView('mobileBanking');
            }
            Terminal.mediaTerminalSendMsg("otherServices",list);
        });

        var readPdf = {
            interNet:false,
            phoneBank:false
        };
        $('.tnc-content').on('click', function () {
            controller.showPdfImage($(this).attr('data-read', 'true').data('pdf'),controller.getLocale());
            if($(this).attr('data-pdf') == 'internetbankingterms'){
                $('#phoneBankSpan').hide();
                readPdf.phoneBank = true
            }else{
                $('#interNetSpan').hide();
                readPdf.interNet = true;
            }
            $(this).find(".no-check").toggleClass("checked");
        });
        $("#closePdf").off().on("click", function () {
            $(this).hide().parent().hide();
        });

        $(".agree-term").on("click",function(){
            var self = $(this).find('.no-check');
            if(self.prop("id") == "internetBanking"){
                if(!readPdf.interNet){
                    $('#interNetSpan').show();
                    return;
                }
                var $$left = $(".ibox-left");
                if(self.hasClass("checked")){
                    $$left.css("border","");
                }else{
                    $$left.css("border","1px solid "+$$left.find(".box-left").css("backgroundColor"));
                }
            }
            if(self.prop("id") == "mobileBanking"){
                if(!readPdf.phoneBank){
                    $('#phoneBankSpan').show();
                    return;
                }

                var $$right = $(".ibox-right");
                if(self.hasClass("checked")){
                    $(".ibox-right").css("border","");
                }else{
                    $(".ibox-right").css("border","1px solid "+$$right.find(".box-right").css("backgroundColor"));
                }
            }
            self.toggleClass("checked");
            $(".tnc-content").each(function(){
                model.checkedList.push(self.attr('data-pdf'));
            });
        });
        
    }

    /**
     * 页面初始化
     */
    function run() {
        controller.statusStep(5);
        model.checkedList = [];
        $("#js-exit").hide();
        $("#ebanking-next").removeClass("disabled");
        Terminal.mediaTerminalSendMsg("takeCardSuccess",'');
        var transactionId = model.appModel('transaction').transactionId;
        controller.transactionMonitor(model.monitor,transactionId);
    }

    return {
        load: load
    };
});