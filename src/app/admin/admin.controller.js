'use strict';

angular.module('userWebapp')
	.controller('AdminCtrl', function ($scope, $timeout, ResourceUseRequest, ResourceUsageVoucher) {
		var getResourceUseRequests = new Parse.Query(ResourceUseRequest);
		getResourceUseRequests.find({
			success: function (requests) {
				$timeout(function () {
					$scope.resourceUseRequests = requests;
				});
			}
		});

		$scope.issueVoucher = function (resourceUseRequest) {
			var usageVoucher = new ResourceUsageVoucher({
				resourceUseRequest: resourceUseRequest
			});
			usageVoucher.save();
		}
	});
