define(function () {

    var appModels = {
        home: null,
        kindly: null,
        accountAgreement: null,
        applyData: null
    };

    function BaseModel(title) {
        this.title = title;
    }


    BaseModel.prototype = {
      resetAppModel:function(){
        for(var key in appModels){
          appModels[key]=null;
        }
      },
        getTitle: function () {
            return this.title;
        },
        appModel: function (modelName, modelValue) {
            if (!modelName) {
                return;
            }
            if (modelValue) {
                appModels[modelName] = modelValue;
            } else {
                return appModels[modelName];
            }

       }
    };

    return BaseModel;
});
