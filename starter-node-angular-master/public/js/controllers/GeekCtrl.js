angular.module('GeekCtrl', []).controller('GeekController', function($scope, $sce) {

	$scope.tagline = 'The square root of life is pi!';	
	$scope.myImgSrc = $sce.trustAsResourceUrl('img/splash.png');
});