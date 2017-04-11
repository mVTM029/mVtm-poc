/**
 * @model applyData控制器
 * @class applyData控制器
 */
define(['../baseController', './applyData.model', 'app/util/router', 'app/util/util', 'jquery'], function (Base, model, router, $$, $, message) {
    var controller = new Base('applyData controller'),
        IDCInfo = model.appModel('IDCInfo') || {
                Address: '西安市碑林区雁塔路',
                IDCardNo: '61048119921101093482',
                CardType: '身份证',
                Name: 'q'
            },
        idCardAddress = IDCInfo.Address,
        name = IDCInfo.Name,
        cardType = IDCInfo.CardType,
        idNumber = IDCInfo.IDCardNo,
        circleInterval = null,
        updateId = "";//如果是修改的话，保存修改id

    if (!model.customer) {
        model.customer = {};
    }

    if (!model.customer.customerSession) {
        model.customer.customerSession = {};
    }

    /**
     * YES or NO button bind dom in controller
     * @type {{yesBtn: Event.yesBtn, noBtn: Event.noBtn}}
     */
    var Event = {
        yesBtn:function(){
            $("#communicationCode").prop("readonly",false).attr("unselectable","off").siblings().prop("for","communicationCode").parent(".form-group").prop("for","communicationCode").removeClass("noclick");
            $("#jsBirthCountry").prop("readonly",false).attr("unselectable","off").siblings().prop("for","jsBirthCountry").parent(".form-group").prop("for","jsBirthCountry").removeClass("noclick");
            $("#correspondenceAddressDetails").prop("readonly",false).attr("unselectable","off").siblings().prop("for","correspondenceAddressDetails").parent(".form-group").prop("for","correspondenceAddressDetails").removeClass("noclick");

            $("#anotherAddress").removeClass('inputError');
            $("#js-birth-country,#correspondence-address-details").css("display", "block");
            //$("#anotherAddress").parent().hide();
            $('#jsBirthCountry').addClass('backgc');
            if($('#correspondenceAddressDetails').hasClass('inputError')){
                $('#correspondenceAddressDetails').parent().addClass('inputParentError');
            }
        },
        noBtn:function(){
            $("#anotherAddress").removeClass('inputError');
            $("#js-birth-country,#correspondence-address-details").removeClass('inputParentError');
            $("#js-birth-country,#correspondence-address-details").css("display", "none");
        }
    };

    controller.bindBtn = function(){
        this.closeBtn();
        $("#anotherAddress .select-btn:first-child").on("click", Event.yesBtn);
        $("#anotherAddress .select-btn:last-child").on("click", Event.noBtn);
    };

    controller.closeBtn = function(){
        $("#anotherAddress .select-btn:first-child").off("click", Event.yesBtn);
        $("#anotherAddress .select-btn:last-child").off("click", Event.noBtn);
    };

    /**
     * 将数据传递给vta,由vta决定是否保存
     * dom结构或id、class变更，此方法必重构
     * object = [
     {
         serialNum:'',
         title:'',
         values:[
             {
                 label:'',
                 value:'',
                 readOnly:false,//boolean
                 id:''
             }
         ]
     }
     ]
     * @example
     * @method saveCustomerData
     * @public
     */
    controller.saveCustomerData = function () {
        var self = this;

        if ($('.inputParentError').length > 0 && $('input:radio[name="isAnotherAddress"]:checked').siblings().text() != "No") {
            var firstErrorItem = $($('.inputParentError')[0]);
            $('.formData-inner').scrollTop(firstErrorItem.offset().top);

            return;
        }

        var sendObjArray = [];
        var $detailHeader = $('.clearfix.details-parts');
        $.each($detailHeader, function (index, val) {
            val = $(val).find('.form-header');//h2
            var $formInlineChildren = val.siblings('.form-inline').children(),
                checkNo = false,//检查是否为No
                values = [];


            $.each($formInlineChildren, function (index, subVal) {
                subVal = $(subVal);//label,div
                var readOnly = false,
                    yn = subVal.find('.label.label-inline'),
                    ynLabel = yn.text(),
                    label = subVal.find('.label').text() || subVal.find('.label1').text(),
                    value = subVal.find('input').val() || subVal.find('textarea').val() || subVal.find('span').text() || '',
                    id = subVal.find('input').prop('id') || subVal.find('textarea').prop('id') || subVal.find('span').prop('id') || '';
                if(value == ''){
                    return true;
                }


                var $lables = subVal.find('.label');
                if ($lables.length > 1) {
                    $.each($lables, function (index, valLabel) {
                        valLabel = $(valLabel);
                        var valLabelParent = valLabel.parent(),
                            labelValue = valLabelParent.find('input').val() || valLabelParent.find('textarea').val() || '',
                            labelId = valLabelParent.find('input').prop('id') || valLabelParent.find('textarea').prop('id') || '';
                        if(checkNo) return true;//如果value值为undefined,则不发这条
                        values.push({
                            label: valLabel.text(),
                            value: labelValue,
                            readOnly: false,
                            id: labelId
                        })
                    });
                    return true;

                }
                // if (checkNo) {//检查是否为No
                //     return checkNo;
                // }
                if (ynLabel) {
                    value = subVal.find('input:radio[name="isAnotherAddress"]:checked').siblings().text();
                    if (value === model.locale[controller.getLocale()]['No']) {//如果是No的话变值
                        /**
                         * 清空
                         */
                        model.customer.customerSession.anotherAddress = "";
                        model.customer.customerSession.anotherAddressDetail = "";
                        model.customer.customerSession.communicationCode = "";
                        checkNo = true;
                    }
                    id = subVal.find('.select-box.fr').prop('id')
                } else if (!label) {
                    return true;
                }
                if (id === "resident") {
                    readOnly = true;
                }
                var valueObj = {
                    label: label,
                    value: value,
                    readOnly: readOnly,
                    id: id
                };
                values.push(valueObj);
            });

            var data = {
                serialNum: val.find('span').text(),
                title: val.find('label').text(),
                values: values
            };
            if (data.serialNum !== "2") {//如果是No的话就不传了
                checkNo = false;
            }
            sendObjArray.push(data);
        });
        // self.circleControlOn();//打开模态窗口
        $('#home-maskLayer').show();//遮罩层打开
        $("#waiting-dialog").show();

        self.setApplyDataCustomerSessionInfo();//将数据存入内存
        //调用数据库保存
        var customerObj = {
            "mobileNumber": model.customer.customerSession.mobileNumber,
            "email": model.customer.customerSession.email,
            "employmentStatus": model.customer.customerSession.employmentStatus,
            "employmentName": model.customer.customerSession.employmentName,
            "monthlyIncome": model.customer.customerSession.monthlyIncome,
            "otherMonthlyIncome": model.customer.customerSession.otherMonthlyIncome,
            "residentAddress": model.customer.customerSession.residentAddress,
            "isAnotherAddress": model.customer.customerSession.isAnotherAddress,
            "anotherAddress": model.customer.customerSession.anotherAddress,
            "anotherAddressDetail": model.customer.customerSession.anotherAddressDetail,
            "postalCode": model.customer.customerSession.postalCode,
            "communicationCode": model.customer.customerSession.communicationCode,
            "idNumber": model.customer.customerSession.idNumber, //"612401198701020013"
            "name": model.customer.customerSession.name,
            "cardType": model.customer.customerSession.cardType
        };

        console.log(JSON.stringify(customerObj));

        updateId == "" ? updateId = "" : customerObj['id'] = updateId;
        /**
         * 发送消息,更改发送消息回调
         */
        if (model.customer && model.customer.customerSession) {
            // // //TODO:c# sendMsgToTellerAsync 联调开启
            message.on("OCD", function (msg) {
                $("#applyData-next").prop('disabled',null).removeClass("disabled");//打开提交按钮
                $('#home-maskLayer').hide();
                $("#waiting-dialog").hide();
                // self.circleControlOff();//关闭模态窗口
                var array = msg;
                if (array.length == 0) {
                    self.saveCustomerSession(customerObj).then(function(){//成功方法是有参数的，参数为传过去的data值，暂时不用
                        router.gotoView('accountType');
                    },function(error){
                        $$.debug('java 500,saveCustomerSession error:'+JSON.parse(error).serviceError.developerMessage,"error");
                    });

                } else {
                    for (var i in array) {
                        var arrObj = $('#' + array[i]);
                        if(array[i] == "employmentSituation" || array[i] == "income" || array[i] == "otherIncome"){
                            self.inputAlert(arrObj.parent("label"));
                        }else if(array[i] == "anotherAddress"){
                            var checkNode = $('input:radio[name="isAnotherAddress"]:checked').siblings().addClass("checkbox").removeClass("btnChecked");
                            checkNode.parent("label").siblings().find("div").addClass("checkbox").removeClass("btnCheckbox");
                            $('input:radio[name="isAnotherAddress"]').prop("disabled","");
                            self.bindBtn();
                        }else{
                            arrObj.attr("unselectable","off");
                            arrObj.prop("readonly",null);
                        }
                        arrObj.siblings().prop("for",array[i]);
                        arrObj.parent(".form-group").prop("for",array[i]).removeClass("noclick");
                        arrObj.addClass('inputError').parent().addClass('inputParentError');
                    }
                }
            });

            $('.form-group[data-for]').off("click");
            var checkNode = $('input:radio[name="isAnotherAddress"]:checked').siblings().addClass("btnChecked").removeClass("checkbox");
            checkNode.parent("label").siblings().find("div").addClass("btnCheckbox").removeClass("checkbox");
            self.closeBtn();

            $('#applyData-form').find('input,textarea').each(function(index,val){
                val = $(val);
                if(val.prop("name") == "isAnotherAddress" || val.prop("type") != "radio"){
                    val.attr("unselectable","on");
                    val.prop("readonly","readonly");
                    val.siblings().prop("for",null);
                    val.parent(".form-group").prop("for",null).addClass("noclick");
                    if(val.prop("name") == "isAnotherAddress"){
                        val.prop("disabled","disabled");
                    }
                }
            });


        } else {
            $$.debug("未获取到HFE数据，请检查Customer session code.");
        }

    };


    controller.validEmployerStatus = function(){
        var situation = $("#employmentSituation").val();
        var $$employerNam = $("#employerName");
        $$employerNam.attr("unselectable","off");
        $$employerNam.prop("readonly",null);
        $$employerNam.siblings().prop("for","employerName");
        $$employerNam.parent(".form-group").prop("for","employerName").removeClass("noclick");
        if(
            situation == "Student" || situation =="Self-employed"|| situation =="Retired" ||
            situation == "Not in employment" || situation == "没有工作" ||
            situation == "学生" || situation == "退休" || situation == "自营"
        ){
            $$employerNam.removeClass("validate[required,custom[employerName]]");
            $$employerNam.removeClass("inputError");
            $$employerNam.parent("label").removeClass("inputParentError");
            $$employerNam.siblings(".formError").css("display","none");
            return;
        }
        $$employerNam.addClass("validate[required,custom[employerName]]");
    };

    /**
     * 保存预填数据
     * @method saveCustomerSession
     * @param {Array} keyAndValue
     * @returns {json}
     */
    //controller.saveCustomerSession = applyDataService.saveCustomerSession;

    /**
     * 读取预填数据
     */
    controller.readAheadData = function () {
        var self = this;
        $('#resident').text(idCardAddress);//硬件读取身份证后的信息
        /* poc.start */
        return false;
        /* poc.end */
        applyDataService.readAheadData(IDCInfo).then(function (data) {
            if (data.id == null) {
                $$.debug("新申请用户,没有预填信息");
                return;
            }
            updateId = data.id;
            model.customer.customerSession = data;
            //fill data
            $('#mobileNumber').val(model.customer.customerSession['mobileNumber']);
            $('#postalCode').val(model.customer.customerSession['postalCode']);
            $('#communicationCode').val(model.customer.customerSession['communicationCode']);
            $('#email').val(model.customer.customerSession['email']);
            $('#resident').text(model.customer.customerSession['residentAddress']);//数据库里存的身份证信息

            // 另一个地址，需预读数据
            if (model.customer.customerSession['isAnotherAddress'] && model.customer.customerSession['isAnotherAddress'] != "false") {

                $('#anotherAddress .select-btn').find('.checkbox').each(function () {
                    // 如果选择yes，同时展开下面的内容，且读入数据
                    if ($(this).text() == 'Yes' || $(this).text() == '是') {
                        $(this).siblings('input').prop('checked', true);
                        $("#js-birth-country,#correspondence-address-details").css("display", "block");
                        $('#jsBirthCountry').val(model.customer.customerSession['anotherAddress']);
                        $('#correspondenceAddressDetails').val(model.customer.customerSession['anotherAddressDetail']);
                    }
                });

            } else if (model.customer.customerSession['isAnotherAddress'] == false || model.customer.customerSession['isAnotherAddress'] == 'false') {
                $("#js-birth-country,#correspondence-address-details").css("display", "none");
                $($('#anotherAddress .select-btn').find('input')[1]).prop('checked', true);

            } else {
                $("#js-birth-country,#correspondence-address-details").css("display", "none");
            }


            $('#employerName').val(model.customer.customerSession['employmentName']);
            if (model.customer && model.customer.customerSession) {
                var _locale = self.getLocale();
                var _situation = null, _income = null;

                if (model.customer.customerSession['employmentStatus']) {
                    _situation = model.situationMapping[_locale][model.customer.customerSession['employmentStatus']];
                }

                if (_situation) {

                    $('#employmentSituation').val(_situation);
                    $('#employmentSituation').attr("data-code", model.customer.customerSession['employmentStatus']);
                }

                if (model.customer.customerSession['monthlyIncome']) {
                    _income = model.inComeMapping[_locale][model.customer.customerSession['monthlyIncome']];
                }

                if (_income) {
                    $('#income').val(_income);
                    $('#income').attr("data-code", model.customer.customerSession['monthlyIncome']);
                }
            }


            var otherIncomeDisplayText;
            if (model.customer.customerSession['otherMonthlyIncome']) {
                otherIncomeDisplayText = model.inComeMapping[_locale][model.customer.customerSession['otherMonthlyIncome']];
            }

            if (otherIncomeDisplayText) {
                $('#otherIncome').val(otherIncomeDisplayText);
                $('#otherIncome').attr("data-code", model.customer.customerSession['otherMonthlyIncome']);
            }


            $('#idCard .select-btn').find('.checkbox').each(function () {
                if ($(this).text() == model.customer.customerSession['idCard']) {
                    $(this).siblings('input').prop('checked', true);
                }
            });
        }, function (res) {
            throw new Error(res.responseText);
        })
    };

    /**
     * 保存客户应用数据信息
     * @method setApplyDataCustomerSessionInfo
     */
    controller.setApplyDataCustomerSessionInfo = function () {


        var income = $("#income").attr("data-code");
        var otherIncome = $("#otherIncome").attr("data-code");

        model.customer.customerSession["mobileNumber"] = $("#mobileNumber").val();
        model.customer.customerSession["postalCode"] = $("#postalCode").val();
        model.customer.customerSession["communicationCode"] = $("#communicationCode").val();
        model.customer.customerSession["email"] = $("#email").val();
        model.customer.customerSession["countryOfBirth"] = $("#jsBirthCountry").val();
        model.customer.customerSession["anotherAddress"] = $("#jsBirthCountry").val();
        model.customer.customerSession["anotherAddressDetail"] = $.trim($("#correspondenceAddressDetails").val());
        model.customer.customerSession["employmentStatus"] = $("#employmentSituation").attr('data-code');
        model.customer.customerSession["employmentName"] = $.trim($("#employerName").val());


        model.customer.customerSession["monthlyIncome"] = income;
        model.customer.customerSession["isAnotherAddress"] = $($('#anotherAddress .select-btn').find('input')[0]).prop('checked') == true || $($('#anotherAddress .select-btn').find('input')[0]).prop('checked') == 'checked';
        model.customer.customerSession["otherMonthlyIncome"] = otherIncome;
        //收入编码
        model.customer.customerSession["monthlyIncome"] = income;
        //其它收入编码
        model.customer.customerSession["otherIncomeCode"] = otherIncome;

        //硬件读取到的信息，将要发送给后台的信息
        model.customer.customerSession["residentAddress"] = idCardAddress;
        model.customer.customerSession["idNumber"] = idNumber;
        model.customer.customerSession["name"] = name;
        model.customer.customerSession["cardType"] = cardType;
    };


    /**
     * 表单验证(表单验证预绑定)
     * @method checkFillData
     */
    controller.checkFillData = function () {
        var self = this;
        $("#applyData-form").validationEngine('attach', {
            focusFirstField: false,
            maxErrorsPerField: 1,
            onValidationComplete: function (form, valid) {
                $('#js-empSituation').click();
                $('#anotherAddress input').each(function () {
                    if (!$(this).prop('checked') && !$(this).parent('label').siblings().find('input').prop('checked')) {
                        $('#address-val').show();
                        $('#anotherAddress').parent().addClass('inputParentError');
                    } else {
                        $('#address-val').hide();
                        $('#anotherAddress').parent().removeClass('inputParentError');
                        $('#anotherAddress').removeClass('inputError')
                    }
                });
                if (valid) {
                    self.saveCustomerData();
                }
            }
        });
        $('#applyData-form').bind('jqv.field.result', function (event, field, isError) {
            if (isError) {
                $(field).addClass('inputError').parent('.form-group').addClass('inputParentError');
            } else {
                $(field).removeClass('inputError').parent('.form-group').removeClass('inputParentError');
            }
        });
        //Add select option up-arrow
        $('<div class="icon-arrow"></div>').appendTo($('.city-picker-dropdown'));

    };


    /**
     * 弹框
     * @param jqObj jquery Object
     */
    controller.inputAlert = function (jqObj) {
        $.each(jqObj,function(index,val){
            $(val).click(function (event) {
                event.stopPropagation();
                var $this = $(this);
                var id = $this.attr('data-for');
                var $inputText = $this.find('input');
                var $alert = $('#' + id);
                var viewTop = $this.offset().top;
                var oldScrollTop = $('.formData-inner').scrollTop();
                $('.alert-select-box').hide();
                $alert.show();
                $('.formData-inner').scrollTop(oldScrollTop + viewTop - 240);
                // 单选框
                $alert.find(".select-btn").each(function () {
                    if ($(this).find('input').attr("data-code") == $inputText.attr("data-code")) {
                        $(this).find('input[type="radio"]').prop('checked', true);
                    }
                    $(this).click(function () {
                        //$inputText.val($(this).find('.checkbox').text());

                        if ($(this).find('input').attr("data-code")) {
                            $inputText.attr("data-code", $(this).find('input').attr("data-code"));
                            $inputText.val($(this).find('.checkbox').text());
                            $inputText.unbind("focusout");
                            $inputText.parent().removeClass("inputParentError");
                            $inputText.prev('.formError').replaceWith("");
                            $inputText.removeClass("inputError");
                        }

                        $alert.hide();
                    });
                });
            });
        });
        // $('.form-group[data-for]').
    };

    controller.circleControlOn = function(){
        $('#home-maskLayer').show();//遮罩层打开
        $("#waiting-dialog").show();
        var firstNode = $(".waiting-circle").find("i:first");
        var nodeIndex = 0;
        circleInterval = setInterval(function () {
            firstNode.css("background-color", "#fff");
            firstNode = firstNode.next();
            nodeIndex++;
            if (nodeIndex == 6) {
                $(".waiting-circle").find("i").css("background-color", "#808080");
                firstNode = $(".waiting-circle").find("i:first");
                nodeIndex = 0;
            }
        }, 500);
        $$.debug(circleInterval,'error');
    };

    controller.circleControlOff = function(){
        $('#home-maskLayer').hide();//遮罩层关闭
        $("#waiting-dialog").hide();
        $(".waiting-circle").find("i").css("background-color", "#808080");
        clearInterval(circleInterval);
    };

    return controller;
});