require.config({
	baseUrl: './script/lib/',
	paths: {
		app: '../app',
		jquery: 'jquery'
	},
	waitSeconds: 60
});

require(['app/util/router', 'polyfill.min'], function (router) {
	router.gotoView('home');
});