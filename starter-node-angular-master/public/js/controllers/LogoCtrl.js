// angular.module('LogoCtrl', []).controller('LogoController', function($scope, $sce) {

// 	$scope.myImgSrc = $sce.trustAsResourceUrl('img/background.jpg');
// 	$scope.UNUMImgSrc = $sce.trustAsResourceUrl('img/UNUM.png');

// 	$scope.gotoLogin = function() {
// 		window.location = "login";
// 	}
// });


angular.module('LogoCtrl', []).controller('LogoController', function($scope, $sce) {

	$scope.myImgSrc = $sce.trustAsResourceUrl('img/background.jpg');
	$scope.UNUMImgSrc = $sce.trustAsResourceUrl('img/UNUM.png');

	$scope.gotoLogin = function() {
		window.location = "login";
	}
});
