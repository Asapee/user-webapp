'use strict';

angular.module('userWebapp')
	.controller('MainCtrl', function ($scope, $timeout, ResourceUseRequest) {

		$scope.isWorking = false;
		$scope.currentUser = Parse.User.current();

		function showErrorMessage (message) {
			$timeout(function () {
				$scope.errorMessage = message;
				$scope.isWorking = false;
			});
		}


		$scope.register = function () {
			$scope.isWorking = true;
			var username = $scope.username;
			var password = $scope.password;
			var email = $scope.email;
			var user = new Parse.User();
			user.set("username", username);
			user.set("password", password);
			user.set("email", email);

			user.signUp(null, {
				success: function () {
					$timeout(function () {
						$scope.currentUser = Parse.User.current();
					})
				},
				error: showErrorMessage
			})
		};

		$scope.login = function () {
			$scope.isWorking = true;
			var username = $scope.username;
			var password = $scope.password;
			Parse.User.logIn(username, password, {
				success: function () {
					$scope.isWorking = false;
					alert("you are now logged in!");
				},
				error: showErrorMessage
			})
		};

		$scope.createResourceUseRequest = function () {
			var resourceType = "TOILET";
			var useRequest = new ResourceUseRequest({
				resourceType: resourceType,
				user: Parse.User.current()
			});
			useRequest.save().then(function () {
				$timeout(function () {
					$scope.isWaiting = true;
					$scope.timeRemaining = "15 minutes";
				});
			});
		};
	})
	.service("ResourceUseRequest", [
		function () {
			var ResourceUseRequest = Parse.Object.extend("ResourceUseRequest", {});

			return ResourceUseRequest;
		}
	])
;
