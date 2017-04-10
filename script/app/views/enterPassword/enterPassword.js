define(['jquery','./enterPassword.model','app/util/router','../dialog/dialog','text!./enterPassword.template.html','./enterPassword.controller','app/util/util','app/xfs/xfsUtil'],function ($,model,router,dialog,template,controller,$$,xfsUtil) {

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
        controller.statusStep(4, 3);
    }

    /**
     * 事件绑定
     */
    function bind() {

    }

    /**
     * 机具硬件模块相关
     */
        var PPInit = function(completePinInput){
        var PinSize = $(".box .text").length;
        window.PinpadGetDataAsyncCallBack=function(dataStr){
            try{
                var data=JSON.parse(dataStr);
                $$.debug(JSON.stringify(data.Code));
                switch(data.Code){
                    case 'WFS_EXEE_PIN_KEY':
                        fillPinCell(data.Buffer.ulDigit);
                        break;
                    case 'WFS_CMD_PIN_GET_DATA':
                        if(data.hResult == 'WFS_SUCCESS'){
                            completePinInput.call({data:data,PinSize:PinSize});
                            return;
                        }
                        break;
                    default:
                        $$.debug('Todo for encrypt pin');
                }
            }catch(e){
                $$.debug('Get a exception ['+e+'] for string: '+dataStr);
            }

            //改变输入框状态
            function fillPinCell(pinCode){
                switch(pinCode){
                    // case 'clear':
                    //     $('.box .text.point').removeClass('point');
                    //     break;
                    case 'cancel':
                     $('.box .text.point').removeClass('point');
                     break;
                    case 'enter':
                        break;
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "0":
                        $('.box .text:not(.point):first').addClass('point');
                        break;
                    default:
                        $$.debug('Get a unkonw key:'+pinCode);

                }

            }
        };
        /* *
         *cancel键类似于键盘上的Backspace退格键此键位暂无需求
         * window.external.PinPad.GetDataAsync(6,0,'number|clear|enter|cancel','enter');
         */
        $$.debug(xfsUtil.xfsInfo.timeout);
        window.external.PinPad.GetDataAsync(PinSize,0,'number|enter|cancel','enter','',xfsUtil.xfsInfo.timeout);
    };

    //判断密码长度
    function completePinInputOut(){
        var data = this.data,
        PinSize = this.PinSize;
        $$.debug(JSON.stringify(data.Buffer.PinKeys));
        model.appModel('ansiNewPinBlock',data.Buffer.PinKeys);

        if(!$('.box .text:last').hasClass('point')){
            $('.box .text').removeClass("point");
            $$.debug('密码长度不够6位重新输入！ ');
            model.appModel('ansiNewPinBlock',null);
            dialog.layerShow("#passwordNum-dialog");
            window.external.PinPad.GetDataAsync(PinSize,0,'number|enter|cancel','enter','',xfsUtil.xfsInfo.timeout);
        }else{
            router.gotoView('enterAgain');
        }
    }


    function run() {
        $('#js-exit').hide();
        window.external.PinPad.AsyncReset();
        PPInit(completePinInputOut);
        model.appModel('PPInit',PPInit);
        var transactionId = model.appModel('transaction').transactionId;
        controller.transactionMonitor(model.monitor,transactionId);
    }

    return {
        load: load
    };
});
