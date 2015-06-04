'use strict';

angular.module('userWebapp')
	.controller("LoginFormCtrl", function ($scope, $location, $timeout) {
		$scope.login = function () {
			$scope.isWorking = true;
			var username = $scope.username;
			var password = $scope.password;
			Parse.User.logIn(username, password, {
				success: function () {
					navigator.geolocation.getCurrentPosition(function (position) {
						var geopoint = new Parse.GeoPoint(position.coords);
						$timeout(function () {
							var user = Parse.User.current();
							user.set("lastKnownLocation", geopoint);
							user.save(); // fire and forget
							$location.path("/home");
						});
					});
				},
				error: console.error.bind(console)
			})
		};
	})
	.controller("RegisterFormCtrl", function ($scope, $timeout, $location) {
		$scope.register = function () {
			$scope.isWorking = true;
			var username = $scope.username;
			var password = $scope.password;
			var email = $scope.email;
			var user = new Parse.User();
			user.set("username", username);
			user.set("password", password);
			user.set("email", email);

			navigator.geolocation.getCurrentPosition(function (position) {
				var geopoint = new Parse.GeoPoint(position.coords);
				user.set("lastKnownLocation", geopoint);

				user.signUp(null, {
					success: function () {
						$timeout(function () {
							$location.path("/home");
						});
					},
					error: console.error.bind(console)
				})
			});
		};
	})
	.service("ResourceUseRequest", [
		function () {
			var ResourceUseRequest = Parse.Object.extend("ResourceUseRequest", {});

			return ResourceUseRequest;
		}
	])
	.service("ResourceUsageVoucher", [
		function () {
			var ResourceUsageVoucher = Parse.Object.extend("ResourceUsageVoucher", {});
			return ResourceUsageVoucher;
		}
	])
;
