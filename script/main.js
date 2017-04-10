require.config({
	baseUrl: './script/lib/',
	paths: {
		app: '../app',
		jquery: 'jquery'
	},
	waitSeconds: 60
});

require(['app/util/router', 'polyfill.min'], function (router) {
	// document.oncontextmenu = function(){event.returnValue=false};//屏蔽鼠标右键

	window.onhelp = function(){return false};       //屏蔽F1帮助

	document.onkeydown = function(){

		if(//屏蔽F5
			(event.keyCode==116)){

			event.keyCode=0;

			event.returnValue=false;

		}

		// if(event.keyCode==122){event.keyCode=0;event.returnValue=false;}    //屏蔽F11
        //
		// if(event.ctrlKey && event.keyCode==78)event.returnValue=false;      //屏蔽Ctrl+n
        //
		// if(event.shiftKey && event.keyCode==121)event.returnValue=false;    //屏蔽shift+F10
        //
		// if(window.event.srcElement.tagName=="A" && window.event.shiftKey)
        //
		// 	window.event.returnValue=false;       //屏蔽shift加鼠标左键新开一网页
        //
		// if((window.event.altKey)&&(window.event.keyCode==115)){             //屏蔽Alt+F4
        //
		// 	window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px");
        //
		// 	return false;
        //
		// }

	};
	router.gotoView('home');
});