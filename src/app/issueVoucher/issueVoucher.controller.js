'use strict';

angular.module('userWebapp')
	.controller('IssueVoucherCtrl', function ($scope, $timeout, $location, ResourceUseRequest, ResourceUsageVoucher) {
		var user = Parse.User.current();
		if (!user) {
			$location.path = "/";
			return;
		}
		$scope.issueVoucher = function () {
			var resourceUseRequestQuery = new Parse.Query(ResourceUseRequest);
			resourceUseRequestQuery.equalTo("user", Parse.User.current());
			resourceUseRequestQuery.first(function (resourceUseRequest) {
				var usageVoucher = new ResourceUsageVoucher({
					resourceUseRequest: resourceUseRequest
				});
				console.log("usageVoucher", usageVoucher);
				usageVoucher.save().then(function () {
					Parse.Cloud.run("unlockDoor", {resourceUseVoucherId: usageVoucher.id, resourceUseRequestId: resourceUseRequest.id})
						.then(function () {
							$timeout(function () {
								$scope.isDoorOpen = true;
							})
						});
				});
			});
		}
	});
