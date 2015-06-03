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
					resourceUseRequest: resourceUseRequest,
					voucherCode: 1234
				});
				usageVoucher.save().then(function () {
					$timeout(function () {
						$scope.code = 1234;
					});
				});
			});
		}
	});
