'use strict';

angular.module('userWebapp')
	.controller('CreateResourceRequestCtrl', function ($scope, $timeout, $location, ResourceUseRequest) {
		$scope.queueLength = 15; // TODO: make this dynamic
		$scope.createResourceUseRequest = function () {
			var resourceType = "TOILET";
			var user = Parse.User.current();
			navigator.geolocation.getCurrentPosition(function (position) {
				var geopoint = new Parse.GeoPoint(position.coords);
				user.set("lastKnownLocation", geopoint);
				user.save();
				var useRequest = new ResourceUseRequest({
					resourceType: resourceType,
					user: user
				});
				useRequest.save().then(function () {
					$timeout(function () {
						$location.path("/waiting");
					});
				});
			});
		};
	})
	.controller('WaitingCtrl', function ($scope, $timeout, $location) {
		var user = Parse.User.current();
		if (!user) {
			return $location.path = "/";
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
					});
					$timeout(getWaitTime, 3000);
				});
		};
		getWaitTime();
	});
