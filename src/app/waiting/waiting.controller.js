'use strict';

angular.module('userWebapp')
	.controller('WaitingCtrl', function ($scope, $timeout, $location) {
		var user = Parse.User.current();
		if (!user) {
			$location.path = "/";
		}
		var getWaitTime = function () {
			Parse.Cloud.run("getWaitTime", {userId: user.id})
				.then(function (timeInMs) {
					if (timeInMs === 0) {
						return $timeout(function () {
							$location.path("/issue-voucher");
						});
					}
					var timeInMinutes = Math.floor(timeInMs / 1000 / 60);
					$timeout(function () {
						$scope.timeRemaining = timeInMinutes;
						debugger;
						$timeout(function () {
							console.log("hai")
						}, 5000);
					});
				});
		};
		getWaitTime();
	});
