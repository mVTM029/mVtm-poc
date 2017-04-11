define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./applyData.model'),
        template = require('text!./applyData.template.html'),
        controller = require('./applyData.controller'),
        $$ = require('app/util/util');
        dialog = require('../dialog/dialog');
        require('jquery.validationEngine-en');
        require('jquery.validationEngine');
        require('ChineseDistricts');
        require('city-picker');

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
        controller.render($('.formData')[0]);
    }


    /**
     * 事件绑定
     */
    function bind() {

        function applyDataform() {
            /* poc.start */
            router.gotoView('accountAgreement');
            return false;
            /* poc.end */
            $("#applyData-form").submit();
            arguments[0].stopPropagation();
        }

        $('#js-empSituation').off('click',controller.validEmployerStatus).on('click',controller.validEmployerStatus);

        $('#applyData-next').off('click', applyDataform).on('click', applyDataform.bind(arguments));

        $("body").on("click", function () {
            $("#js-empSituation,#js-income,#js-otherIncome").hide();
        });

        $("#js-empSituation,#js-income,#js-otherIncome").on("click", function (event) {
            event.stopPropagation();
        });

        $("#js-apply-data-exit").off().on("click", function () {
            dialog.layerShow("#backhome-dialog");
        });

        $('#anotherAddress input').click(function () {
            if ($(this).prop('checked')) {
                $('#address-val').hide();
                $('#anotherAddress').parent().removeClass('inputParentError');
            }
        });

        $('textarea').on('keydown', function (e) {

            if (e.keyCode == "13") {
                return false;
            }
        });

        $$.textAutoSize($("#employerName")[0]);//调整textArea自适应
        $$.textAutoSize($("#correspondenceAddressDetails")[0]);//调整textArea自适应

        controller.bindBtn();



        controller.leavePage(function () {
            $(".formData").hide();
            $('#home-maskLayer').hide();//关闭遮罩层
        });

    }


    /*
     * 页面初始化
     */
    function run() {
        controller.statusStep(3, 1);
        //poc  var transactionId = model.appModel('transaction').transactionId;
        //poc  controller.transactionMonitor(model.monitor,transactionId);
        $(".formData").show();
        $("#view-part-container").empty();
        $('#js-exit').hide();

        $('#js-birth-country').hide();
        $('#correspondence-address-details').hide();

        //select option
        controller.inputAlert($('.form-group[data-for]'));

        //province-city-area
        $('#js-birth-country #jsBirthCountry').citypicker({
            simple: true
        });

        controller.readAheadData();//设置或读取model.customer.customerSession
        controller.checkFillData();
        $('#js-apply-data-exit').hide();


    }

    return {
        load: load
    };
});