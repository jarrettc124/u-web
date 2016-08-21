angular.module('LoginCtrl', []).controller('LoginController', function($scope, $sce) {
	$scope.myImgSrc = $sce.trustAsResourceUrl('img/loginbackground.png');
	$scope.backarrow = $sce.trustAsResourceUrl('img/back.png');
	$scope.Login = function() {
		window.location = "firstpage";
		// var ig = require('instagram-node').instagram();
	}
});
