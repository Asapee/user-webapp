'use strict';

angular.module('userWebapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/admin/admin.html',
				controller: 'AdminCtrl'
			})
			.state('waiting', {
				url: '/waiting',
				templateUrl: 'app/waiting/waiting.html',
				controller: 'WaitingCtrl'
			})
			.state('issueVoucher', {
				url: '/issue-voucher',
				templateUrl: 'app/issueVoucher/issueVoucher.html',
				controller: 'IssueVoucherCtrl'
			});

		$urlRouterProvider.otherwise('/');
	})
;
