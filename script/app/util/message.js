/**
 * @module util/message
 */
define(['app/util/util'], function ($$) {

    /**
     * @name handles
     * @type {{}}
     */
    var handles = {};

    /**
     * 添加消息类型function
     * @method
     * @public
     * @param {string} eventType
     * @param {function} callback
     */
    function on(eventType, callback) {
        if ($$.isFunction(callback)) {
            handles[eventType] = callback;
        } else {
            throw new Error('The argument type of callback must be Function.');
        }
    }

    /**
     * 删除消息类型
     * @method off
     * @public
     * @param {string} eventType
     */
    function off(eventType) {
        delete handles[eventType];
    }

    /**
     * 重置handles
     * @public
     * @method reset
     */
    function reset(){
        handles = {};
    }

    /**
     * 消息到达事件
     * @public
     * @method MsgArrivedEvent
     * @param {string} msg
     */
    window.MsgArrivedEvent = function (msg) {
        $$.debug(msg);
        var msgObj = JSON.parse(JSON.parse(msg).Data); //{type: '', msg: ''}
        var type = msgObj.type;
        if (handles[type] && $$.isFunction(handles[type])) {
            handles[type](msgObj.msg);
        }
    };

    return {
        on: on,
        off: off,
        reset: reset
    }
});