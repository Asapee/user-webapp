'use strict';

angular.module('userWebapp')
	.controller('HomeCtrl', function ($scope, $location) {
		var user = Parse.User.current();
		if (!user) {
			$location.path("/");
		}
		$scope.menuItems = [1,2,3,4,5];
	});
