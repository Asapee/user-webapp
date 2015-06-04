'use strict';

angular.module('userWebapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl'
			})
			.state('login-buttons', {
				url: '/login',
				templateUrl: 'app/login/login-buttons.html',
				controller: 'LoginButtonsCtrl'
			})
			.state('login-form', {
				url: '/login/form',
				templateUrl: 'app/login/login-form.html',
				controller: 'LoginFormCtrl'
			})
			.state('register-form', {
				url: '/register/form',
				templateUrl: 'app/login/register-form.html',
				controller: 'RegisterFormCtrl'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/admin/admin.html',
				controller: 'AdminCtrl'
			})
			.state('create-resource-request', {
				url: '/create-resource-request',
				templateUrl: 'app/waiting/create-resource-request.html',
				controller: 'CreateResourceRequestCtrl'
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

		$urlRouterProvider.otherwise('/login');
	})
;
